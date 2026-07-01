import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import InsuranceArea from "./InsuranceArea"
import FooterOne from "@/layouts/footers/FooterOne"
import FancyBanner from "@/components/common/FancyBanner"

const Insurance = () => {
   return (
      <>
         <HeaderOne style={true} />
         <BreadcrumbOne title="Certeza y Due Diligence" sub_title="Manejo de riesgo y certeza" style={false} />
         <InsuranceArea />
         <FancyBanner style={false} />
         <FooterOne style={false} />
      </>
   )
}

export default Insurance
