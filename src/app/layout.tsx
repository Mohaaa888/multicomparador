import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Ahorro Fijo – Comparador de luz, internet, gas y alarmas",
  description:
    "Ahorro Fijo compara por ti las mejores tarifas de luz, internet, gas y alarmas. Sube tu factura o rellena el formulario y te contactamos sin compromiso.",
  metadataBase: new URL("https://ahorrofijo.com"), // cambia esto al dominio real
  openGraph: {
    title: "Ahorro Fijo",
    description:
      "Compara y ahorra en tus facturas de luz, internet, gas y alarmas con Ahorro Fijo.",
    url: "https://ahorrofijo.com",
    siteName: "Ahorro Fijo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahorro Fijo",
    description:
      "Compara y ahorra en tus facturas de luz, internet, gas y alarmas.",
  },
  alternates: {
    canonical: "https://ahorrofijo.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}