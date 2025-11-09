
"use client";
import Image from "next/image";

type Props = {
  onSelectCategoria?: (categoria: "luz" | "internet" | "gas" | "alarmas") => void;
};

export function Header({ onSelectCategoria }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/70 dark:bg-neutral-900/60 border-gray-200 dark:border-neutral-800 backdrop-blur">
      <div className="max-w-6xl mx-auto h-14 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/icon-192.png"
            alt="Tu Ahorro Fijo"
            width={32}
            height={32}
            priority
            className="h-8 w-8 object-contain rounded"
          />
          <span className="font-semibold">Tu Ahorro Fijo</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700 dark:text-neutral-300">
          <button
            type="button"
            onClick={() => onSelectCategoria?.("luz")}
            className="hover:text-gray-900 dark:hover:text-neutral-100"
          >
            Luz
          </button>
          <button
            type="button"
            onClick={() => onSelectCategoria?.("internet")}
            className="hover:text-gray-900 dark:hover:text-neutral-100"
          >
            Internet
          </button>
          <button
            type="button"
            onClick={() => onSelectCategoria?.("gas")}
            className="hover:text-gray-900 dark:hover:text-neutral-100"
          >
            Gas
          </button>
          <button
            type="button"
            onClick={() => onSelectCategoria?.("alarmas")}
            className="hover:text-gray-900 dark:hover:text-neutral-100"
          >
            Alarmas
          </button>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#comparador"
            className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm bg-gray-900 text-white hover:bg-black"
          >
            Comparar
          </a>
        </div>
      </div>
    </header>
  );
}