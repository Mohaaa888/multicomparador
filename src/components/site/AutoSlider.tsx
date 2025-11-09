"use client";

import { useEffect, useMemo, useRef } from "react";

type Slide = {
  titleTop: string; // etiqueta pequeña
  title: string;    // encabezado
  desc: string;     // descripción
  cta?: string;     // texto del link
};

function clsx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

const DEFAULT_SLIDES: Slide[] = [
  { titleTop: "Condiciones",   title: "Sin permanencia",   desc: "Cambia cuando quieras. Te mostramos claramente si alguna oferta tiene compromiso.", cta: "Más info →" },
  { titleTop: "Instalación",   title: "Rápida 24–72h",     desc: "Coordinamos la visita y te avisamos por WhatsApp o llamada según prefieras.", cta: "Ver cómo funciona →" },
  { titleTop: "Atención",      title: "WhatsApp disponible", desc: "Seguimiento por chat para confirmar portabilidades y citas de instalación.", cta: "Escríbenos →" },
  { titleTop: "Transparencia", title: "Precios claros",    desc: "Cuotas, instalación y regalos separados. Sin letra pequeña.", cta: "Ejemplos reales →" },
  { titleTop: "Ahorro",        title: "268 € / año*",      desc: "Media estimada cambiando a tarifas óptimas según consumo. *Estimación.", cta: "Cómo calculamos →" },
  { titleTop: "Portabilidad",  title: "Cambio sencillo",   desc: "Nos encargamos del papeleo. Sin cortes ni interrupciones en el servicio.", cta: "Proceso paso a paso →" },
];

export  function AutoSlider({ slides = DEFAULT_SLIDES }: { slides?: Slide[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(1.2); // px por frame (~70px/s)
  const rafRef = useRef<number | null>(null);

  // Duplicamos el contenido para bucle infinito
  const items = useMemo(() => [...slides, ...slides], [slides]);

  function slide(dir: "prev" | "next") {
    const el = sliderRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.9;
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  }

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const animate = () => {
      if (!el) return;
      el.scrollLeft += speedRef.current;
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) el.scrollLeft -= half; // reset suave
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <section className="mb-10" aria-label="Beneficios y pasos">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Por qué elegirnos</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => slide("prev")}
            className="h-8 w-8 grid place-items-center rounded-full border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-gray-100 dark:hover:bg-neutral-800"
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => slide("next")}
            className="h-8 w-8 grid place-items-center rounded-full border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-gray-100 dark:hover:bg-neutral-800"
            aria-label="Siguiente"
          >
            ›
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto pb-2 no-scrollbar"
      >
        {items.map((s, i) => (
          <article
            key={`${s.title}-${i}`}
            data-slide="true"
            className="snap-start shrink-0 w-64 sm:w-72 md:w-72 lg:w-80 h-80 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 flex flex-col justify-between"
          >
            <div>
              <div className="text-xs uppercase tracking-wide text-gray-500">{s.titleTop}</div>
              <h4 className="mt-1 text-lg font-semibold">{s.title}</h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">{s.desc}</p>
            </div>
            {s.cta && <div className="text-sm text-blue-600">{s.cta}</div>}
          </article>
        ))}
      </div>

      {/* Ocultar scrollbar nativo */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}