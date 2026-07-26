import FooterOne from "@/layouts/footers/FooterOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import Banner from "./Banner"
import Feedback from "./Feedback"
import BLockFeatureOne from "./BLockFeatureOne"
import Property from "./Property"
import FancyBannerOne from "./FancyBannerOne"
import AgentArea from "./AgentArea"
import BLockFeatureFour from "./BLockFeatureFour"
import BLockFeatureFive from "./BLockFeatureFive"
import FancyBannerThree from "./FancyBannerThree"
import FancyBanner from "@/components/common/FancyBanner"

const HomeOne = () => {
  return (
    <>
      <HeaderOne style={false} />
      <Banner />
      <BLockFeatureOne />
      <Property />
      <FancyBannerOne style={false} />
      {/* <AgentArea style={false} /> */}
      <BLockFeatureFour />
      <Feedback />
      {/* <BLockFeatureFive style={false} /> */}
      <FancyBanner style={false} />
      {/* <FancyBannerThree /> */}
      <FooterOne style={false} />
    </>
  )
}

export default HomeOne
