import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import { AdvisoryAbout } from "@/components/advisory/AdvisoryContent";

export default function AboutUsOne() {
  return <><HeaderOne style={true} /><main><AdvisoryAbout /></main><FooterOne style={false} /></>;
}
