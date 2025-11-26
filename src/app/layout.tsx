'use client'
import "../styles/index.scss";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { TranslationProvider } from "@/contexts/TranslationContext";
import StructuredData from "@/components/seo/StructuredData";
import HiddenSeoKeywords from "@/components/seo/HiddenSeoKeywords";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const isDev = process.env.NODE_ENV === 'development'

  return (
    <html lang="en" suppressHydrationWarning={isDev}>
      <head>
        <meta name="keywords" content="Luxury Real Estate, Real Estate Investment, Los Angeles Properties, Montreal Real Estate, Paris Luxury Homes, Mexico Real Estate, O7 Realestates, Exclusive Listings, Off-Market Deals, Private Buyers, Luxury Broker International, Premium Properties, Waterfront Estates" />
        <meta name="description" content="O7 Realestates – International luxury real estate agency. High-end properties, investment opportunities, premium buyers network. Presence in Los Angeles, Montreal, Paris, Mexico. Luxury villas, penthouses, waterfront estates, investment deals." />
        <meta property="og:site_name" content="O7 Realestates" />
        <meta property="og:url" content="https://o7realestates.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="O7 Realestates | International Luxury Real Estate" />
        <meta property="og:description" content="Premium real estate agency with global presence: Los Angeles, Montreal, Paris, Mexico. Exclusive luxury properties, investment portfolios and private deals." />
        <title>O7 REALESTATES | Luxury Real Estate – Los Angeles • Montreal • Paris • Mexico</title>
        <meta name='og:image' content='images/assets/ogg.png' />
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
        <div className="main-page-wrapper">
          <Provider store={store}>
            <TranslationProvider>
              {children}
              <HiddenSeoKeywords />
            </TranslationProvider>
          </Provider>
        </div>
      </body>
    </html>
  )
}
