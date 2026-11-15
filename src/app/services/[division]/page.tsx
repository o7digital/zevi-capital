import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { divisions } from "@/data/advisory";
import { DivisionContent } from "@/components/advisory/AdvisoryContent";
import ServiceStructuredData from "@/components/seo/ServiceStructuredData";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import Wrapper from "@/layouts/Wrapper";

const serviceDivisions = divisions.filter(division => division.href.startsWith("/services/"));
export const dynamicParams = false;
export function generateStaticParams() {
  return serviceDivisions.map(division => ({ division: division.slug }));
}

export function generateMetadata({ params }: { params: { division: string } }): Metadata {
  const division = serviceDivisions.find(item => item.slug === params.division);
  if (!division) notFound();
  const url = `https://www.zevicapital.com${division.href}`;
  return {
    title: division.metaTitle,
    description: division.es.summary,
    alternates: { canonical: url },
    openGraph: { title: division.metaTitle, description: division.es.summary, url, siteName: "ZeVi Capital", type: "website", images: ["/images/hammer-group-fxIcYymZHJg-unsplash.webp"] },
    twitter: { card: "summary_large_image", title: division.metaTitle, description: division.es.summary, images: ["/images/hammer-group-fxIcYymZHJg-unsplash.webp"] },
  };
}

export default function DivisionPage({ params }: { params: { division: string } }) {
  const division = serviceDivisions.find(item => item.slug === params.division);
  if (!division) notFound();
  return <Wrapper><HeaderOne style={true} /><main><ServiceStructuredData division={division} /><DivisionContent division={division} /></main><FooterOne style={false} /></Wrapper>;
}
