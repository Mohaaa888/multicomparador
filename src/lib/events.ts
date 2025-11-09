// src/lib/events.ts
export type Categoria = "luz" | "internet" | "gas" | "alarmas";

type Listener = (categoria: Categoria) => void;
const listeners = new Set<Listener>();

export const events = {
  subscribe(fn: Listener) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  emit(categoria: Categoria) {
    listeners.forEach(fn => fn(categoria));
  },
};