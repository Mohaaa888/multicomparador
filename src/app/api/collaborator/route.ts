import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/config/site";

function sanitize(value: unknown) {
  return typeof value === "string" ? value.replace(/[<>]/g, "") : "";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      company?: string;
      contact?: string;
      email?: string;
      phone?: string;
      message?: string;
    };

    const company = body.company?.trim();
    const contact = body.contact?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim();
    const message = body.message?.trim() ?? "";

    if (!company || !contact || !email || !phone) {
      return NextResponse.json({ ok: false, error: "Campos obligatorios" }, { status: 400 });
    }

    const API_KEY = process.env.RESEND_API_KEY;
    const FROM = process.env.EMAIL_FROM ?? process.env.LEAD_FROM_EMAIL;
    const TO = process.env.EMAIL_TO ?? process.env.LEAD_TO_EMAIL;
    const COLLAB_TO = process.env.COLLAB_TO_EMAIL ?? TO;

    if (!API_KEY || !FROM || !COLLAB_TO) {
      console.warn("[collaborator] Falta configuración de correo. Enviando en modo simulación.");
      return NextResponse.json({ ok: true, dryRun: true });
    }

    const resend = new Resend(API_KEY);

    await resend.emails.send({
      from: FROM,
      to: COLLAB_TO,
      subject: `[${siteConfig.name}] Nuevo collab potencial`,
      replyTo: email,
      html: `
        <h2>Solicitud de colaboración</h2>
        <p><b>Empresa:</b> ${sanitize(company)}</p>
        <p><b>Contacto:</b> ${sanitize(contact)}</p>
        <p><b>Email:</b> ${sanitize(email)}</p>
        <p><b>Teléfono:</b> ${sanitize(phone)}</p>
        <p><b>Mensaje:</b> ${sanitize(message)}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[collaborator] error", error);
    return NextResponse.json({ ok: false, error: "No se pudo procesar" }, { status: 500 });
  }
}
