"use client";

const STORES = [
  { name: "Tienda 1", address: "Calle Mayor 12, Madrid" },
  { name: "Tienda 2", address: "Av. Diagonal 101, Barcelona" },
  { name: "Tienda 3", address: "Gran Vía 45, Valencia" },
  { name: "Tienda 4", address: "Plaza Nueva 3, Sevilla" },
  { name: "Tienda 5", address: "Calle Larios 20, Málaga" },
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
          {STORES.map((store) => (
            <div
              key={store.name}
              className="rounded-xl border border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900/60 px-4 py-3"
            >
              <div className="text-sm font-semibold text-gray-900 dark:text-neutral-100">{store.name}</div>
              <div className="text-xs text-gray-600 dark:text-neutral-400">{store.address}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
