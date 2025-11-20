"use client";

const STORES = [
  "Carrer Manlleu 117 baixos 08570 Torelló",
  "Avinguda Roma 96 local Manlleu",
  "Ramón Abadal 4 Vic",
  "Av. d'Amèrica, 43 local 4, 08913 Badalona, Barcelona",
  "Calle Doctor Candi Bayés 68 local Vic",
  "Carretera Alicun 24 Roquetas de Mar",
  "Calle Torras i Bages 2 local Salt",
];

export function VisitUs() {
  return (
    <section className="mb-10">
      <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-600">Visítanos</p>
          <h2 className="text-xl font-semibold">Ven a una de nuestras tiendas físicas</h2>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            Haz tus gestiones con un asesor cara a cara. Estamos ampliando nuestra red de puntos.
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STORES.map((address) => (
            <div
              key={address}
              className="rounded-xl border border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900/60 px-4 py-3"
            >
              <div className="text-xs text-gray-600 dark:text-neutral-300">{address}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
