import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "LouisDeals.",
  description:
    "Catalogo de achados com busca rapida por codigo, filtros por categoria e link direto para compra.",
  icons: {
    icon: "/icon.svg"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
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
