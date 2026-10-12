import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim() || "";
    const filter = searchParams.get("filter") || "all"; // all | attended

    const db = await getDatabase();
    const usersCollection = db.collection("users");

    // Compute live stats
    const totalCount = await usersCollection.countDocuments();
    const attendedCount = await usersCollection.countDocuments({
      $or: [
        { attended: true },
        { "attendance.0": { $exists: true } },
      ],
    });

    const query: Record<string, unknown> = {};

    if (filter === "attended") {
      query.$or = [
        { attended: true },
        { "attendance.0": { $exists: true } },
      ];
    }

    if (search) {
      const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      query.$and = [
        ...(query.$or ? [{ $or: query.$or }] : []),
        {
          $or: [
            { firstName: regex },
            { lastName: regex },
            { email: regex },
            { uniqueId: regex },
          ],
        },
      ];
      delete query.$or;
    }

    const users = await usersCollection
      .find(query)
      .sort({ attendedAt: -1, createdAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json({
      totalCount,
      attendedCount,
      users: users.map((u) => ({
        ...u,
        _id: u._id.toString(),
        isAttended: Boolean(u.attended) || (Array.isArray(u.attendance) && u.attendance.length > 0),
      })),
    });
  } catch (error) {
    console.error("registration GET error:", error);
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      whatsapp,
      location,
      referralSource,
      isMember,
      certificatedTraining,
      needsAccommodation,
    } = body;

    if (!firstName || !lastName || !email || !whatsapp) {
      return NextResponse.json(
        { error: "First Name, Last Name, Email, and WhatsApp are required" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const usersCollection = db.collection("users");
    const cleanEmail = email.toLowerCase().trim();

    const existing = await usersCollection.findOne({ email: cleanEmail });
    if (existing) {
      return NextResponse.json(
        { error: "A user with this email has already registered." },
        { status: 409 }
      );
    }

    const totalUsers = await usersCollection.countDocuments();
    const uniqueId = `SLT2026${201 + totalUsers}`;
    const now = new Date();

    const newUser = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: cleanEmail,
      location: location?.trim() || "",
      whatsapp: whatsapp.trim(),
      certificatedTraining: certificatedTraining || "None",
      schoolOfMinistry: "N/A",
      volunteerRole: "None",
      accommodation: needsAccommodation ? "yes" : "no",
      gender: "",
      status: isMember ? "member" : "firsttime",
      year: 2026,
      uniqueId,
      subscribed: true,
      referralSource: referralSource || "Desk",
      attended: true, // Automatically attended upon desk registration
      attendedAt: now,
      attendance: [{ date: now, session: "Desk Onsite Registration" }],
      createdAt: now,
      updatedAt: now,
    };

    const result = await usersCollection.insertOne(newUser);

    return NextResponse.json({
      message: "Participant registered and clocked in successfully",
      user: {
        _id: result.insertedId.toString(),
        name: `${newUser.firstName} ${newUser.lastName}`,
        uniqueId: newUser.uniqueId,
        accommodation: newUser.accommodation,
        attendedAt: now,
      },
    });
  } catch (error) {
    console.error("registration POST error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
