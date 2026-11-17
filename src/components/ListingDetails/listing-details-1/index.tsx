import HeaderOne from "@/layouts/headers/HeaderOne"
import ListingDetailsOneArea from "./ListingDetailsOneArea"
import FancyBanner from "@/components/common/FancyBanner"
import FooterFour from "@/layouts/footers/FooterFour"
import type { DirectusProperty } from "@/lib/directusProperties"
import type { ReactNode } from "react"

const ListingDetailsOne = ({ property, seoLinks }: { property: DirectusProperty; seoLinks: ReactNode }) => {
  return (
    <>
      <HeaderOne style={true} />
      <ListingDetailsOneArea property={property} seoLinks={seoLinks} />
      <FancyBanner />
      <FooterFour />
    </>
  )
}

export default ListingDetailsOne
