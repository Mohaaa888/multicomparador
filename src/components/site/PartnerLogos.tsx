import Image from "next/image";

const LOGOS = [
  { name: "Repsol", src: "/logos/repsol.svg" },
  { name: "Lowi", src: "/logos/lowi.svg" },
  { name: "O2", src: "/logos/o2.svg", frameClassName: "flex h-12 w-12 items-center justify-center rounded-full bg-[#0050F0] p-2.5" },
  { name: "Vodafone", src: "/logos/vodafone.png" },
  { name: "ADT", src: "/logos/adt.svg" },
  { name: "Endesa", src: "/logos/endesa.svg" },
  { name: "Naturgy", src: "/logos/naturgy.svg" },
  { name: "Gana Energía", src: "/logos/gana-energia.svg" },
  { name: "Orange", src: "/logos/orange.svg" },
  { name: "Parlem", src: "/logos/parlem.svg" },
  { name: "Plenitude", src: "/logos/plenitude.svg" },
  { name: "Nexus", src: "/logos/nexus.png" },
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
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-8 sm:gap-x-10">
          {LOGOS.map((logo) => (
            <div key={logo.name} className="flex h-20 w-28 flex-col items-center justify-between text-xs text-gray-600">
              <div className={logo.frameClassName ?? "flex h-12 w-full items-center justify-center"}>
                <Image
                  src={logo.src}
                  alt={`Logo de ${logo.name}`}
                  width={132}
                  height={48}
                  className="h-full w-full object-contain opacity-90 transition hover:opacity-100"
                />
              </div>
              <span className="text-center text-[11px]">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
