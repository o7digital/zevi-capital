import FooterOne from "@/layouts/footers/FooterOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import Banner from "./Banner"
import Feedback from "./Feedback"
import BLockFeatureOne from "./BLockFeatureOne"
import BLockFeatureTwo from "./BLockFeatureTwo"
import BLockFeatureThree from "./BLockFeatureThree"
import Property from "./Property"
import BLockFeatureFive from "./BLockFeatureFive"
import FancyBannerThree from "./FancyBannerThree"
import FancyBanner from "@/components/common/FancyBanner"

const HomeOne = () => {
  return (
    <>
      <HeaderOne style={false} />
      <Banner />
      <BLockFeatureOne />
      <BLockFeatureTwo />
      <BLockFeatureThree />
      <Property />
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
