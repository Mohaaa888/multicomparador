"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { isValidPhone, normalizeSpanishPhone, sanitizeEmail } from "@/lib/validation";

const CATEGORIAS = ["luz", "internet", "gas", "alarmas"] as const;
type Categoria = typeof CATEGORIAS[number];
const LeadSchema = z.object({
  categoria: z.enum(CATEGORIAS, { message: "Selecciona un servicio" }),
  nombre: z.string().min(3, "Introduce tu nombre completo"),
  telefono: z
    .string()
    .trim()
    .refine((val) => isValidPhone(val), {
      message: "Introduce un teléfono español válido",
    })
    .transform((val) => normalizeSpanishPhone(val)),
  email: z
    .union([z.literal(""), z.string().trim().email("Email inválido")])
    .transform((val) => sanitizeEmail(val)),
  direccion: z
    .string()
    .trim()
    .min(5, "Introduce la dirección completa"),
  cp: z.string().regex(/^\d{5}$/, "Código postal inválido"),
});
type LeadInput = z.infer<typeof LeadSchema>;

export default function LeadForm({ onSent }: { onSent: () => void }) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } =
    useForm<LeadInput>({ resolver: zodResolver(LeadSchema) });
  const categoria = watch("categoria");

  async function onSubmit(values: LeadInput) {
    try {
      setLoading(true);
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Error al enviar");
      reset();
      onSent();
    } catch {
      alert("No se pudo enviar. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Servicio */}
      <div className="grid gap-2">
        <Label>Servicio</Label>
        <Select
          value={categoria}
          onValueChange={(v) => setValue("categoria", v as LeadInput["categoria"], { shouldValidate: true })}
        >
          <SelectTrigger><SelectValue placeholder="Elige servicio" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="luz">Luz</SelectItem>
            <SelectItem value="internet">Internet</SelectItem>
            <SelectItem value="gas">Gas</SelectItem>
            <SelectItem value="alarmas">Alarmas</SelectItem>
          </SelectContent>
        </Select>
        {errors.categoria && <p className="text-sm text-red-600">{errors.categoria.message}</p>}
      </div>

      {/* Nombre */}
      <div className="grid gap-2">
        <Label>Nombre</Label>
        <Input placeholder="Nombre y apellidos" {...register("nombre")} />
        {errors.nombre && <p className="text-sm text-red-600">{errors.nombre.message}</p>}
      </div>

      {/* Teléfono */}
      <div className="grid gap-2">
        <Label>Teléfono</Label>
        <Input inputMode="tel" placeholder="Tu teléfono" {...register("telefono")} />
        {errors.telefono && <p className="text-sm text-red-600">{errors.telefono.message}</p>}
      </div>

      {/* Email opcional */}
      <div className="grid gap-2">
        <Label>Email (opcional)</Label>
        <Input type="email" placeholder="tucorreo@ejemplo.com" {...register("email")} />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>

      {/* Dirección */}
      <div className="grid gap-2">
        <Label>Dirección</Label>
        <Input placeholder="Calle, número, piso..." {...register("direccion")} />
        {errors.direccion && <p className="text-sm text-red-600">{errors.direccion.message}</p>}
      </div>

      {/* CP */}
      <div className="grid gap-2">
        <Label>Código Postal</Label>
        <Input inputMode="numeric" placeholder="52001" {...register("cp")} />
        {errors.cp && <p className="text-sm text-red-600">{errors.cp.message}</p>}
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Enviando..." : "Enviar solicitud"}
      </Button>
    </form>
  );
}
