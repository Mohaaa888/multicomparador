export  function HowItWorks() {
  return (
    <section id="como-funciona" className="mb-10">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="text-lg font-semibold">Cómo funciona</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-gray-200 dark:border-neutral-800 rounded-lg p-4 bg-white dark:bg-neutral-900">
          <div className="text-xs uppercase tracking-wide text-gray-500">Paso 1</div>
          <div className="font-semibold">Elige servicio</div>
          <p className="text-sm text-gray-600 dark:text-neutral-400">Luz, Internet, Gas o Alarmas. Indica tu prioridad.</p>
        </div>
        <div className="border border-gray-200 dark:border-neutral-800 rounded-lg p-4 bg-white dark:bg-neutral-900">
          <div className="text-xs uppercase tracking-wide text-gray-500">Paso 2</div>
          <div className="font-semibold">Completa tus datos</div>
          <p className="text-sm text-gray-600 dark:text-neutral-400">Con CP/dirección, consumo o cobertura filtramos lo que aplica.</p>
        </div>
        <div className="border border-gray-200 dark:border-neutral-800 rounded-lg p-4 bg-white dark:bg-neutral-900">
          <div className="text-xs uppercase tracking-wide text-gray-500">Paso 3</div>
          <div className="font-semibold">Mejor opción para ti</div>
          <p className="text-sm text-gray-600 dark:text-neutral-400">Si te encaja, gestionamos el alta/cambio por ti.</p>
        </div>
      </div>
    </section>
  );
}