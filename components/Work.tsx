import { getCaseStudies } from "@/lib/kv";
import WorkGrid from "@/components/WorkGrid";

export default async function Work() {
  const caseStudies = await getCaseStudies();
  const work = caseStudies.filter((entry) => entry.category === "work");

  return (
    <section id="work" className="px-6 py-24 md:px-16 lg:px-24">
      <WorkGrid title="Selected Work" caseStudies={work} />
    </section>
  );
}
