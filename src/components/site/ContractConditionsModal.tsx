"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  trigger: ReactNode;
};

export function ContractConditionsModal({ trigger }: Props) {
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
          aria-labelledby="contract-title"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative z-10 max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-neutral-400">AHORROFIJO</p>
                <h2 id="contract-title" className="text-2xl font-semibold text-gray-900 dark:text-neutral-50">
                  Condiciones de contratación
                </h2>
                <p className="text-sm text-gray-500 dark:text-neutral-400">Aplicables a ahorrofijo.com</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                Cerrar
              </Button>
            </div>
            <div className="mt-6 space-y-5 text-sm leading-relaxed text-gray-700 dark:text-neutral-300">
              <section>
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100">1. Objeto</h3>
                <p>
                  Estas condiciones regulan la contratación de servicios gestionados a través de AHORROFIJO, tales como tarifas de telecomunicaciones, servicios de energía, seguridad y alarmas u otros
                  servicios ofrecidos en la plataforma. AHORROFIJO actúa como intermediario y asesor comercial, no como proveedor final del servicio.
                </p>
              </section>
              <section>
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100">2. Proceso de contratación</h3>
                <ol className="mt-2 list-decimal pl-5 space-y-1">
                  <li>El usuario solicita información a través del formulario, teléfono o WhatsApp.</li>
                  <li>AHORROFIJO ofrece opciones comerciales de operadores o proveedores asociados.</li>
                  <li>El usuario puede aceptar la oferta y proceder al alta con el proveedor final.</li>
                  <li>El contrato final se formaliza directamente entre el usuario y el proveedor oficial.</li>
                </ol>
              </section>
              <section>
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100">3. Precio y condiciones de pago</h3>
                <p>
                  Los servicios de intermediación ofrecidos por AHORROFIJO al usuario son gratuitos, a menos que se indique lo contrario. El coste del servicio contratado depende exclusivamente del
                  proveedor final.
                </p>
              </section>
              <section>
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100">4. Responsabilidad</h3>
                <p>AHORROFIJO no será responsable de:</p>
                <ul className="mt-2 list-disc pl-5">
                  <li>Problemas derivados del proveedor final del servicio.</li>
                  <li>Incidencias técnicas ajenas a AHORROFIJO.</li>
                  <li>Interpretaciones erróneas de tarifas o condiciones por parte del usuario.</li>
                </ul>
                <p className="mt-2">Nos comprometemos a ofrecer información clara, actualizada y verificada.</p>
              </section>
              <section>
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100">5. Derecho de desistimiento</h3>
                <p>El usuario podrá ejercer su derecho de desistimiento, según la normativa aplicable, directamente ante el proveedor final del servicio contratado.</p>
              </section>
              <section>
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100">6. Modificaciones</h3>
                <p>AHORROFIJO se reserva el derecho de modificar estas condiciones cuando sea necesario.</p>
              </section>
              <section>
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100">7. Ley aplicable</h3>
                <p>
                  Estas condiciones se rigen por la legislación española. Cualquier conflicto será resuelto en los juzgados de la localidad donde AHORROFIJO tenga su sede.
                </p>
              </section>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setOpen(false)}>Entendido</Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
