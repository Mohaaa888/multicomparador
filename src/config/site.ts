export const siteConfig = {
  name: "Ahorro Fijo",
  shortName: "TPA",
  logo: "/icon-192.png?v=2",
  phone: "+34936940656",
  whatsapp: "https://wa.me/34936940656",
  legal: {
    aviso: "#",
    privacidad: "#",
    contacto: "#",
  },
} as const;
export type SiteConfig = typeof siteConfig;
