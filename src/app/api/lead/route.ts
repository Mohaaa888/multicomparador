// src/app/api/lead/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import type {
  LeadPayload,
  Categoria,
  PreferenciaEntrada,
  FormGas,
  FormLuz,
  FormInternet,
  FormAlarmas,
} from "@/components/comparador/types";

export const runtime = "nodejs";

function sanitize(s: unknown) {
  return typeof s === "string" ? s.replace(/[<>]/g, "") : "";
}

function parseCategoria(v: string | null): Categoria | null {
  const allowed: Categoria[] = ["luz", "internet", "gas", "alarmas"];
  if (!v) return null;
  return allowed.includes(v as Categoria) ? (v as Categoria) : null;
}

function parseEntrada(v: string | null): PreferenciaEntrada {
  const allowed: PreferenciaEntrada[] = ["manual", "factura"];
  if (!v) return "manual";
  return allowed.includes(v as PreferenciaEntrada) ? (v as PreferenciaEntrada) : "manual";
}

// 👇 defaults tipados con los literales correctos
const DEFAULT_LUZ: FormLuz = {
  potencia: "",
  consumoAnual: "",
  tarifaActual: "",
  discriminacion: "no",
};

const DEFAULT_INTERNET: FormInternet = {
  direccion: "",
  tecnologia: "",
  velocidad: "",
  lineasMoviles: "",
  permanencia: "",
  operadorActual: "",
};

const DEFAULT_GAS: FormGas = {
  consumoAnual: "",
  tarifaActual: "",
  uso: "",
  caldera: "no",
};

const DEFAULT_ALARMAS: FormAlarmas = {
  tipoVivienda: "",
  metros: "",
  mascotas: "",
  prioridad: "precio",
  empresaActual: "",
};

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let body: Partial<LeadPayload> = {};
    let facturaBuffer: ArrayBuffer | null = null;
    let facturaName = "";

    if (contentType.startsWith("multipart/form-data")) {
      const formData = await req.formData();

      const categoriaStr = formData.get("categoria")?.toString() ?? null;
      const entradaStr = formData.get("entrada")?.toString() ?? null;

      const categoria = parseCategoria(categoriaStr);
      const entrada = parseEntrada(entradaStr);

      const common =
        formData.get("common") != null
          ? (JSON.parse(formData.get("common")!.toString()) as LeadPayload["common"])
          : {
              nombre: "",
              telefono: "",
              email: "",
              direccion: "",
              provincia: "",
              cp: "",
              aceptar: false,
            };

      const luz =
        formData.get("luz") != null
          ? (JSON.parse(formData.get("luz")!.toString()) as FormLuz)
          : DEFAULT_LUZ;

      const internet =
        formData.get("internet") != null
          ? (JSON.parse(formData.get("internet")!.toString()) as FormInternet)
          : DEFAULT_INTERNET;

      const gas =
        formData.get("gas") != null
          ? (JSON.parse(formData.get("gas")!.toString()) as FormGas)
          : DEFAULT_GAS;

      const alarmas =
        formData.get("alarmas") != null
          ? (JSON.parse(formData.get("alarmas")!.toString()) as FormAlarmas)
          : DEFAULT_ALARMAS;

      const factura = formData.get("factura");
      if (factura && factura instanceof File) {
        facturaBuffer = await factura.arrayBuffer();
        facturaName = factura.name;
      }

      body = { categoria, entrada, common, luz, internet, gas, alarmas };
    } else {
      const json = (await req.json()) as Partial<LeadPayload>;
      body = {
        ...json,
        categoria: json.categoria ? parseCategoria(json.categoria) : null,
        entrada: json.entrada ? parseEntrada(json.entrada) : "manual",
        luz: json.luz ?? DEFAULT_LUZ,
        internet: json.internet ?? DEFAULT_INTERNET,
        gas: json.gas ?? DEFAULT_GAS,
        alarmas: json.alarmas ?? DEFAULT_ALARMAS,
      };
    }

    if (!body || !body.categoria) {
      return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
    }

    const API_KEY = process.env.RESEND_API_KEY;
    const FROM = process.env.EMAIL_FROM ?? process.env.LEAD_FROM_EMAIL;
    const TO = process.env.EMAIL_TO ?? process.env.LEAD_TO_EMAIL;

    if (!API_KEY) throw new Error("Missing env: RESEND_API_KEY");
    if (!FROM) throw new Error("Missing env: EMAIL_FROM or LEAD_FROM_EMAIL");
    if (!TO) throw new Error("Missing env: EMAIL_TO or LEAD_TO_EMAIL");

    if (process.env.RESEND_DRY_RUN === "true") {
      console.log("[DRY-RUN] Lead payload:", JSON.stringify(body, null, 2));
      return NextResponse.json({ ok: true, dryRun: true });
    }

    const resend = new Resend(API_KEY);

    const htmlParts: string[] = [
      `<h2>${siteConfig.name} – Nuevo lead (${body.categoria})</h2>`,
      `<p><b>Nombre:</b> ${sanitize(body.common?.nombre)}</p>`,
      `<p><b>Teléfono:</b> ${sanitize(body.common?.telefono)}</p>`,
      `<p><b>Email:</b> ${sanitize(body.common?.email)}</p>`,
      `<p><b>Dirección:</b> ${sanitize(body.common?.direccion)}</p>`,
      `<p><b>Provincia:</b> ${sanitize(body.common?.provincia)}</p>`,
      `<p><b>CP:</b> ${sanitize(body.common?.cp)}</p>`,
      `<p><b>Entrada:</b> ${body.entrada}</p>`,
    ];

    if (body.categoria === "internet") {
      htmlParts.push(
        `<p><b>Dirección:</b> ${sanitize(body.internet?.direccion)}</p>`,
        `<p><b>Tecnología:</b> ${sanitize(body.internet?.tecnologia)}</p>`,
        `<p><b>Velocidad:</b> ${sanitize(body.internet?.velocidad)}</p>`,
        `<p><b>Líneas:</b> ${sanitize(body.internet?.lineasMoviles)}</p>`,
        `<p><b>Permanencia:</b> ${sanitize(body.internet?.permanencia)}</p>`,
        `<p><b>Operador actual:</b> ${sanitize(body.internet?.operadorActual)}</p>`,
      );
    }
    if (body.categoria === "alarmas") {
      htmlParts.push(`<p><b>Compañía actual:</b> ${sanitize(body.alarmas?.empresaActual)}</p>`);
    }

    const attachments: Array<{ filename: string; content: string }> = [];
    if (facturaBuffer) {
      const b64 = Buffer.from(facturaBuffer).toString("base64");
      attachments.push({
        filename: facturaName || "factura.pdf",
        content: b64,
      });
      htmlParts.push(`<p><b>Factura:</b> adjunta ✅</p>`);
    } else if (body.entrada === "factura") {
      htmlParts.push(`<p><b>Factura:</b> el usuario indicó factura pero no se adjuntó.</p>`);
    }

    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `[${siteConfig.name}] Nuevo lead – ${body.categoria}`,
      replyTo: body.common?.email ?? undefined,
      html: htmlParts.join(""),
      attachments: attachments.length ? attachments : undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("[/api/lead] send error:", err);
    const message =
      err instanceof Error ? err.message : typeof err === "string" ? err : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
