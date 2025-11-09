// src/components/comparador/types.ts

export type Categoria = "luz" | "internet" | "gas" | "alarmas";

export type FormCommon = {
  nombre: string;
  telefono: string;
  email: string;
  provincia: string;
  cp: string;
  aceptar: boolean;
};

export type FormLuz = {
  potencia: string;
  consumoAnual: string;
  tarifaActual: "" | "pvpc" | "fija" | "indexada";
  discriminacion: "si" | "no";
};

export type FormInternet = {
  direccion: string;
  tecnologia: "fibra";
  velocidad: "300" | "600" | "1000";
  lineasMoviles: "1" | "2" | "3" | "4" | ">5";
  permanencia: "0" | "<3" | "<6" | "otros";
  operadorActual: string;
};

export type FormGas = {
  consumoAnual: string;
  tarifaActual: "" | "rl1" | "rl2" | "rl3";
  uso: "cocina" | "acs" | "calefaccion";
  caldera: "si" | "no";
};

export type FormAlarmas = {
  tipoVivienda: "piso" | "chalet" | "local";
  metros: string;
  mascotas: "si" | "no";
  prioridad: "precio" | "instalacion" | "monitorizacion";
  empresaActual: string;
};

// NUEVO: modo de entrada de datos
export type PreferenciaEntrada = "manual" | "factura";

export type FormData = {
  categoria: Categoria | null;
  entrada: PreferenciaEntrada; // nuevo
  common: FormCommon;
  luz: FormLuz;
  internet: FormInternet;
  gas: FormGas;
  alarmas: FormAlarmas;
  facturaFile?: File | null; // solo en cliente
};

// Para el server, el File no existe como tal, así que lo tipamos aparte
export type LeadPayload = Omit<FormData, "facturaFile">;