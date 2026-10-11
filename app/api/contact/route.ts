import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const escapeHtml = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("[Contact API] RESEND_API_KEY ou CONTACT_TO_EMAIL manquant");
    return NextResponse.json({ error: "Service indisponible." }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Honeypot : un humain ne remplit jamais ce champ caché
  if (String(body._gotcha ?? "")) return NextResponse.json({ success: true });

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subject = String(body.subject ?? "").trim().replace(/[\r\n]+/g, " ");
  const message = String(body.message ?? "").trim();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
  }
  if (name.length > 100 || subject.length > 200 || message.length > 1000) {
    return NextResponse.json({ error: "Champ trop long." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `De : ${name} <${email}>\n\n${message}`,
      html: `<p><strong>De :</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
             <p><strong>Sujet :</strong> ${escapeHtml(subject)}</p>
             <hr/><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact API]", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
