import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// Reuse MongoDB Client across serverless invocations
const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://barryjacob08:HrpYPBgN@cluster0.ssafp.mongodb.net?retryWrites=true&w=majority";

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

// Canonical Track Definitions matching your system
export const TRAINING_TRACKS = [
  {
    id: "PMP",
    title: "Project Management Professional (PMP)",
    aliases: [
      "pmp",
      "project management",
      "project management (pmp)",
      "project management professional (pmp)",
    ],
  },
  {
    id: "DTA",
    title: "Data Analysis",
    aliases: ["dta", "data analysis", "data analytics"],
  },
  {
    id: "HRM",
    title: "Human Resource Management (HRM)",
    aliases: [
      "hse",
      "hrm",
      "human resource management (hrm)",
      "human resource",
      "human resources",
    ],
  },
  {
    id: "AI",
    title: "Integrated Workforce AI Management",
    aliases: [
      "ai",
      "integrated workforce ai management",
      "workforce ai",
      "artificial intelligence",
    ],
  },
  {
    id: "GLM",
    title: "Global Missions (A Professional Certificate Training)",
    aliases: [
      "glm",
      "global missions",
      "global missions (a professional certificate training)",
    ],
  },
];

// Helper to sanitize CSV fields and prevent Excel formula injection & digit loss
function escapeCSV(field: string | number | undefined | null): string {
  if (field === null || field === undefined) return '""';
  const str = String(field).trim();
  // Wrap values with quotes, and double internal quotes
  return `"${str.replace(/"/g, '""')}"`;
}

// Formats phone numbers so Excel doesn't strip the leading zero (e.g. 08105503344)
function escapePhoneForExcel(phone: string | undefined | null): string {
  if (!phone) return '""';
  const cleanPhone = String(phone).trim();
  // Using ="08105503344" forces Excel to interpret as literal text
  return `="${cleanPhone}"`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const exportTrack = searchParams.get("export");

    const mongoClient = await clientPromise;
    const db = mongoClient.db("saltandlight2026");
    const usersCollection = db.collection("users");

    // Fetch registered users with a certificated training selected
    const rawUsers = await usersCollection
      .find({
        certificatedTraining: {
          $exists: true,
          $nin: ["", null, "None", "NONE", "none", "N/A"],
        },
      })
      .sort({ createdAt: -1 })
      .toArray();

    // Group participants into their matching training tracks
    const groupedData = TRAINING_TRACKS.map((track) => {
      const participants = rawUsers
        .filter((user) => {
          const userTrack = (user.certificatedTraining || "").toLowerCase().trim();
          return track.aliases.some((alias) =>
            userTrack === alias || userTrack.includes(alias)
          );
        })
        .map((user) => ({
          id: user._id.toString(),
          uniqueId: user.uniqueId || "N/A",
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Anonymous",
          email: user.email || "N/A",
          phone: user.whatsapp || "N/A",
          location: user.location || "N/A",
          registeredAt: user.createdAt
            ? new Date(user.createdAt).toLocaleDateString("en-GB")
            : "N/A",
        }));

      return {
        id: track.id,
        title: track.title,
        count: participants.length,
        participants,
      };
    });

    // Capture any user with an unrecognized custom track label
    const otherUsers = rawUsers
      .filter((user) => {
        const userTrack = (user.certificatedTraining || "").toLowerCase().trim();
        const isMatched = TRAINING_TRACKS.some((track) =>
          track.aliases.some((alias) => userTrack === alias || userTrack.includes(alias))
        );
        return !isMatched;
      })
      .map((user) => ({
        id: user._id.toString(),
        uniqueId: user.uniqueId || "N/A",
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Anonymous",
        email: user.email || "N/A",
        phone: user.whatsapp || "N/A",
        location: user.location || "N/A",
        registeredAt: user.createdAt
          ? new Date(user.createdAt).toLocaleDateString("en-GB")
          : "N/A",
      }));

    if (otherUsers.length > 0) {
      groupedData.push({
        id: "OTHER",
        title: "Other / Custom Tracks",
        count: otherUsers.length,
        participants: otherUsers,
      });
    }

    // ------------------------------------------------------------------------
    // CASE 1: STREAM EXCEL/CSV FILE FOR A SPECIFIC TRACK OR ALL
    // ------------------------------------------------------------------------
    if (exportTrack) {
      let targetTracks = groupedData;

      if (exportTrack !== "ALL") {
        targetTracks = groupedData.filter(
          (t) => t.id.toLowerCase() === exportTrack.toLowerCase()
        );
      }

      if (targetTracks.length === 0) {
        return NextResponse.json(
          { error: "Requested track not found" },
          { status: 404 }
        );
      }

      const headers = [
        "S/N",
        "Participant Name",
        "Email Address",
        "Phone Number",
        "Pass ID",
        "Location",
        "Training Track",
        "Date Registered",
      ];

      const rows: string[] = [];
      let globalCounter = 1;

      targetTracks.forEach((track) => {
        track.participants.forEach((p) => {
          rows.push(
            [
              globalCounter++,
              escapeCSV(p.name),
              escapeCSV(p.email),
              escapePhoneForExcel(p.phone),
              escapeCSV(p.uniqueId),
              escapeCSV(p.location),
              escapeCSV(track.title),
              escapeCSV(p.registeredAt),
            ].join(",")
          );
        });
      });

      // \uFEFF Byte Order Mark ensures Microsoft Excel displays UTF-8 cleanly
      const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");

      const filename =
        exportTrack === "ALL"
          ? "SaltAndLight26_All_Certificated_Trainings.csv"
          : `SaltAndLight26_${targetTracks[0].id}_Participants.csv`;

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });
    }

    // ------------------------------------------------------------------------
    // CASE 2: RETURN STRUCTURED JSON FOR THE PAGE
    // ------------------------------------------------------------------------
    const totalDelegates = groupedData.reduce((acc, curr) => acc + curr.count, 0);

    return NextResponse.json({
      success: true,
      totalDelegates,
      tracks: groupedData,
    });
  } catch (error) {
    console.error("Certificated training API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch training participants" },
      { status: 500 }
    );
  }
}
