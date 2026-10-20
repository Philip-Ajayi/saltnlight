import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

// Helper to deduplicate, lowercase, and clean email addresses
function extractCleanEmails(users: Array<{ email?: string | null }>): string[] {
  const emailSet = new Set<string>();

  for (const user of users) {
    if (!user.email) continue;
    const clean = user.email.trim().toLowerCase();
    // Verify it's a valid email string
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
            "GET /api/your-route?attendance",
            "GET /api/your-route?certificate",
            "Optional: Append &format=json for structured JSON output",
          ],
        },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const usersCollection = db.collection("users");

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
              // Exclude Global Missions / GLM using Mongo regex
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
