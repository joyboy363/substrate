import { getCaseStudies } from "@/lib/kv";
import WorkGrid from "@/components/WorkGrid";

export default async function Software() {
  const caseStudies = await getCaseStudies();
  const software = caseStudies.filter((entry) => entry.category === "software");

  return (
    <section id="software" className="px-6 py-24 md:px-16 lg:px-24">
      <WorkGrid title="Software Products" caseStudies={software} />
    </section>
  );
}
