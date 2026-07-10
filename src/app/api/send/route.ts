import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with placeholder fallback to prevent build-time static page collection crashes
const resend = new Resend(process.env.RESEND_API_KEY || "re_build_placeholder");

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[Development Mode] Resend API key is missing. Simulating successful proposal dispatch.");
        return NextResponse.json({ success: true, mock: true });
      }
      return NextResponse.json({ error: "Resend API key is not configured in environment variables." }, { status: 500 });
    }

    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Required fields are missing." }, { status: 400 });
    }

    // send email using Resend's free onboarding address (sends to the registered user account email)
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "kartavyadev3@gmail.com",
      subject: `New Project Proposal from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.5; color: #1c1c1a; background-color: #faf6f0; border: 1px solid #a3a096;">
          <h2 style="border-bottom: 2px solid #1c1c1a; padding-bottom: 8px;">New Project Proposal</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email Address:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message / Specifications:</strong></p>
          <div style="background-color: #ffffff; padding: 15px; border: 1px solid #dad9d2; white-space: pre-wrap;">${message}</div>
          <br/>
          <hr style="border: 0; border-top: 1px dashed #a3a096;" />
          <p style="font-size: 10px; color: #71717a;">FORM-ID: PROPOSAL-REQ-402 // REV. A00</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
