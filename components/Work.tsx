import { getCaseStudies } from "@/lib/kv";
import WorkGrid from "@/components/WorkGrid";

export default async function Work() {
  const caseStudies = await getCaseStudies();

  return (
    <section id="work" className="px-6 py-24 md:px-16 lg:px-24">
      <WorkGrid caseStudies={caseStudies} />
    </section>
  );
}
