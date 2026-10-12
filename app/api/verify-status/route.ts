import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { pusherServer } from "@/lib/pusher";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const db = await getDatabase();
    const usersCollection = db.collection("users");
    const notificationsCollection = db.collection("checkin_notifications");

    const user = await usersCollection.findOne({ email: cleanEmail });

    // 1. Not Registered
    if (!user) {
      return NextResponse.json({
        found: false,
        message: "No registration found with this email. Please proceed to the registration page.",
      });
    }

    const isAttended =
      Boolean(user.attended) ||
      (Array.isArray(user.attendance) && user.attendance.length > 0);

    const fullName = `${user.firstName} ${user.lastName}`;

    // 2. Already Attended
    if (isAttended) {
      return NextResponse.json({
        found: true,
        attended: true,
        name: fullName,
        uniqueId: user.uniqueId,
        message:
          "You have already clocked in! If you misplaced your badge or card, kindly approach the registration stand for resolve.",
      });
    }

    // 3. Registered & Not Attended -> Notify Desk via Pusher & Store in DB
    const notificationDoc = {
      userId: user._id.toString(),
      name: fullName,
      email: user.email,
      whatsapp: user.whatsapp || "",
      uniqueId: user.uniqueId,
      accommodation: (user.accommodation || "").toLowerCase().trim() === "yes" ? "yes" : "no",
      certificatedTraining: user.certificatedTraining || "None",
      status: "pending",
      createdAt: new Date(),
    };

    const insertedNotif = await notificationsCollection.insertOne(notificationDoc);

    // Trigger Pusher event to registration desk
    try {
      await pusherServer.trigger("registration-desk", "checkin-request", {
        ...notificationDoc,
        _id: insertedNotif.insertedId.toString(),
      });
    } catch (pusherErr) {
      console.error("Pusher trigger failed:", pusherErr);
    }

    return NextResponse.json({
      found: true,
      attended: false,
      name: fullName,
      uniqueId: user.uniqueId,
      message: "You are registered! Please proceed to the registration stand to clock in.",
    });
  } catch (error) {
    console.error("verify-status error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
