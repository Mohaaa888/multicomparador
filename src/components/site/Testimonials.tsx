"use client";

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
];

export function Testimonials() {
  return (
    <section className="mb-12">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="flex items-baseline justify-between mb-4">
          <div className="text-left">
            <h2 className="text-lg font-semibold">Opiniones</h2>
            <p className="text-sm text-gray-500 dark:text-neutral-400">
              Clientes que ya han usado Ahorro Fijo para cambiar de tarifa.
            </p>
          </div>
          <div className="text-sm text-gray-600 dark:text-neutral-400">
            Valoración media <span className="font-semibold">4,8/5 ⭐</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.name + t.date}
              className="border border-gray-200 dark:border-neutral-800 rounded-lg p-4 bg-white dark:bg-neutral-900 sm:w-64 md:w-72 mx-auto"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 grid place-items-center text-sm font-semibold text-blue-700 dark:text-blue-200">
                  {t.name.slice(0, 1)}
                </div>
                <div>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-xs text-gray-500">
                    {t.location} • {t.date}
                  </div>
                </div>
              </div>
              <div
                className="mt-2 text-yellow-500"
                aria-label={`${t.rating} estrellas`}
              >
                {"★".repeat(t.rating)}
                {t.rating === 4 ? "☆" : ""}
              </div>
              <p className="text-sm text-gray-700 dark:text-neutral-300 mt-2">
                {t.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}