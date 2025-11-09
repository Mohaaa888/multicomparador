export const siteConfig = {
  name: "Ahorro Fijo",
  shortName: "TPA",
  phone: "+34936940656",
  whatsapp: "https://wa.me/34936940656",
  legal: {
    aviso: "#",
    privacidad: "#",
    contacto: "#",
  },
} as const;
export type SiteConfig = typeof siteConfig;