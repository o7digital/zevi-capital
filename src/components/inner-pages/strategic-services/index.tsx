import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import { AdvisoryServices } from "@/components/advisory/AdvisoryContent";

export default function Services() {
  return <><HeaderOne style={true} /><main><AdvisoryServices /></main><FooterOne style={false} /></>;
}
