"use client";

import { useEffect, useMemo, useState } from "react";

type Testimonial = {
  name: string;
  location: string;
  date: string;
  text: string;
  rating: 4 | 5;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sara R.",
    location: "Melilla",
    date: "12/2024",
    text: "Me ajustaron la luz con discriminación horaria y se notó en la primera factura. Todo por WhatsApp.",
    rating: 5,
  },
  {
    name: "Juan M.",
    location: "Granada",
    date: "03/2025",
    text: "Fibra instalada en 48h y portabilidad hecha sin quedarme sin línea. Ha sido fácil.",
    rating: 5,
  },
  {
    name: "Laila K.",
    location: "Madrid",
    date: "07/2025",
    text: "Pedí alarma para el local y me dieron 2 opciones de precio y otra con más sensores.",
    rating: 4,
  },
  {
    name: "Carlos V.",
    location: "Barcelona",
    date: "06/2025",
    text: "Cambié electricidad y gas con una sola llamada. Trato muy claro y seguimiento por email.",
    rating: 5,
  },
  {
    name: "Noelia H.",
    location: "Bilbao",
    date: "05/2025",
    text: "Necesitaba fibra para teletrabajar y me consiguieron instalación urgente además de un router 5G.",
    rating: 5,
  },
  {
    name: "David A.",
    location: "Murcia",
    date: "04/2025",
    text: "Me ayudaron a entender mi factura y a contratar una tarifa indexada que pago al coste real.",
    rating: 4,
  },
  {
    name: "Irene U.",
    location: "Valencia",
    date: "02/2025",
    text: "El asesor revisó mis consumos de negocio y me preparó 3 propuestas, todas sin permanencia.",
    rating: 5,
  },
  {
    name: "Samuel G.",
    location: "Córdoba",
    date: "01/2025",
    text: "Instalé alarma Total y financié los equipos en la misma llamada. Gestión impecable.",
    rating: 5,
  },
  {
    name: "Marina D.",
    location: "A Coruña",
    date: "11/2024",
    text: "Presenté la factura y a los 30 minutos tenía una oferta mejor para internet + móvil.",
    rating: 5,
  },
];

const chunkTestimonials = (items: Testimonial[], size: number) => {
  const result: Testimonial[][] = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
};

export function Testimonials() {
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setItemsPerSlide(mq.matches ? 3 : 1);
    update();
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  const slides = useMemo(() => chunkTestimonials(TESTIMONIALS, itemsPerSlide), [itemsPerSlide]);

  useEffect(() => {
    if (!slides.length) return;
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    if (!slides.length) return;
    const normalized = ((index % slides.length) + slides.length) % slides.length;
    setCurrentSlide(normalized);
  };

  return (
    <section className="mb-12">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-blue-600">Testimonios</p>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-neutral-50">Lo que dicen nuestros clientes</h2>
            <p className="text-sm text-gray-600 dark:text-neutral-400">
              Más de 200 gestiones al mes con una valoración media de 4,8/5.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => goToSlide(currentSlide - 1)}
              className="h-10 w-10 rounded-full border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
              aria-label="Opinión anterior"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => goToSlide(currentSlide + 1)}
              className="h-10 w-10 rounded-full border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
              aria-label="Opinión siguiente"
            >
              →
            </button>
          </div>
        </div>

        <div className="relative mt-6 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              width: `${slides.length * 100}%`,
            }}
          >
            {slides.map((group, slideIndex) => (
              <div key={`slide-${slideIndex}`} className="w-full flex-shrink-0 px-1">
                <div
                  className="grid gap-4"
                  style={{ gridTemplateColumns: `repeat(${itemsPerSlide}, minmax(0, 1fr))` }}
                >
                  {group.map((t) => (
                    <article
                      key={`${t.name}-${t.date}`}
                      className="relative flex h-full flex-col gap-4 rounded-2xl border border-gray-200/70 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/70 p-5 shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600/80 to-indigo-500/80 text-white grid place-items-center font-semibold text-lg">
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
                      <div className="flex items-center gap-2 text-amber-400" aria-label={`${t.rating} estrellas`}>
                        {"★".repeat(t.rating)}
                        {t.rating === 4 ? "☆" : ""}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={`dot-${i}`}
              type="button"
              onClick={() => goToSlide(i)}
              className={`h-2.5 rounded-full transition-all ${
                currentSlide === i ? "w-6 bg-blue-600" : "w-2.5 bg-gray-300 dark:bg-neutral-700"
              }`}
              aria-label={`Ir a testimonios ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
