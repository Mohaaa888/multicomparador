"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";
import type { Categoria, FormData } from "./types";
import Step0Servicio from "./steps/Step0Categoria"; // ← nuevo, separo para que step0 no se toque
import Step1Preferencias from "./steps/Step1Preferencias";
import Step2Revision from "./steps/Step2Revision";
import Step3Enviado from "./steps/Step3Enviado";

const STEPS_TOTAL = 4;

export type ComparadorHandle = {
  selectCategoria: (categoria: Categoria) => void;
};

export const Comparador = forwardRef<ComparadorHandle, object>(function Comparador(_props, ref) {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [data, setData] = useState<FormData>({
    categoria: null,
    entrada: "manual",
    common: { nombre: "", telefono: "", email: "", provincia: "", cp: "", aceptar: false },
    luz: { potencia: "3.45", consumoAnual: "", tarifaActual: "", discriminacion: "no" },
    internet: {
      direccion: "",
      tecnologia: "fibra",
      velocidad: "300",
      lineasMoviles: "1",
      permanencia: "0",
      operadorActual: "",
    },
    gas: { consumoAnual: "", tarifaActual: "", uso: "acs", caldera: "si" },
    alarmas: {
      tipoVivienda: "piso",
      metros: "80",
      mascotas: "no",
      prioridad: "precio",
      empresaActual: "",
    },
    facturaFile: null,
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Expose handle to parent (page.tsx / Header)
  useImperativeHandle(ref, () => ({
    selectCategoria: (categoria: Categoria) => {
      setData((prev) => ({ ...prev, categoria }));
      setStep(1); // go directly to preferencias
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

  const canSubmit =
    !!data.common.nombre &&
    !!data.common.telefono &&
    !!data.common.provincia &&
    !!data.common.cp &&
    data.common.aceptar;

  async function submitLead() {
    try {
      setSending(true);
      setError(null);

      const hasFile = !!data.facturaFile;

      if (hasFile) {
        const fd = new FormData();
        fd.append("categoria", data.categoria ?? "");
        fd.append("entrada", data.entrada);
        fd.append("common", JSON.stringify(data.common));
        fd.append("luz", JSON.stringify(data.luz));
        fd.append("internet", JSON.stringify(data.internet));
        fd.append("gas", JSON.stringify(data.gas));
        fd.append("alarmas", JSON.stringify(data.alarmas));
        if (data.facturaFile) {
          fd.append("factura", data.facturaFile, data.facturaFile.name);
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
            categoria: data.categoria,
            entrada: data.entrada,
            common: data.common,
            luz: data.luz,
            internet: data.internet,
            gas: data.gas,
            alarmas: data.alarmas,
          }),
        });
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j?.error || "Error enviando el lead");
        }
      }

      setStep(3);
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
        {["Servicio", "Preferencias", "Contacto y revisión", "Enviado"].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={
                i <= step
                  ? "h-8 w-8 rounded-full bg-blue-600 text-white grid place-items-center text-sm font-semibold"
                  : "h-8 w-8 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 grid place-items-center text-sm"
              }
            >
              {i + 1}
            </div>
            <span
              className={
                i === step ? "font-medium text-gray-900 dark:text-neutral-50" : "text-gray-500 dark:text-neutral-400"
              }
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* STEP 0: servicio */}
      {step === 0 && (
        <Step0Servicio
          data={data}
          onSelect={(categoria) => {
            setData((prev) => ({ ...prev, categoria }));
            setStep(1);
          }}
        />
      )}

      {/* STEP 1: preferencias (aquí va manual/factura) */}
      {step === 1 && (
        <Step1Preferencias
          data={data}
          onChange={handleRootChange}
          onGoContact={() => setStep(2)}
          onBack={() => setStep(0)}
          onNext={() => setStep(2)}
        />
      )}

      {/* STEP 2: contacto + revisión */}
      {step === 2 && (
        <Step2Revision
          data={data}
          onChange={handleSectionChange}
          onBack={() => setStep(1)}
          onSubmit={submitLead}
          sending={sending}
          canSubmit={canSubmit}
          error={error}
        />
      )}

      {/* STEP 3: enviado */}
      {step === 3 && (
        <Step3Enviado
          onVerResumen={() => setStep(2)}
          onNuevo={() => {
            setData({
              categoria: null,
              entrada: "manual",
              common: { nombre: "", telefono: "", email: "", provincia: "", cp: "", aceptar: false },
              luz: { potencia: "3.45", consumoAnual: "", tarifaActual: "", discriminacion: "no" },
              internet: {
                direccion: "",
                tecnologia: "fibra",
                velocidad: "300",
                lineasMoviles: "1",
                permanencia: "0",
                operadorActual: "",
              },
              gas: { consumoAnual: "", tarifaActual: "", uso: "acs", caldera: "si" },
              alarmas: {
                tipoVivienda: "piso",
                metros: "80",
                mascotas: "no",
                prioridad: "precio",
                empresaActual: "",
              },
              facturaFile: null,
            });
            setStep(0);
          }}
        />
      )}
    </section>
  );
});