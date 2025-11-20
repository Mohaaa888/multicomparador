"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="relative mb-10 overflow-hidden rounded-2xl bg-[#1d4ed8] text-white">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,.4) 0, transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,255,255,.25) 0, transparent 35%), radial-gradient(circle at 60% 80%, rgba(255,255,255,.25) 0, transparent 35%)",
        }}
      />
      <div className="relative p-6 md:p-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 md:flex-row">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              {siteConfig.name}, el comparador todo en uno de <span className="underline decoration-white/60">luz, internet, gas y alarmas</span>
            </h1>
            <p className="mt-3 md:mt-4 text-white/90 text-base md:text-lg">
              Encuentra en minutos la mejor oferta real para tu vivienda o negocio con {siteConfig.name}. Sin letra pequeña.
            </p>
            <ul role="list" className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
              <li className="flex items-center gap-2"><span className="h-5 w-5 grid place-items-center rounded-full bg-white/20">✓</span><span>Ahorro medio 268 €/año</span></li>
              <li className="flex items-center gap-2"><span className="h-5 w-5 grid place-items-center rounded-full bg-white/20">✓</span><span>Instalación y altas gestionadas</span></li>
              <li className="flex items-center gap-2"><span className="h-5 w-5 grid place-items-center rounded-full bg-white/20">✓</span><span>Asesoramiento gratuito</span></li>
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="#comparador"><Button variant="secondary" className="text-gray-900">Comparar ahora</Button></Link>
              <Link href="#como-funciona">
                <Button variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">Cómo funciona</Button>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-auto flex-shrink-0">
            <div className="relative mx-auto h-40 w-40 md:h-56 md:w-56 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl">
              <Image
                src={siteConfig.logo}
                alt={`${siteConfig.name} logo`}
                width={200}
                height={200}
                className="h-28 w-28 md:h-40 md:w-40 object-contain drop-shadow-[0_8px_30px_rgba(15,23,42,0.25)]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
