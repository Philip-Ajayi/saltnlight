import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/mongodb";

interface AttendanceRecord {
  date: Date;
  session: string;
}

interface UserDocument {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  uniqueId: string;
  accommodation?: string;
  attended?: boolean;
  attendedAt?: Date;
  updatedAt?: Date;
  attendance?: AttendanceRecord[];
}

export async function POST(request: Request) {
  try {
    const { userId, uniqueId } = await request.json();

    if (!userId && !uniqueId) {
      return NextResponse.json(
        { error: "Either userId or uniqueId is required" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const usersCollection = db.collection<UserDocument>("users");
    const notificationsCollection = db.collection("checkin_notifications");

    const query = userId ? { _id: new ObjectId(userId) } : { uniqueId };
    const user = await usersCollection.findOne(query);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isAttended =
      Boolean(user.attended) ||
      (Array.isArray(user.attendance) && user.attendance.length > 0);

    if (isAttended) {
      return NextResponse.json(
        {
          error: "Participant has already clocked in before.",
          alreadyAttended: true,
          attendedAt: user.attendedAt || user.attendance?.[0]?.date,
          user: {
            name: `${user.firstName} ${user.lastName}`,
            uniqueId: user.uniqueId,
            accommodation: user.accommodation || "no",
          },
        },
        { status: 400 }
      );
    }

    const now = new Date();

    // Type-safe update: MongoDB driver recognizes `attendance` as an array field
    await usersCollection.updateOne(
      { _id: user._id },
      {
        $set: {
          attended: true,
          attendedAt: now,
          updatedAt: now,
        },
        $push: {
          attendance: { date: now, session: "Desk Clock-in" },
        },
      }
    );

    // Resolve any corresponding pending check-in requests
    await notificationsCollection.updateMany(
      { $or: [{ userId: user._id.toString() }, { uniqueId: user.uniqueId }] },
      { $set: { status: "resolved", resolvedAt: now } }
    );

    return NextResponse.json({
      message: "Clocked in successfully",
      user: {
        _id: user._id.toString(),
        name: `${user.firstName} ${user.lastName}`,
        uniqueId: user.uniqueId,
        accommodation: user.accommodation || "no",
        attendedAt: now,
      },
    });
  } catch (error) {
    console.error("clock-in error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}