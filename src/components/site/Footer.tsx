"use client";

import { siteConfig } from "@/config/site";
import { PrivacyPolicyModal } from "@/components/site/PrivacyPolicyModal";
import { LegalNoticeModal } from "@/components/site/LegalNoticeModal";
import { ContractConditionsModal } from "@/components/site/ContractConditionsModal";
import { ContactModal } from "@/components/site/ContactModal";

export  function Footer() {
  return (
    <footer className="mt-12 pt-6 pb-6 border-t text-sm text-gray-600 dark:text-neutral-400">
      <div className="max-w-5xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-2">
        <div>© {new Date().getFullYear()} {siteConfig.name}</div>
        <div className="space-x-4 flex flex-col items-center md:flex-row md:items-center">
          <div className="space-x-4">
            <LegalNoticeModal trigger={<span>Aviso legal</span>} />
            <PrivacyPolicyModal trigger={<span>Privacidad</span>} />
            <ContractConditionsModal trigger={<span>Condiciones de contratación</span>} />
            <ContactModal trigger={<span>Contacto</span>} />
          </div>
          <div className="mt-2 md:mt-0 md:ml-4 text-xs">
            Atención al cliente:{" "}
            <a className="hover:underline" href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
