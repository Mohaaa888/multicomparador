"use client";


import { Button } from "@/components/ui/button";

type Props = {
  onNuevo: () => void;
  onVerResumen: () => void;
};

export default function Step3Enviado({ onNuevo, onVerResumen }: Props) {
  return (
    <section className="text-center py-16">
      <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <span className="text-3xl">✓</span>
      </div>
      <h2 className="mt-4 text-2xl font-bold">¡Pedido enviado!</h2>
      <p className="text-gray-700 dark:text-neutral-300 mt-2 max-w-md mx-auto">
        Hemos recibido tu solicitud correctamente. Un asesor te contactará en breve con las mejores ofertas según tu perfil y ubicación.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Button variant="outline" onClick={onVerResumen}>
          Ver resumen
        </Button>
        <Button onClick={onNuevo}>Hacer otra comparación</Button>
      </div>
    </section>
  );
}