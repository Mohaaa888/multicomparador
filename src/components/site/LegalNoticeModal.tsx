"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  trigger: ReactNode;
};

export function LegalNoticeModal({ trigger }: Props) {
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
          aria-labelledby="legal-title"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative z-10 max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-neutral-400">AHORROFIJO</p>
                <h2 id="legal-title" className="text-2xl font-semibold text-gray-900 dark:text-neutral-50">
                  Aviso legal
                </h2>
                <p className="text-sm text-gray-500 dark:text-neutral-400">Información legal de ahorrofijo.com</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                Cerrar
              </Button>
            </div>
            <div className="mt-6 space-y-5 text-sm leading-relaxed text-gray-700 dark:text-neutral-300">
              <section>
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100">1. Identificación</h3>
                <p>En cumplimiento de la Ley 34/2002 (LSSI-CE) se facilita la siguiente información:</p>
                <ul className="mt-2 list-disc pl-5">
                  <li>Titular de la web: AHORROFIJO, SL</li>
                  <li>Nombre comercial: AHORROFIJO</li>
                  <li>Dominio: https://ahorrofijo.com</li>
                  <li>Correo: INFO@AHORROFIJO.COM</li>
                  <li>Dirección: CALLE DE L&apos;ESTADI, 26, MATARÓ, BARCELONA</li>
                  <li>Teléfono: —</li>
                </ul>
                <p className="mt-2">
                  El acceso y uso de este sitio web atribuye al visitante la condición de usuario, implicando la aceptación plena y sin reservas del presente Aviso Legal.
                </p>
              </section>
              <section>
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100">2. Objeto del sitio web</h3>
                <p>
                  AHORROFIJO.COM es una plataforma dedicada a la asesoría y comparación de servicios de telecomunicaciones, energía, seguridad y otros servicios relacionados. La información mostrada
                  es de carácter informativo y comercial, pudiendo estar sujeta a cambios sin previo aviso.
                </p>
              </section>
              <section>
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100">3. Condiciones de uso</h3>
                <p>El usuario se compromete a utilizar el sitio web, sus contenidos y servicios de conformidad con la ley, este Aviso Legal, las buenas costumbres y el orden público. Queda prohibido:</p>
                <ul className="mt-2 list-disc pl-5">
                  <li>Utilizar la web con fines ilícitos o fraudulentos.</li>
                  <li>Provocar daños en los sistemas de AHORROFIJO o de terceros.</li>
                  <li>Intentar acceder sin autorización a secciones privadas o sistemas del sitio web.</li>
                </ul>
                <p className="mt-2">AHORROFIJO no será responsable de los daños que pudieran producirse por el uso indebido del sitio web.</p>
              </section>
              <section>
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100">4. Propiedad intelectual e industrial</h3>
                <p>
                  Todos los contenidos del sitio web (textos, imágenes, logotipos, gráficos, vídeos, software, diseño, etc.) son propiedad de AHORROFIJO o de sus legítimos titulares. Queda prohibida
                  la reproducción, distribución, comunicación pública o transformación total o parcial sin autorización expresa y por escrito.
                </p>
              </section>
              <section>
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100">5. Enlaces externos</h3>
                <p>
                  Este sitio web puede incluir enlaces a sitios de terceros. AHORROFIJO no es responsable del contenido, disponibilidad ni políticas de privacidad de dichas páginas, y el usuario accede
                  a ellas bajo su propia responsabilidad.
                </p>
              </section>
              <section>
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100">6. Responsabilidad</h3>
                <p>AHORROFIJO no se responsabiliza de:</p>
                <ul className="mt-2 list-disc pl-5">
                  <li>Interrupciones del servicio o fallos provocados por factores externos.</li>
                  <li>Errores puntuales en la información de tarifas o servicios proporcionados por terceros proveedores.</li>
                  <li>Uso indebido del sitio web por parte de los usuarios.</li>
                </ul>
                <p className="mt-2">Nos reservamos el derecho de suspender temporalmente el acceso para mantenimiento o mejoras.</p>
              </section>
              <section>
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100">7. Protección de datos</h3>
                <p>El tratamiento de los datos personales se regula en nuestra Política de Privacidad, accesible en la sección correspondiente del sitio web.</p>
              </section>
              <section>
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100">8. Legislación y jurisdicción</h3>
                <p>
                  Este Aviso Legal se rige por la legislación española. Para la resolución de cualquier conflicto derivado del uso del sitio web, las partes se someterán a los juzgados y tribunales de
                  la provincia donde AHORROFIJO tenga su sede.
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
