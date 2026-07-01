import "../styles/index.scss";
import type { Metadata, Viewport } from "next";
import StructuredData from "@/components/seo/StructuredData";
import Script from "next/script";
import AppProviders from "./providers";
import OliviaAI from "@/components/common/OliviaAI";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zevicapital.com"),
  title: {
    default: "ZeVi Capital | Consultoría Inmobiliaria Estratégica",
    template: "%s",
  },
  applicationName: "ZeVi Capital",
  authors: [{ name: "ZeVi Capital", url: "https://www.zevicapital.com" }],
  creator: "ZeVi Capital",
  publisher: "ZeVi Capital",
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D1A1C",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const isDev = process.env.NODE_ENV === 'development'

  return (
    <html lang="es-MX" suppressHydrationWarning={isDev}>
      <head>
        <StructuredData />
        {/* For IE  */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&display=swap" />
      </head>
      <body suppressHydrationWarning={true}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0177X6KQPN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0177X6KQPN');
          `}
        </Script>
        <div className="main-page-wrapper">
          <AppProviders>
              {children}
              <OliviaAI />
          </AppProviders>
        </div>
      </body>
    </html>
  )
}
