import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { fullName, email, phone, sphere, activeType, message } = await req.json();

    // Basic validation
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: "Full Name, Email, and Message are required." },
        { status: 400 }
      );
    }

    // Format label for the email subject
    const formattedCategory = activeType ? activeType.toUpperCase() : "GENERAL";

    const data = await resend.emails.send({
      // Use your verified custom domain email in production (e.g. "noreply@yourdomain.com")
      from: "Saltandlight <saltandlight@mail.mivwordhouse.com>",
      to: ["ajayiphilipg@gmail.com"],
      replyTo: email,
      subject: `[${formattedCategory}] New Inquiry from ${fullName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <h2 style="border-bottom: 2px solid #f5d061; padding-bottom: 8px;">New Contact Form Transmission</h2>
          <table style="width: 100%; text-align: left; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 160px;">Full Name:</td>
              <td style="padding: 8px 0;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email Address:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Phone / WhatsApp:</td>
              <td style="padding: 8px 0;">${phone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Inquiry Type:</td>
              <td style="padding: 8px 0;">${activeType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Sphere of Influence:</td>
              <td style="padding: 8px 0;">${sphere}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <h4 style="margin-bottom: 8px;">Message Details:</h4>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 16px; border-radius: 8px;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Resend API Error:", error);
    return NextResponse.json(
      { error: "Failed to transmit message. Please try again later." },
      { status: 500 }
    );
  }
}