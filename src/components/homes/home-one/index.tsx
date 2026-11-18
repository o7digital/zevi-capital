import FooterOne from "@/layouts/footers/FooterOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import Banner from "./Banner"
import Feedback from "./Feedback"
import BLockFeatureOne from "./BLockFeatureOne"
import Property from "./Property"
import FancyBanner from "@/components/common/FancyBanner"
import { fetchDirectusProperties } from "@/lib/directusProperties"

const HomeOne = async ({ sector }: { sector?: string }) => {
  const initialProperties = await fetchDirectusProperties().catch(() => []);

  return (
    <>
      <HeaderOne style={false} />
      <main className="advisory-home">
        <Banner />
        <BLockFeatureOne />
        <Property initialProperties={initialProperties} sector={sector} />
        <Feedback />
        <FancyBanner style={false} />
      </main>
      <FooterOne style={true} />
    </>
  )
}

export default HomeOne
