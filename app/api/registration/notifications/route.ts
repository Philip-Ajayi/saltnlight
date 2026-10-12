import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDatabase();
    const notificationsCollection = db.collection("checkin_notifications");

    const notifications = await notificationsCollection
      .find({ status: "pending" })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({
      notifications: notifications.map((n) => ({
        ...n,
        _id: n._id.toString(),
      })),
    });
  } catch (error) {
    console.error("notifications GET error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}