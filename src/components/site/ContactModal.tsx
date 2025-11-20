"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

type Props = {
  trigger: ReactNode;
};

export function ContactModal({ trigger }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="hover:underline">
        {trigger}
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-sm rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 shadow-2xl">
            <div className="mb-4">
              <h2 id="contact-modal-title" className="text-lg font-semibold text-gray-900 dark:text-neutral-50">
                ¿Cómo quieres contactarnos?
              </h2>
              <p className="text-sm text-gray-600 dark:text-neutral-400">
                Elige la opción que prefieras para hablar con nuestro equipo.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button asChild className="w-full">
                <a href={`tel:${siteConfig.phone}`} onClick={() => setOpen(false)}>
                  Llamarnos
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                  WhatsApp
                </a>
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-4 block w-full text-center text-sm text-gray-500 hover:text-gray-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
