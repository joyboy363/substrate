import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, isValidSession } from "@/lib/auth";
import { getCaseStudies } from "@/lib/kv";
import Dashboard from "@/components/admin/Dashboard";

export default async function AdminDashboardPage({
  params,
}: {
  params: { secret: string };
}) {
  if (params.secret !== process.env.ADMIN_SECRET_SLUG) {
    notFound();
  }

  const session = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  if (!isValidSession(session)) {
    redirect(`/admin/${params.secret}`);
  }

  const caseStudies = await getCaseStudies();

  return <Dashboard secret={params.secret} initialCaseStudies={caseStudies} />;
}
