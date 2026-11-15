import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Banner from "./Banner";
import BLockFeatureOne from "./BLockFeatureOne";
import Property from "./Property";
import { AdvisorySolutions, AdvisoryMethod } from "@/components/advisory/AdvisoryContent";
import { fetchDirectusProperties } from "@/lib/directusProperties";

export default async function HomeOne() {
  const initialProperties = await fetchDirectusProperties().catch(() => []);
  return (
    <>
      <HeaderOne style={false} />
      <main>
        <Banner />
        <BLockFeatureOne />
        <AdvisorySolutions />
        <AdvisoryMethod />
        <Property initialProperties={initialProperties} />
      </main>
      <FooterOne style={false} />
    </>
  );
}
