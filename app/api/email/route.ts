import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

// 1. Explicit document type interface
interface UserDoc {
  email?: string | null;
  certificatedTraining?: string | null;
  attended?: boolean;
  attendance?: Array<{ date?: Date | string; session?: string }>;
  [key: string]: unknown; // Allows any other fields
}

// 2. Helper to deduplicate, lowercase, and clean email addresses
function extractCleanEmails(users: UserDoc[]): string[] {
  const emailSet = new Set<string>();

  for (const user of users) {
    if (!user.email || typeof user.email !== "string") continue;
    const clean = user.email.trim().toLowerCase();
    // Validate it is an actual email
    if (clean && clean !== "n/a" && clean.includes("@")) {
      emailSet.add(clean);
    }
  }

  return Array.from(emailSet);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const hasAttendance = searchParams.has("attendance");
    const hasCertificate = searchParams.has("certificate");

    if (!hasAttendance && !hasCertificate) {
      return NextResponse.json(
        {
          error: "Missing required query parameter.",
          usage: [
            "GET /api/email?attendance",
            "GET /api/email?certificate",
            "Optional: Append &format=json for structured JSON output",
          ],
        },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    // Pass UserDoc generic to ensure type-safety across queries
    const usersCollection = db.collection<UserDoc>("users");

    // ------------------------------------------------------------------------
    // CASE 1: ?attendance
    // ------------------------------------------------------------------------
    if (hasAttendance) {
      const attendees = await usersCollection
        .find(
          {
            $or: [
              { attended: true },
              { "attendance.0": { $exists: true } },
            ],
            email: { $exists: true, $nin: ["", null, "N/A", "n/a"] },
          },
          { projection: { email: 1 } }
        )
        .toArray();

      const emails = extractCleanEmails(attendees);
      const joinedEmails = emails.join(", ");

      if (searchParams.get("format") === "json") {
        return NextResponse.json({
          filter: "attendance",
          count: emails.length,
          emails: joinedEmails,
          list: emails,
        });
      }

      return new NextResponse(joinedEmails, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
        },
      });
    }

    // ------------------------------------------------------------------------
    // CASE 2: ?certificate (All certificated programs EXCEPT Global Missions)
    // ------------------------------------------------------------------------
    if (hasCertificate) {
      const certificateUsers = await usersCollection
        .find(
          {
            certificatedTraining: {
              $exists: true,
              $nin: ["", null, "None", "NONE", "none", "N/A", "n/a"],
              $not: /global\s*mission|glm/i,
            },
            email: { $exists: true, $nin: ["", null, "N/A", "n/a"] },
          },
          { projection: { email: 1, certificatedTraining: 1 } }
        )
        .toArray();

      // Additional JS-level safety filter to guarantee exclusion
      const filteredUsers = certificateUsers.filter((u) => {
        const track = (u.certificatedTraining || "").toLowerCase().trim();
        return track !== "glm" && !track.includes("global mission");
      });

      const emails = extractCleanEmails(filteredUsers);
      const joinedEmails = emails.join(", ");

      if (searchParams.get("format") === "json") {
        return NextResponse.json({
          filter: "certificate (excluding Global Missions)",
          count: emails.length,
          emails: joinedEmails,
          list: emails,
        });
      }

      return new NextResponse(joinedEmails, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
        },
      });
    }
  } catch (error) {
    console.error("Email extract GET error:", error);
    return NextResponse.json(
      { error: "Failed to extract emails" },
      { status: 500 }
    );
  }
}
