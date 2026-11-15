import type { Division } from "@/data/advisory";

export default function ServiceStructuredData({ division }: { division: Division }) {
  const url = `https://www.zevicapital.com${division.href}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", "@id": `${url}#service`, name: division.title, description: division.es.summary, url, provider: { "@id": "https://www.zevicapital.com/#organization" } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.zevicapital.com/" },
        { "@type": "ListItem", position: 2, name: "Servicios", item: "https://www.zevicapital.com/services" },
        { "@type": "ListItem", position: 3, name: division.title, item: url },
      ] },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
