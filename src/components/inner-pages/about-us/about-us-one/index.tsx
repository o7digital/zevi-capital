"use client"
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import BLockFeatureOne from "./BLockFeatureOne"
import VideoBanner from "@/components/homes/home-seven/VideoBanner"
import StrategicContentSection from "./StrategicContentSection"
import BLockFeatureFive from "@/components/homes/home-one/BLockFeatureFive"
import Feedback from "@/components/homes/home-five/Feedback"
import AgentArea from "@/components/homes/home-one/AgentArea"
import Brand from "./Brand"
import FooterOne from "@/layouts/footers/FooterOne"
import FancyBanner from "@/components/common/FancyBanner"
import { useTranslation } from "@/contexts/TranslationContext"

const AboutUsOne = () => {
   const { t } = useTranslation();
   
   return (
      <>
         <HeaderOne style={true} />
         <BreadcrumbOne title={t('aboutUs.breadcrumbTitle')} sub_title={t('aboutUs.subtitle')} style={false} />
         <BLockFeatureOne />
         <VideoBanner />
         <StrategicContentSection />
         <BLockFeatureFive style={true} />
         <Feedback style={true} />
         <AgentArea style={false} />
         <Brand />
         <FancyBanner style={false} />
         <FooterOne style={false} />
      </>
   )
}

export default AboutUsOne
