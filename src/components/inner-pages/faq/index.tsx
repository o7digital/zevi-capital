"use client"

import BreadcrumbOne from '@/components/common/breadcrumb/BreadcrumbOne'
import FooterFour from '@/layouts/footers/FooterFour'
import HeaderOne from '@/layouts/headers/HeaderOne'
import FaqArea from './FaqArea'
import FancyBanner from '@/components/common/FancyBanner'
import { useTranslation } from '@/contexts/TranslationContext'

const Faq = () => {
   const { locale } = useTranslation()
   const copy = locale === 'fr'
      ? { title: 'Questions fréquentes', subtitle: 'Conseil immobilier stratégique' }
      : locale === 'en'
         ? { title: 'Frequently asked questions', subtitle: 'Strategic real estate advisory' }
         : { title: 'Preguntas frecuentes', subtitle: 'Consultoría inmobiliaria estratégica' }
   return (
      <>
         <HeaderOne style={true} />
         <BreadcrumbOne title={copy.title} link="/" link_title="ZeVi Capital" sub_title={copy.subtitle} style={true} image="/images/buddha-elemental-3d-b8Bi0p_o5Lk-unsplash.webp" imagePosition="center 45%" />
         <FaqArea/>
         <FancyBanner style={false} />
         <FooterFour />
      </>
   )
}

export default Faq
