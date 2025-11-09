"use client";

import type { FormData, Categoria } from "../types";
import { cn } from "@/lib/utils";

type Props = {
  data: FormData;
  onSelect: (categoria: Categoria) => void;
};

const CATEGORIAS: Array<{ key: Categoria; label: string; desc: string }> = [
  { key: "luz", label: "Luz", desc: "Ahorra en tu factura eléctrica" },
  { key: "internet", label: "Internet", desc: "Fibra, móvil y TV" },
  { key: "gas", label: "Gas", desc: "Tarifas de gas natural" },
  { key: "alarmas", label: "Alarmas", desc: "Seguridad para tu hogar/negocio" },
];

export default function Step0Servicio({ data, onSelect }: Props) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {CATEGORIAS.map((c) => {
        const active = data.categoria === c.key;
        return (
          <button
            key={c.key}
            type="button"
            onClick={() => onSelect(c.key)}
            className={cn(
              "group relative border rounded-xl p-5 text-left bg-white dark:bg-neutral-900 transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/60",
              active
                ? "border-blue-500/70"
                : "border-gray-200 dark:border-neutral-800"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="text-xl font-semibold">{c.label}</div>
                <p className="text-sm text-gray-600 dark:text-neutral-400 mt-1">{c.desc}</p>
              </div>
              <span
                aria-hidden
                className={cn(
                  "text-blue-600 transition opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0",
                  active && "opacity-100 translate-x-0"
                )}
              >
                →
              </span>
            </div>
          </button>
        );
      })}
    </section>
  );
}