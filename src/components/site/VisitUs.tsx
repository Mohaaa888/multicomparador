"use client";

import Image from "next/image";

const STORE_IMAGES = [
  {
    src: "/stores/malaga-alcalde-diaz-zafra-exterior.jpg",
    alt: "Exterior de una tienda Ahorro Fijo",
  },
  {
    src: "/stores/malaga-alcalde-diaz-zafra-interior.jpg",
    alt: "Interior de una tienda Ahorro Fijo",
  },
];

const STORES = [
  {
    name: "Tienda Málaga",
    address: "Calle Alcalde Díaz Zafra, 18, 29006 Málaga",
  },
  {
    name: "Tienda Vidreres",
    address: "Plaça de l'Església, 3 local, 17411 Vidreres",
  },
  {
    name: "Tienda Blanes",
    address: "Carrer Valls, 33 local, 17300 Blanes",
  },
  {
    name: "Tienda Barcelona",
    address: "Rambla Poblenou, 164, 08018 Barcelona",
  },
];

export function VisitUs() {
  return (
    <section className="mb-10" id="tiendas">
      <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-600">Visítanos</p>
          <h2 className="text-xl font-semibold">Visita nuestras tiendas</h2>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            Haz tus gestiones con un asesor cara a cara. Estamos ampliando nuestra red de puntos.
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/70 p-3 dark:border-blue-900/40 dark:bg-blue-950/20">
          <div className="grid gap-3 sm:grid-cols-2">
            {STORE_IMAGES.map((image) => (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={600}
                height={800}
                sizes="(min-width: 640px) 45vw, 90vw"
                className="h-52 w-full rounded-lg object-cover sm:h-56"
              />
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {STORES.map((store) => (
            <div
              key={store.address}
              className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-4 dark:border-neutral-800 dark:bg-neutral-900/60"
            >
              <div className="text-sm font-medium text-gray-800 dark:text-neutral-100">{store.name}</div>
              <div className="mt-1 text-xs text-gray-600 dark:text-neutral-300">{store.address}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
