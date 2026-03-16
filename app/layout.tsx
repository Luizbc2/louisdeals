import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: `Achadinhos da Shopee ${"\u{1F6CD}\uFE0F"}`,
  description:
    "Vitrine de afiliados mobile-first para encontrar rapido os produtos dos videos."
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
