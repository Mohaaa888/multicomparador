"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  trigger: ReactNode;
};

export function PrivacyPolicyModal({ trigger }: Props) {
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
          aria-labelledby="privacy-title"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative z-10 max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-neutral-400">AHORROFIJO</p>
                <h2 id="privacy-title" className="text-2xl font-semibold text-gray-900 dark:text-neutral-50">
                  Política de privacidad
                </h2>
                <p className="text-sm text-gray-500 dark:text-neutral-400">Vigente para ahorrofijo.com</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                Cerrar
              </Button>
            </div>
            <div className="mt-6 space-y-5 text-sm leading-relaxed text-gray-700 dark:text-neutral-300">
              <section>
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100">1. Responsable del tratamiento</h3>
                <p>En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la LOPDGDD, informamos que:</p>
                <ul className="mt-2 list-disc pl-5">
                  <li>Responsable: AHORROFIJO</li>
                  <li>Dominio: https://ahorrofijo.com</li>
                  <li>Email: INFO@AHORROFIJO.COM</li>
                  <li>Teléfono: —</li>
                  <li>Dirección: CALLE DE L&apos;ESTADI, 26, MATARÓ, BARCELONA</li>
                </ul>
              </section>
              <section>
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100">2. Datos que recopilamos</h3>
                <p>Recopilamos:</p>
                <ul className="mt-2 list-disc pl-5">
                  <li>Datos identificativos: nombre, apellidos, teléfono, email.</li>
                  <li>Datos de contacto para solicitudes de información.</li>
                  <li>Datos necesarios para la contratación de servicios (cuando aplicable).</li>
                  <li>Datos de navegación mediante cookies.</li>
                </ul>
                <p className="mt-2">No solicitamos datos especialmente protegidos.</p>
              </section>
              <section>
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100">3. Finalidad del tratamiento</h3>
                <p>Los datos se utilizarán para:</p>
                <ul className="mt-2 list-disc pl-5">
                  <li>Gestionar solicitudes enviadas a través del formulario.</li>
                  <li>Prestar servicios de asesoría comercial.</li>
                  <li>Enviar información sobre ofertas y promociones (si el usuario lo autoriza).</li>
                  <li>Mejorar la experiencia de navegación en la web.</li>
                  <li>Cumplir obligaciones legales.</li>
                </ul>
              </section>
              <section>
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100">4. Legitimación</h3>
                <p>Las bases legales del tratamiento son:</p>
                <ul className="mt-2 list-disc pl-5">
                  <li>Consentimiento del usuario.</li>
                  <li>Ejecución de un contrato o precontrato.</li>
                  <li>Interés legítimo para fines comerciales y de seguridad.</li>
                  <li>Cumplimiento de obligaciones legales.</li>
                </ul>
              </section>
              <section>
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100">5. Conservación de los datos</h3>
                <p>Los datos se conservarán:</p>
                <ul className="mt-2 list-disc pl-5">
                  <li>Mientras exista relación comercial.</li>
                  <li>Hasta que el usuario solicite su supresión.</li>
                  <li>El mínimo exigido por ley en casos contables o contractuales.</li>
                </ul>
              </section>
              <section>
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100">6. Derechos del usuario</h3>
                <p>El usuario puede ejercer los derechos de acceso, rectificación, supresión, oposición, portabilidad y limitación del tratamiento.</p>
                <p className="mt-2">Para ello puede solicitarlo a <strong>INFO@AHORROFIJO.COM</strong>.</p>
                <p className="mt-2">También puede reclamar ante la Agencia Española de Protección de Datos (AEPD).</p>
              </section>
              <section>
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100">7. Destinatarios</h3>
                <p>No cedemos datos a terceros excepto:</p>
                <ul className="mt-2 list-disc pl-5">
                  <li>Proveedores indispensables para la prestación del servicio.</li>
                  <li>Empresas con las que se gestione la contratación del usuario (telefonía, energía, seguridad, etc.).</li>
                  <li>Obligaciones legales.</li>
                </ul>
              </section>
              <section>
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100">8. Seguridad</h3>
                <p>AHORROFIJO aplica medidas técnicas y organizativas adecuadas para garantizar la seguridad y confidencialidad de los datos.</p>
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
