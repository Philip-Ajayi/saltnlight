import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { Resend } from "resend";

// Reuse Mongo client across hot reloads in development
const uri = process.env.MONGODB_URI || "mongodb+srv://barryjacob08:HrpYPBgN@cluster0.ssafp.mongodb.net?retryWrites=true&w=majority";
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      location,
      whatsappNumber,
      referralSources,
      isMember,
      certificatedTraining,
      isVolunteer,
      volunteerUnits,
      needsAccommodation,
      hasConsented,
      gender,
      schoolOfMinistry,
    } = body;

    // 1. Basic Server-side Validation
    if (!firstName || !lastName || !email || !whatsappNumber || !hasConsented) {
      return NextResponse.json(
        { error: "Missing required registration fields" },
        { status: 400 }
      );
    }

    // 2. Connect to Database
    const mongoClient = await clientPromise;
    const db = mongoClient.db("saltandlight2026");
    const usersCollection = db.collection("users");

    // 3. Duplicate Email Check
    const existingUser = await usersCollection.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email has already registered for Salt & Light '26." },
        { status: 409 }
      );
    }

    // 4. Generate Unique ID (e.g., SLT2026201)
    const userCount = await usersCollection.countDocuments();
    const uniqueId = `SLT2026${201 + userCount}`;

    // 5. Construct Document matching exact Schema
    const now = new Date();
    const newUser = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      location: location?.trim() || "",
      whatsapp: whatsappNumber.trim(),
      certificatedTraining:
        certificatedTraining === "NONE" ? "None" : certificatedTraining,
      schoolOfMinistry: schoolOfMinistry || "N/A",
      volunteerRole: isVolunteer ? volunteerUnits.join(", ") : "None",
      accommodation: needsAccommodation ? "yes" : "no",
      gender: gender || "unspecified",
      status: isMember ? "member" : "firsttime",
      year: 2026,
      uniqueId,
      subscribed: true,
      referralSource: Array.isArray(referralSources)
        ? referralSources.join(", ")
        : referralSources || "",
      attendance: [],
      createdAt: now,
      updatedAt: now,
    };

    // 6. Insert User into DB
    const result = await usersCollection.insertOne(newUser);

    // 7. Send Confirmation Email via Resend
    try {
      await resend.emails.send({
        from: "Saltandlight <saltandlight@mail.mivwordhouse.com>",
        to: newUser.email,
        subject: "Registration Confirmed - Salt & Light '26",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background-color: #f9f9f9;">
            <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #eee;">
              <h2 style="color: #460583; margin-top: 0;">Registration Confirmed!</h2>
              <p>Hello <strong>${newUser.firstName} ${newUser.lastName}</strong>,</p>
              <p>Thank you for registering for <strong>Salt & Light '26</strong>!</p>
              
              <div style="background: #f5d06120; border-left: 4px solid #f5d061; padding: 15px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px; color: #555;">Your Unique Registration Pass ID:</p>
                <h1 style="margin: 5px 0 0; color: #111; letter-spacing: 2px;">${uniqueId}</h1>
              </div>

              <p><strong>Registration Details:</strong></p>
              <ul>
                <li><strong>Track:</strong> ${newUser.certificatedTraining}</li>
                <li><strong>Accommodation:</strong> ${newUser.accommodation === "yes" ? "Requested" : "Not Required"}</li>
                <li><strong>Volunteering:</strong> ${newUser.volunteerRole}</li>
              </ul>

              <p style="margin-top: 30px; font-size: 13px; color: #888;">
                Please save this pass code for check-in during the event. See you at Samonda, Ibadan!
              </p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send Resend email:", emailError);
      // Non-blocking: continue response even if email send fails
    }

    return NextResponse.json(
      {
        message: "Registration successful",
        uniqueId,
        userId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration route error:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}