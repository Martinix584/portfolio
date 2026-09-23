import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, IBM_Plex_Mono } from "next/font/google";
import { LangProvider } from "@/lib/i18n";
import "./globals.css";

// Barlow: familia emparentada con DIN, la tipografía de la señalética industrial.
const display = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const body = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://martinporollan.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Martín Porollan · Automatización, Full Stack e IA",
  description:
    "Portfolio de Martín Porollan: convierto procesos manuales en sistemas que funcionan solos. Java, Python, .NET, Flutter, IA aplicada e IoT industrial.",
  openGraph: {
    title: "Martín Porollan · Portfolio",
    description: "Convierto procesos manuales en sistemas que funcionan solos.",
    images: ["/martin.jpg"],
    locale: "es_AR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#111213",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} ${plexMono.variable} antialiased`}>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
