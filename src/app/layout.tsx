import type { Metadata, Viewport } from "next";
import "../styles/index.scss";
import ClientProviders from "./ClientProviders";
import StructuredData from "@/components/seo/StructuredData";

const siteUrl = "https://zevi-capital-git-main-olivier-steineur.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ZeVi Capital | Bienes raices en Mexico",
    template: "%s | ZeVi Capital",
  },
  description:
    "ZeVi Capital asesora compra, venta, renta e inversion inmobiliaria en las principales ciudades de Mexico.",
  keywords: [
    "ZeVi Capital",
    "bienes raices Mexico",
    "inmobiliaria Mexico",
    "propiedades en Mexico",
    "inversion inmobiliaria",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ZeVi Capital | Bienes raices en Mexico",
    description:
      "Asesoria inmobiliaria estrategica para compra, venta, renta e inversion en Mexico.",
    url: "/",
    siteName: "ZeVi Capital",
    type: "website",
    locale: "es_MX",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ZeVi Capital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeVi Capital | Bienes raices en Mexico",
    description:
      "Compra, venta, renta e inversion inmobiliaria en las mejores zonas de Mexico.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D1A1C",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body suppressHydrationWarning>
        <StructuredData />
        <div className="main-page-wrapper">
          <ClientProviders>{children}</ClientProviders>
        </div>
      </body>
    </html>
  );
}
