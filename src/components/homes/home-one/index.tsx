import FooterOne from "@/layouts/footers/FooterOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import Banner from "./Banner"
import Feedback from "./Feedback"
import BLockFeatureOne from "./BLockFeatureOne"
import Property from "./Property"
import BLockFeatureFive from "./BLockFeatureFive"
import FancyBannerThree from "./FancyBannerThree"
import FancyBanner from "@/components/common/FancyBanner"
import { fetchDirectusProperties } from "@/lib/directusProperties"

const HomeOne = async () => {
  const initialProperties = await fetchDirectusProperties();

  return (
    <>
      <HeaderOne style={false} />
      <Banner />
      <BLockFeatureOne />
      <Property initialProperties={initialProperties} />
      {/* <AgentArea style={false} /> */}
      <Feedback />
      {/* <BLockFeatureFive style={false} /> */}
      <FancyBanner style={false} />
      {/* <FancyBannerThree /> */}
      <FooterOne style={false} />
    </>
  )
}

export default HomeOne
