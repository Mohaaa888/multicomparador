"use client";

import { useEffect, useMemo, useRef } from "react";

type Testimonial = {
  name: string;
  location: string;
  date: string;
  text: string;
  rating: 4 | 5;
};

const TESTIMONIALS: Testimonial[] = [
  { name: "Sara R.", location: "Melilla", date: "11/2025", text: "Me ajustaron la luz con discriminación horaria y se notó en la primera factura. Todo por WhatsApp.", rating: 5 },
  { name: "Juan M.", location: "Granada", date: "11/2025", text: "Fibra instalada en 48h y portabilidad hecha sin quedarme sin línea. Ha sido fácil.", rating: 5 },
  { name: "Laila K.", location: "Madrid", date: "11/2025", text: "Pedí alarma para el local y me dieron 2 opciones de precio y otra con más sensores.", rating: 4 },
  { name: "Carlos V.", location: "Barcelona", date: "11/2025", text: "Cambié electricidad y gas con una sola llamada. Trato muy claro y seguimiento por email.", rating: 5 },
  { name: "Noelia H.", location: "Bilbao", date: "11/2025", text: "Necesitaba fibra para teletrabajar y me consiguieron instalación urgente además de un router 5G.", rating: 5 },
  { name: "David A.", location: "Murcia", date: "11/2025", text: "Me ayudaron a entender mi factura y a contratar una tarifa indexada que pago al coste real.", rating: 4 },
  { name: "Irene U.", location: "Valencia", date: "11/2025", text: "El asesor revisó mis consumos de negocio y me preparó 3 propuestas, todas sin permanencia.", rating: 5 },
  { name: "Samuel G.", location: "Córdoba", date: "11/2025", text: "Instalé alarma Total y financié los equipos en la misma llamada. Gestión impecable.", rating: 5 },
  { name: "Marina D.", location: "A Coruña", date: "11/2025", text: "Presenté la factura y a los 30 minutos tenía una oferta mejor para internet + móvil.", rating: 5 },
];

export function Testimonials({ testimonials = TESTIMONIALS }: { testimonials?: Testimonial[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(1.2);
  const rafRef = useRef<number | null>(null);

  const items = useMemo(() => [...testimonials, ...testimonials], [testimonials]);

  const slide = (dir: "prev" | "next") => {
    const el = sliderRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.9;
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    const animate = () => {
      if (!el) return;
      el.scrollLeft += speedRef.current;
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="mb-12" aria-label="Testimonios de clientes">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-blue-600">Testimonios</p>
          <h2 className="text-xl font-semibold">Lo que dicen nuestros clientes</h2>
          <p className="text-sm text-gray-600 dark:text-neutral-400">Más de 300 gestiones al mes con 4,8/5 ⭐</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => slide("prev")}
            className="h-8 w-8 grid place-items-center rounded-full border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-gray-100 dark:hover:bg-neutral-800"
            aria-label="Opinión anterior"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => slide("next")}
            className="h-8 w-8 grid place-items-center rounded-full border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-gray-100 dark:hover:bg-neutral-800"
            aria-label="Opinión siguiente"
          >
            ›
          </button>
        </div>
      </div>

      <div ref={sliderRef} className="flex gap-4 overflow-x-auto pb-3 no-scrollbar">
        {items.map((t, i) => (
          <article
            key={`${t.name}-${i}`}
            className="snap-start shrink-0 w-64 sm:w-72 md:w-80 rounded-3xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-md flex flex-col gap-4 justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600/80 to-indigo-500/80 text-white grid place-items-center font-semibold text-lg">
                {t.name.slice(0, 1)}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-neutral-50">{t.name}</p>
                <p className="text-xs text-gray-500 dark:text-neutral-400">
                  {t.location} • {t.date}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-neutral-200 leading-relaxed">{t.text}</p>
            <div className="flex items-center gap-1 text-amber-400 text-lg">
              {"★".repeat(t.rating)}
              {t.rating === 4 ? "☆" : ""}
            </div>
          </article>
        ))}
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
