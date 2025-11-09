"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { FormData } from "../types";

type EditableSection = "common" | "luz" | "internet" | "gas" | "alarmas";

type Props = {
  data: FormData;
  onChange: <S extends EditableSection, K extends keyof FormData[S]>(
    section: S,
    key: K,
    value: FormData[S][K]
  ) => void;
  onBack: () => void;
  onSubmit: () => void;
  sending: boolean;
  canSubmit: boolean;
  error: string | null;
};

export default function Step2Revision({
  data,
  onChange,
  onBack,
  onSubmit,
  sending,
  canSubmit,
  error,
}: Props) {
  const [triedSubmit, setTriedSubmit] = useState(false);

  const c = data.common;
  const missingNombre = triedSubmit && !c.nombre;
  const missingTelefono = triedSubmit && !c.telefono;
  const missingProvincia = triedSubmit && !c.provincia;
  const missingCp = triedSubmit && !c.cp;
  const missingAceptar = triedSubmit && !c.aceptar;

  const handleSubmit = () => {
    setTriedSubmit(true);
    if (canSubmit) {
      onSubmit();
    }
  };

  return (
    <section className="space-y-6">
      {/* cabecera */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="text-sm text-gray-600 dark:text-neutral-400 hover:underline"
          type="button"
        >
          ← Volver
        </button>
        {data.categoria ? (
          <span className="text-sm px-2 py-1 rounded bg-gray-100 dark:bg-neutral-800 capitalize">
            {data.categoria}
          </span>
        ) : null}
        <span className="text-xs text-gray-500 dark:text-neutral-500">Contacto y revisión</span>
      </div>

      {/* error del servidor */}
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>
            {error || "Ha ocurrido un error al enviar el formulario."}
          </AlertDescription>
        </Alert>
      ) : null}

      {/* aviso de campos vacíos */}
      {!canSubmit && triedSubmit ? (
        <Alert className="bg-yellow-50 text-yellow-900 dark:bg-yellow-900/40 dark:text-yellow-50 border-yellow-200 dark:border-yellow-800">
          <AlertDescription>
            Completa los campos obligatorios marcados en rojo.
          </AlertDescription>
        </Alert>
      ) : null}

      {/* Datos de contacto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Nombre y apellidos *</label>
          <input
            className={
              "mt-1 w-full border rounded px-3 py-2 bg-white dark:bg-neutral-900 " +
              (missingNombre
                ? "border-red-500 focus-visible:outline-red-500"
                : "border-gray-200 dark:border-neutral-800")
            }
            value={c.nombre}
            onChange={(e) => onChange("common", "nombre", e.target.value)}
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Teléfono *</label>
          <input
            className={
              "mt-1 w-full border rounded px-3 py-2 bg-white dark:bg-neutral-900 " +
              (missingTelefono
                ? "border-red-500 focus-visible:outline-red-500"
                : "border-gray-200 dark:border-neutral-800")
            }
            value={c.telefono}
            onChange={(e) => onChange("common", "telefono", e.target.value)}
            placeholder="Número de contacto"
            inputMode="tel"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            className="mt-1 w-full border border-gray-200 dark:border-neutral-800 rounded px-3 py-2 bg-white dark:bg-neutral-900"
            value={c.email}
            onChange={(e) => onChange("common", "email", e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            type="email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Provincia *</label>
          <input
            className={
              "mt-1 w-full border rounded px-3 py-2 bg-white dark:bg-neutral-900 " +
              (missingProvincia
                ? "border-red-500 focus-visible:outline-red-500"
                : "border-gray-200 dark:border-neutral-800")
            }
            value={c.provincia}
            onChange={(e) => onChange("common", "provincia", e.target.value)}
            placeholder="Ej. Melilla"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Código Postal *</label>
          <input
            className={
              "mt-1 w-full border rounded px-3 py-2 bg-white dark:bg-neutral-900 " +
              (missingCp
                ? "border-red-500 focus-visible:outline-red-500"
                : "border-gray-200 dark:border-neutral-800")
            }
            value={c.cp}
            onChange={(e) => onChange("common", "cp", e.target.value)}
            placeholder="Ej. 52001"
            inputMode="numeric"
          />
        </div>
      </div>

      {/* Aceptación */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={c.aceptar}
          onClick={() => onChange("common", "aceptar", !c.aceptar)}
          className={
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors border " +
            (c.aceptar
              ? "bg-blue-600 border-blue-600"
              : missingAceptar
              ? "bg-red-100 border-red-500"
              : "bg-gray-200 dark:bg-neutral-800 border-gray-300 dark:border-neutral-700")
          }
        >
          <span
            className={
              "inline-block h-5 w-5 transform rounded-full bg-white dark:bg-neutral-900 shadow transition-transform " +
              (c.aceptar ? "translate-x-5" : "translate-x-1")
            }
          />
          <span className="sr-only">Aceptar contacto</span>
        </button>
        <span className="text-sm text-gray-700 dark:text-neutral-300">
          Acepto ser contactado para recibir ofertas personalizadas.
        </span>
      </div>

      {/* Resumen rápido por categoría */}
      <div className="border border-gray-200 dark:border-neutral-800 rounded-lg p-4 bg-white dark:bg-neutral-900">
        <h2 className="text-sm font-semibold mb-3">Resumen de tu solicitud</h2>
        {data.categoria === "luz" && (
          <ul className="text-sm text-gray-700 dark:text-neutral-300 space-y-1">
            <li>Potencia: {data.luz.potencia} kW</li>
            <li>Consumo anual: {data.luz.consumoAnual || "—"}</li>
            <li>Tarifa actual: {data.luz.tarifaActual || "—"}</li>
            <li>Discriminación: {data.luz.discriminacion === "si" ? "Sí" : "No"}</li>
          </ul>
        )}
        {data.categoria === "internet" && (
          <ul className="text-sm text-gray-700 dark:text-neutral-300 space-y-1">
            <li>Dirección: {data.internet.direccion || "—"}</li>
            <li>Tecnología: {data.internet.tecnologia}</li>
            <li>Velocidad: {data.internet.velocidad} Mb</li>
            <li>Líneas: {data.internet.lineasMoviles}</li>
            <li>Permanencia: {data.internet.permanencia}</li>
            <li>Operador actual: {data.internet.operadorActual || "—"}</li>
          </ul>
        )}
        {data.categoria === "gas" && (
          <ul className="text-sm text-gray-700 dark:text-neutral-300 space-y-1">
            <li>Consumo anual: {data.gas.consumoAnual || "—"}</li>
            <li>Tarifa actual: {data.gas.tarifaActual || "—"}</li>
            <li>Uso: {data.gas.uso}</li>
            <li>Caldera: {data.gas.caldera === "si" ? "Sí" : "No"}</li>
          </ul>
        )}
        {data.categoria === "alarmas" && (
          <ul className="text-sm text-gray-700 dark:text-neutral-300 space-y-1">
            <li>Inmueble: {data.alarmas.tipoVivienda}</li>
            <li>Metros: {data.alarmas.metros} m²</li>
            <li>Mascotas: {data.alarmas.mascotas === "si" ? "Sí" : "No"}</li>
            <li>Prioridad: {data.alarmas.prioridad}</li>
            <li>Empresa actual: {data.alarmas.empresaActual || "—"}</li>
          </ul>
        )}
        {data.entrada === "factura" && (
          <p className="text-xs text-amber-500 mt-3">El usuario ha elegido enviar factura.</p>
        )}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" type="button" onClick={onBack}>
          Atrás
        </Button>
        <Button type="button" onClick={handleSubmit} disabled={sending}>
          {sending ? "Enviando..." : "Enviar solicitud"}
        </Button>
      </div>
    </section>
  );
}