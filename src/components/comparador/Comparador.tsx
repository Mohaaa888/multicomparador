"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";
import type { Categoria, FormData } from "./types";
import Step0Servicio from "./steps/Step0Categoria"; // ← nuevo, separo para que step0 no se toque
import Step1Preferencias from "./steps/Step1Preferencias";
import Step2Revision from "./steps/Step2Revision";
import Step3Enviado from "./steps/Step3Enviado";
import { isValidEmail, isValidPhone } from "@/lib/validation";

const STEPS_TOTAL = 4;

export type ComparadorHandle = {
  selectCategoria: (categoria: Categoria) => void;
};

export const Comparador = forwardRef<ComparadorHandle, object>(function Comparador(_props, ref) {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [maxStep, setMaxStep] = useState(0);
  const [data, setData] = useState<FormData>({
    categoria: null,
    entrada: "manual",
    common: { nombre: "", telefono: "", email: "", direccion: "", provincia: "", cp: "", aceptar: false },
    luz: { potencia: "", consumoAnual: "", tarifaActual: "", discriminacion: "no" },
    internet: {
      direccion: "",
      tecnologia: "",
      velocidad: "",
      lineasMoviles: "",
      permanencia: "",
      operadorActual: "",
    },
    gas: { consumoAnual: "", tarifaActual: "", uso: "", caldera: "si" },
    alarmas: {
      tipoVivienda: "",
      metros: "",
      mascotas: "",
      prioridad: "precio",
      empresaActual: "",
    },
    facturaFile: null,
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const goToStep = (next: 0 | 1 | 2 | 3) => {
    setStep(next);
    setMaxStep((prev) => Math.max(prev, next));
  };

  // Expose handle to parent (page.tsx / Header)
  useImperativeHandle(ref, () => ({
    selectCategoria: (categoria: Categoria) => {
      setData((prev) => ({ ...prev, categoria }));
      goToStep(1); // go directly to preferencias
    },
  }));

  const progress = ((step + 1) / STEPS_TOTAL) * 100;

  const handleRootChange = (updater: (prev: FormData) => FormData) => {
    setData((prev) => updater(prev));
  };

  type EditableSection = Exclude<keyof FormData, "categoria" | "entrada" | "facturaFile">;
  const handleSectionChange = <S extends EditableSection, K extends keyof FormData[S]>(
    section: S,
    key: K,
    value: FormData[S][K]
  ) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const nombreValido = data.common.nombre.trim().length > 0;
  const direccionValida = data.common.direccion.trim().length > 0;
  const telefonoValido = isValidPhone(data.common.telefono);
  const emailValido = !data.common.email || isValidEmail(data.common.email);
  const provinciaValida = data.common.provincia.trim().length > 0;
  const cpValido = data.common.cp.trim().length > 0;

  const canSubmit =
    nombreValido && telefonoValido && emailValido && direccionValida && provinciaValida && cpValido && data.common.aceptar;

  async function submitLead(forceAccept?: boolean) {
    try {
      setSending(true);
      setError(null);

      const nextCommon = {
        ...data.common,
        aceptar: forceAccept ? true : data.common.aceptar,
      };

      if (forceAccept && !data.common.aceptar) {
        setData((prev) => ({
          ...prev,
          common: { ...prev.common, aceptar: true },
        }));
      }

      const payload = {
        ...data,
        common: nextCommon,
      };

      const hasFile = !!payload.facturaFile;

      if (hasFile) {
        const fd = new FormData();
        fd.append("categoria", payload.categoria ?? "");
        fd.append("entrada", payload.entrada);
        fd.append("common", JSON.stringify(payload.common));
        fd.append("luz", JSON.stringify(payload.luz));
        fd.append("internet", JSON.stringify(payload.internet));
        fd.append("gas", JSON.stringify(payload.gas));
        fd.append("alarmas", JSON.stringify(payload.alarmas));
        if (payload.facturaFile) {
          fd.append("factura", payload.facturaFile, payload.facturaFile.name);
        }

        const res = await fetch("/api/lead", {
          method: "POST",
          body: fd,
        });
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j?.error || "Error enviando el lead");
        }
      } else {
        const res = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            categoria: payload.categoria,
            entrada: payload.entrada,
            common: payload.common,
            luz: payload.luz,
            internet: payload.internet,
            gas: payload.gas,
            alarmas: payload.alarmas,
          }),
        });
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j?.error || "Error enviando el lead");
        }
      }

      goToStep(3);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/60 backdrop-blur shadow-lg p-6 md:p-8 mb-12"
      id="comparador"
    >
      {/* barra de progreso */}
      <div className="w-full h-2 bg-gray-200 rounded overflow-hidden mb-6" aria-label="Progreso">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* stepper simple */}
      <div className="grid grid-cols-4 gap-2 mb-6 text-xs md:text-sm">
        {["Servicio", "Preferencias", "Contacto y revisión", "Enviado"].map((label, i) => {
          const stepIndex = i as 0 | 1 | 2 | 3;
          const isActive = stepIndex === step;
          const isEnabled = stepIndex <= maxStep;
          return (
            <button
              key={label}
              type="button"
              className={`flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[11px] sm:flex-row sm:justify-start sm:gap-2 sm:rounded-full sm:px-2 sm:py-1 sm:text-xs md:text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                isEnabled ? "cursor-pointer" : "cursor-not-allowed opacity-60"
              }`}
              onClick={() => (isEnabled ? goToStep(stepIndex) : null)}
              disabled={!isEnabled}
              aria-current={isActive ? "step" : undefined}
              aria-label={`Paso ${i + 1}: ${label}`}
            >
              <div
                className={
                  stepIndex <= step
                    ? "h-8 w-8 rounded-full bg-blue-600 text-white grid place-items-center text-sm font-semibold"
                    : "h-8 w-8 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 grid place-items-center text-sm"
                }
              >
                {i + 1}
              </div>
              <span
                className={`text-center ${isActive ? "font-medium text-gray-900 dark:text-neutral-50" : "text-gray-500 dark:text-neutral-400"}`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* STEP 0: servicio */}
      {step === 0 && (
        <Step0Servicio
          data={data}
          onSelect={(categoria) => {
            setData((prev) => ({ ...prev, categoria }));
            goToStep(1);
          }}
        />
      )}

      {/* STEP 1: preferencias (aquí va manual/factura) */}
      {step === 1 && (
        <Step1Preferencias
          data={data}
          onChange={handleRootChange}
          onGoContact={() => goToStep(2)}
          onBack={() => goToStep(0)}
          onNext={() => goToStep(2)}
        />
      )}

      {/* STEP 2: contacto + revisión */}
      {step === 2 && (
        <Step2Revision
          data={data}
          onChange={handleSectionChange}
          onBack={() => goToStep(1)}
          onSubmit={(options) => submitLead(options?.forceAccept)}
          sending={sending}
          canSubmit={canSubmit}
          error={error}
        />
      )}

      {/* STEP 3: enviado */}
      {step === 3 && (
        <Step3Enviado
          onVerResumen={() => goToStep(2)}
          onNuevo={() => {
            setData({
              categoria: null,
              entrada: "manual",
              common: { nombre: "", telefono: "", email: "", direccion: "", provincia: "", cp: "", aceptar: false },
              luz: { potencia: "", consumoAnual: "", tarifaActual: "", discriminacion: "no" },
              internet: {
                direccion: "",
                tecnologia: "",
                velocidad: "",
                lineasMoviles: "",
                permanencia: "",
                operadorActual: "",
              },
              gas: { consumoAnual: "", tarifaActual: "", uso: "", caldera: "si" },
              alarmas: {
                tipoVivienda: "",
                metros: "",
                mascotas: "",
                prioridad: "precio",
                empresaActual: "",
              },
              facturaFile: null,
            });
            setStep(0);
            setMaxStep(0);
          }}
        />
      )}
    </section>
  );
});
