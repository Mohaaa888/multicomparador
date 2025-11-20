import Image from "next/image";

const LOGOS = [
  { name: "Repsol", src: "https://logo.clearbit.com/repsol.com?size=256" },
  { name: "Lowi", src: "https://logo.clearbit.com/lowi.es?size=256" },
  { name: "O2", src: "https://logo.clearbit.com/o2online.es?size=256" },
  { name: "Vodafone", src: "https://logo.clearbit.com/vodafone.es?size=256" },
  { name: "ADT", src: "https://logo.clearbit.com/adt.com?size=256" },
  { name: "Endesa", src: "https://logo.clearbit.com/endesa.com?size=256" },
  { name: "Naturgy", src: "/logos/naturgy.svg" },
  { name: "Gana Energía", src: "https://logo.clearbit.com/ganaenergia.com?size=256" },
  { name: "Acis", src: "https://logo.clearbit.com/acisenergia.com?size=256" },
  { name: "Segurma", src: "https://logo.clearbit.com/segurma.com?size=256" },
  { name: "Orange", src: "https://logo.clearbit.com/orange.es?size=256" },
  { name: "Parlem", src: "https://logo.clearbit.com/parlem.com?size=256" },
  { name: "Plenitude", src: "/logos/plenitude.svg" },
  { name: "Nexus", src: "https://logo.clearbit.com/nexusenergia.com?size=256" },
  { name: "Unic88", src: "/logos/unic88.svg" },
];

export function PartnerLogos() {
  return (
    <section className="mb-10" aria-label="Marcas con las que trabajamos">
      <div className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-6 py-5 shadow-sm">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Confían en Ahorro Fijo</p>
          <h3 className="mt-1 text-base font-semibold">Trabajamos con las principales marcas</h3>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          {LOGOS.map((logo) => (
            <div key={logo.name} className="flex flex-col items-center h-16 w-24 justify-between text-xs text-gray-600">
              <Image
                src={logo.src}
                alt={`Logo de ${logo.name}`}
                width={110}
                height={38}
                className={`max-h-full object-contain transition ${logo.name === "Repsol" ? "" : "opacity-80 hover:opacity-100"}`}
              />
              <span className="text-center text-[11px]">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
