"use client";

import { useMemo, useRef, useState } from "react";
import type { FormData, Categoria, PreferenciaEntrada } from "../types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  data: FormData;
  onChange: (updater: (prev: FormData) => FormData) => void;
  onNext: () => void; // cuando ha rellenado manual
  onGoContact: () => void; // cuando sube factura
  onBack: () => void;
};

export default function Step1Preferencias({ data, onChange, onNext, onGoContact, onBack }: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<string | null>(null);

  const handleEntrada = (mode: PreferenciaEntrada) => {
    onChange((prev) => ({
      ...prev,
      entrada: mode,
    }));
  };

  const handleFile = (file: File | null) => {
    onChange((prev) => ({
      ...prev,
      facturaFile: file,
    }));
    // si ha elegido factura y hay archivo → pasar a contacto
    if (data.entrada === "factura" && file) {
      onGoContact();
    }
  };

  const isManual = data.entrada === "manual";

  // opciones específicas según categoría (manual)
  const { isValid, message } = useMemo(() => {
    switch (data.categoria) {
      case "luz": {
        const missing = !data.luz.potencia || !data.luz.tarifaActual;
        return { isValid: !missing, message: missing ? "Selecciona potencia y tarifa." : null };
      }
      case "internet": {
        const missing =
          !data.internet.tecnologia ||
          !data.internet.velocidad ||
          !data.internet.lineasMoviles ||
          !data.internet.permanencia ||
          !data.internet.operadorActual.trim();
        return {
          isValid: !missing,
          message: missing ? "Completa tecnología, velocidad, líneas, permanencia y operador actual." : null,
        };
      }
      case "gas": {
        const missing = !data.gas.tarifaActual || !data.gas.uso;
        return { isValid: !missing, message: missing ? "Selecciona tarifa y uso principal." : null };
      }
      case "alarmas": {
        const missing = !data.alarmas.tipoVivienda || !data.alarmas.mascotas || !data.alarmas.empresaActual.trim();
        return { isValid: !missing, message: missing ? "Indica inmueble, mascotas y empresa actual." : null };
      }
      default:
        return { isValid: true, message: null };
    }
  }, [data]);

  const handleManualNext = () => {
    if (!isValid) {
      setErrors(message);
      return;
    }
    setErrors(null);
    onNext();
  };

  const renderManualFields = () => {
    if (data.categoria === "luz") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium">Potencia contratada (kW)</label>
            <div className="mt-1 flex flex-col gap-2">
              {["2.3", "3.45", "4.6", "5.75", "6.9", "8.05"].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      luz: { ...prev.luz, potencia: p },
                    }))
                  }
                  className={cn(
                    "px-3 py-2 rounded-full border text-sm text-left",
                    data.luz.potencia === p
                      ? "bg-gray-900 text-white dark:bg-white dark:text-neutral-900 border-gray-900 dark:border-white"
                      : "bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-neutral-300"
                  )}
                >
                  {p} kW
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Consumo anual (kWh)</label>
            <input
              className="mt-1 w-full border border-gray-200 dark:border-neutral-800 rounded px-3 py-2 bg-white dark:bg-neutral-900"
              value={data.luz.consumoAnual}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  luz: { ...prev.luz, consumoAnual: e.target.value },
                }))
              }
              placeholder="Ej. 2400"
              inputMode="numeric"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Tarifa actual</label>
            <div className="mt-1 flex flex-col gap-2">
              {[
                { v: "", l: "No lo sé / Otra" },
                { v: "pvpc", l: "PVPC" },
                { v: "fija", l: "Precio fijo" },
                { v: "indexada", l: "Indexada" },
              ].map((o) => (
                <button
                  key={o.v || "otra"}
                  type="button"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      luz: { ...prev.luz, tarifaActual: o.v as "" | "pvpc" | "fija" | "indexada" },
                    }))
                  }
                  className={cn(
                    "px-3 py-2 rounded-full border text-sm text-left",
                    data.luz.tarifaActual === o.v
                      ? "bg-gray-900 text-white dark:bg-white dark:text-neutral-900 border-gray-900 dark:border-white"
                      : "bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-neutral-300"
                  )}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (data.categoria === "internet") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Dirección (para cobertura)</label>
            <input
              className="mt-1 w-full border border-gray-200 dark:border-neutral-800 rounded px-3 py-2 bg-white dark:bg-neutral-900"
              value={data.internet.direccion}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  internet: { ...prev.internet, direccion: e.target.value },
                }))
              }
              placeholder="Calle, número, piso..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Tecnología preferida</label>
            <div className="mt-1 flex flex-col gap-2">
              <button
                type="button"
                onClick={() =>
                  onChange((prev) => ({
                    ...prev,
                    internet: { ...prev.internet, tecnologia: "fibra" },
                  }))
                }
                className={cn(
                  "px-3 py-2 rounded-full border text-sm text-left",
                  data.internet.tecnologia === "fibra"
                    ? "bg-gray-900 text-white dark:bg-white dark:text-neutral-900 border-gray-900 dark:border-white"
                    : "bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-neutral-300"
                )}
              >
                Fibra
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Velocidad deseada</label>
            <div className="mt-1 flex flex-col gap-2">
              {["300", "600", "1000"].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      internet: { ...prev.internet, velocidad: v as "300" | "600" | "1000" },
                    }))
                  }
                  className={cn(
                    "px-3 py-2 rounded-full border text-sm text-left",
                    data.internet.velocidad === v
                      ? "bg-gray-900 text-white dark:bg-white dark:text-neutral-900 border-gray-900 dark:border-white"
                      : "bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-neutral-300"
                  )}
                >
                  {v} Mb
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Líneas móviles</label>
            <div className="mt-1 flex flex-wrap gap-2">
              {["1", "2", "3", "4", ">5"].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      internet: { ...prev.internet, lineasMoviles: v as "1" | "2" | "3" | "4" | ">5" },
                    }))
                  }
                  className={cn(
                    "px-3 py-2 rounded-full border text-sm",
                    data.internet.lineasMoviles === v
                      ? "bg-gray-900 text-white dark:bg-white dark:text-neutral-900 border-gray-900 dark:border-white"
                      : "bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-neutral-300"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Permanencia</label>
            <div className="mt-1 flex flex-col gap-2">
              {[
                { v: "0", l: "Sin permanencia" },
                { v: "<3", l: "< 3 meses" },
                { v: "<6", l: "< 6 meses" },
                { v: "otros", l: "Otros" },
              ].map((o) => (
                <button
                  key={o.v}
                  type="button"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      internet: { ...prev.internet, permanencia: o.v as "0" | "<3" | "<6" | "otros" },
                    }))
                  }
                  className={cn(
                    "px-3 py-2 rounded-full border text-sm text-left",
                    data.internet.permanencia === o.v
                      ? "bg-gray-900 text-white dark:bg-white dark:text-neutral-900 border-gray-900 dark:border-white"
                      : "bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-neutral-300"
                  )}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Operador actual *</label>
            <input
              className="mt-1 w-full border border-gray-200 dark:border-neutral-800 rounded px-3 py-2 bg-white dark:bg-neutral-900"
              value={data.internet.operadorActual}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  internet: { ...prev.internet, operadorActual: e.target.value },
                }))
              }
              placeholder="Ej. Movistar, Orange..."
            />
          </div>
        </div>
      );
    }

    if (data.categoria === "gas") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium">Consumo anual (kWh)</label>
            <input
              className="mt-1 w-full border border-gray-200 dark:border-neutral-800 rounded px-3 py-2 bg-white dark:bg-neutral-900"
              value={data.gas.consumoAnual}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  gas: { ...prev.gas, consumoAnual: e.target.value },
                }))
              }
              placeholder="Ej. 6000"
              inputMode="numeric"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Tarifa actual</label>
            <div className="mt-1 flex flex-col gap-2">
              {[
                { v: "", l: "No lo sé / Otra" },
                { v: "rl1", l: "RL.1" },
                { v: "rl2", l: "RL.2" },
                { v: "rl3", l: "RL.3" },
              ].map((o) => (
                <button
                  key={o.v || "otra"}
                  type="button"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      gas: { ...prev.gas, tarifaActual: o.v as "" | "rl1" | "rl2" | "rl3" },
                    }))
                  }
                  className={cn(
                    "px-3 py-2 rounded-full border text-sm text-left",
                    data.gas.tarifaActual === o.v
                      ? "bg-gray-900 text-white dark:bg-white dark:text-neutral-900 border-gray-900 dark:border-white"
                      : "bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-neutral-300"
                  )}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Uso principal</label>
            <div className="mt-1 flex flex-col gap-2">
              {[
                { v: "cocina", l: "Cocina" },
                { v: "acs", l: "Agua caliente" },
                { v: "calefaccion", l: "Calefacción" },
              ].map((o) => (
                <button
                  key={o.v}
                  type="button"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      gas: { ...prev.gas, uso: o.v as "cocina" | "acs" | "calefaccion" },
                    }))
                  }
                  className={cn(
                    "px-3 py-2 rounded-full border text-sm text-left",
                    data.gas.uso === o.v
                      ? "bg-gray-900 text-white dark:bg-white dark:text-neutral-900 border-gray-900 dark:border-white"
                      : "bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-neutral-300"
                  )}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (data.categoria === "alarmas") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium">Tipo de inmueble</label>
            <div className="mt-1 flex flex-col gap-2">
              {[
                { v: "piso", l: "Piso" },
                { v: "chalet", l: "Chalet" },
                { v: "local", l: "Local" },
              ].map((o) => (
                <button
                  key={o.v}
                  type="button"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      alarmas: { ...prev.alarmas, tipoVivienda: o.v as "piso" | "chalet" | "local" },
                    }))
                  }
                  className={cn(
                    "px-3 py-2 rounded-full border text-sm text-left",
                    data.alarmas.tipoVivienda === o.v
                      ? "bg-gray-900 text-white dark:bg-white dark:text-neutral-900 border-gray-900 dark:border-white"
                      : "bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-neutral-300"
                  )}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Metros cuadrados</label>
            <input
              className="mt-1 w-full border border-gray-200 dark:border-neutral-800 rounded px-3 py-2 bg-white dark:bg-neutral-900"
              value={data.alarmas.metros}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  alarmas: { ...prev.alarmas, metros: e.target.value },
                }))
              }
              placeholder="Ej. 80"
              inputMode="numeric"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">¿Mascotas?</label>
            <div className="mt-1 inline-flex rounded-lg border border-gray-200 dark:border-neutral-800 overflow-hidden">
              <button
                type="button"
                onClick={() =>
                  onChange((prev) => ({
                    ...prev,
                    alarmas: { ...prev.alarmas, mascotas: "no" },
                  }))
                }
                className={cn(
                  "px-3 py-2 text-sm",
                  data.alarmas.mascotas === "no"
                    ? "bg-gray-900 text-white dark:bg-white dark:text-neutral-900"
                    : "bg-white dark:bg-neutral-900 text-gray-700 dark:text-neutral-300"
                )}
              >
                No
              </button>
              <button
                type="button"
                onClick={() =>
                  onChange((prev) => ({
                    ...prev,
                    alarmas: { ...prev.alarmas, mascotas: "si" },
                  }))
                }
                className={cn(
                  "px-3 py-2 text-sm border-l border-gray-200 dark:border-neutral-800",
                  data.alarmas.mascotas === "si"
                    ? "bg-gray-900 text-white dark:bg-white dark:text-neutral-900"
                    : "bg-white dark:bg-neutral-900 text-gray-700 dark:text-neutral-300"
                )}
              >
                Sí
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Compañía actual *</label>
            <input
              className="mt-1 w-full border border-gray-200 dark:border-neutral-800 rounded px-3 py-2 bg-white dark:bg-neutral-900"
              value={data.alarmas.empresaActual}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  alarmas: { ...prev.alarmas, empresaActual: e.target.value },
                }))
              }
              placeholder="Ej. Prosegur, Securitas..."
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="space-y-8">
      {/* modo de entrada */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-800 dark:text-neutral-100">
          ¿Cómo quieres darnos los datos?
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => handleEntrada("manual")}
            className={cn(
              "px-4 py-2 rounded-full border text-sm",
              data.entrada === "manual"
                ? "bg-gray-900 text-white dark:bg-white dark:text-neutral-900 border-gray-900 dark:border-white"
                : "bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-neutral-300"
            )}
          >
            Rellenar manualmente
          </button>
          <button
            type="button"
            onClick={() => handleEntrada("factura")}
            className={cn(
              "px-4 py-2 rounded-full border text-sm",
              data.entrada === "factura"
                ? "bg-gray-900 text-white dark:bg-white dark:text-neutral-900 border-gray-900 dark:border-white"
                : "bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-neutral-300"
            )}
          >
            Subir factura
          </button>
        </div>
      </div>

      {/* si factura: solo input */}
      {data.entrada === "factura" ? (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-800 dark:text-neutral-100">
            Sube tu última factura (PDF o imagen)
          </label>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,image/*"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            className="block w-full text-sm text-gray-900 dark:text-neutral-100 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-xs text-gray-500 dark:text-neutral-500">
            La enviaremos junto con tu solicitud para que te hagan una oferta exacta.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" type="button" onClick={onBack}>
              Atrás
            </Button>
            <Button type="button" onClick={onGoContact} disabled={!data.facturaFile}>
              Continuar
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* si manual: mostrar campos según categoría */}
          {renderManualFields()}
          {errors && <p className="text-sm text-red-600">{errors}</p>}
          <div className="flex gap-3">
            <Button variant="outline" type="button" onClick={onBack}>
              Atrás
            </Button>
            <Button type="button" onClick={handleManualNext}>
              Continuar
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
