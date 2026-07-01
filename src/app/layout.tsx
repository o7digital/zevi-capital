'use client'
import "../styles/index.scss";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { TranslationProvider } from "@/contexts/TranslationContext";
import StructuredData from "@/components/seo/StructuredData";
import Script from "next/script";

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
        {/* For Resposive Device */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* For Window Tab Color */}
        {/* Chrome, Firefox OS and Opera */}
        <meta name="theme-color" content="#0D1A1C" />
        {/* Windows Phone */}
        <meta name="msapplication-navbutton-color" content="#0D1A1C" />
        {/* iOS Safari */}
        <meta name="apple-mobile-web-app-status-bar-style" content="#0D1A1C" />
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
          <Provider store={store}>
            <TranslationProvider>
              {children}
            </TranslationProvider>
          </Provider>
        </div>
      </body>
    </html>
  )
}
