import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import { DivisionContent } from "@/components/advisory/AdvisoryContent";
import ServiceStructuredData from "@/components/seo/ServiceStructuredData";
import { divisions } from "@/data/advisory";

export default function Insurance() {
  const division = divisions.find(item => item.slug === "legal-transaction-advisory")!;
  return <><HeaderOne style={true} /><main><ServiceStructuredData division={division} /><DivisionContent division={division} /></main><FooterOne style={false} /></>;
}
