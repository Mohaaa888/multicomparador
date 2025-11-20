import Image from "next/image";

const LOGOS = [
  { name: "Repsol", src: "https://logo.clearbit.com/repsol.com?size=256" },
  { name: "Lowi", src: "https://logo.clearbit.com/lowi.es?size=256" },
  { name: "O2", src: "https://logo.clearbit.com/o2online.es?size=256" },
  { name: "Vodafone", src: "https://logo.clearbit.com/vodafone.es?size=256" },
  { name: "ADT", src: "https://logo.clearbit.com/adt.com?size=256" },
  { name: "Movistar", src: "https://logo.clearbit.com/movistar.es?size=256" },
];

export function PartnerLogos() {
  return (
    <section className="mb-10" aria-label="Operadores con los que trabajamos">
      <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-6 py-5 shadow-sm">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Confían en Multicomparador</p>
          <h3 className="mt-1 text-base font-semibold">Trabajamos con los principales operadores</h3>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {LOGOS.map((logo) => (
            <div key={logo.name} className="flex h-12 w-28 items-center justify-center">
              <Image
                src={logo.src}
                alt={`Logo de ${logo.name}`}
                width={140}
                height={48}
                className="max-h-full object-contain opacity-80 transition hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
