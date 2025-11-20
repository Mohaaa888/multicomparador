"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function CollaboratorForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      company: formData.get("company")?.toString().trim() || "",
      contact: formData.get("contact")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      phone: formData.get("phone")?.toString().trim() || "",
      message: formData.get("message")?.toString().trim() || "",
    };

    if (!payload.company || !payload.contact || !payload.email || !payload.phone) {
      setError("Completa los campos obligatorios.");
      return;
    }

    try {
      setStatus("loading");
      setError(null);
      const res = await fetch("/api/collaborator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("No se pudo enviar");
      setStatus("success");
      event.currentTarget.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("No se pudo enviar. Inténtalo de nuevo.");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  return (
    <section id="colabora" className="mb-10 scroll-mt-24">
      <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-gradient-to-br from-blue-50 to-white dark:from-neutral-900 dark:to-neutral-950 p-6 shadow-sm">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.25em] text-blue-700">Colabora</p>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-neutral-50">¿Quieres ser colaborador?</h2>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            Déjanos tus datos y nos pondremos en contacto para integrarte en la red de partners de {"Tu Ahorro Fijo"}.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="company">Empresa *</label>
            <Input id="company" name="company" placeholder="Nombre de la empresa" required />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="contact">Persona de contacto *</label>
            <Input id="contact" name="contact" placeholder="Nombre y apellidos" required />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="email">Email *</label>
            <Input id="email" type="email" name="email" placeholder="tu@empresa.com" required />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="phone">Teléfono *</label>
            <Input id="phone" name="phone" inputMode="tel" placeholder="+34 600 123 123" required />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-sm font-medium" htmlFor="message">Mensaje</label>
            <Textarea id="message" name="message" placeholder="Cuéntanos qué servicio ofreces" rows={3} />
          </div>
          <div className="md:col-span-2 flex flex-col gap-2">
            <Button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Enviando..." : "Quiero colaborar"}
            </Button>
            {status === "success" && <p className="text-sm text-green-600">¡Gracias! Te contactaremos pronto.</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
