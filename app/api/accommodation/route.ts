import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const memberFilter = searchParams.get("member") || "all"; // all | member | non-member
    const attendanceFilter = searchParams.get("attendance") || "all"; // all | attended | not-attended

    const db = await getDatabase();
    const usersCollection = db.collection("users");

    // Base query: accommodation must be requested (yes)
    const query: Record<string, unknown> = {
      accommodation: { $regex: /^yes$/i },
    };

    // Filter 1: Membership
    if (memberFilter === "member") {
      query.status = "member";
    } else if (memberFilter === "non-member") {
      query.status = { $ne: "member" };
    }

    // Filter 2: Attendance
    if (attendanceFilter === "attended") {
      query.$or = [{ attended: true }, { "attendance.0": { $exists: true } }];
    } else if (attendanceFilter === "not-attended") {
      query.attended = { $ne: true };
      query["attendance.0"] = { $exists: false };
    }

    const totalNeedingAccommodation = await usersCollection.countDocuments({
      accommodation: { $regex: /^yes$/i },
    });

    const filteredUsers = await usersCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      totalCount: totalNeedingAccommodation,
      filteredCount: filteredUsers.length,
      users: filteredUsers.map((u) => ({
        _id: u._id.toString(),
        name: `${u.firstName} ${u.lastName}`.trim(),
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        whatsapp: u.whatsapp,
        location: u.location,
        uniqueId: u.uniqueId,
        status: u.status || "firsttime",
        isMember: u.status === "member",
        isAttended: Boolean(u.attended) || (Array.isArray(u.attendance) && u.attendance.length > 0),
        gender: u.gender || "unspecified",
      })),
    });
  } catch (error) {
    console.error("accommodation GET error:", error);
    return NextResponse.json({ error: "Failed to fetch accommodation data" }, { status: 500 });
  }
}
