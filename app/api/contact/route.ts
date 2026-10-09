import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = process.env.NEXT_PUBLIC_OWNER_EMAIL ?? "dagadeogratias@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body as {
      name: string;
      email: string;
      subject: string;
      message: string;
    };

    // Basic server-side validation
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }

    // If no API key is configured, log and return success (dev mode)
    if (!process.env.RESEND_API_KEY) {
      console.log("[Contact] No RESEND_API_KEY — message logged instead:", { name, email, subject });
      return NextResponse.json({ success: true });
    }

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `De : ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px">
          <h2 style="color:#7c3aed">Nouveau message depuis le portfolio</h2>
          <p><strong>De :</strong> ${name} (${email})</p>
          <p><strong>Sujet :</strong> ${subject}</p>
          <hr/>
          <p style="white-space:pre-wrap">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact API]", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
