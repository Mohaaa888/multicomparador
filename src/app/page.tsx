"use client";

import { useRef, useCallback } from "react";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { AutoSlider } from "@/components/site/AutoSlider";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Comparador, type ComparadorHandle } from "@/components/comparador/Comparador";
import { Testimonials } from "@/components/site/Testimonials";
import { Footer } from "@/components/site/Footer";
import { PartnerLogos } from "@/components/site/PartnerLogos";
import { VisitUs } from "@/components/site/VisitUs";
import { CollaboratorForm } from "@/components/site/CollaboratorForm";

export default function Page() {
  const comparadorRef = useRef<ComparadorHandle | null>(null);

  const handleSelectFromHeader = useCallback(
    (categoria: "luz" | "internet" | "gas" | "alarmas") => {
      // scroll al comparador
      const el = document.getElementById("comparador");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // pedir al comparador que cambie de categoría
      if (comparadorRef.current) {
        comparadorRef.current.selectCategoria(categoria);
      }
    },
    []
  );

  return (
    <>
      <div id="top" />
      <Header onSelectCategoria={handleSelectFromHeader} />
      <main className="min-h-screen bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-neutral-50">
        <div className="max-w-5xl mx-auto px-4 md:px-6 pb-16">
          <Hero />
          <AutoSlider />
          <PartnerLogos />
          <HowItWorks />
          <div id="comparador" className="scroll-mt-24">
            <Comparador ref={comparadorRef} />
          </div>
          <VisitUs />
          <CollaboratorForm />
          <Testimonials />
        </div>
      </main>
      <Footer />
    </>
  );
}
