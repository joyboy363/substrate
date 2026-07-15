import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, isValidSession } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";

export default function AdminLoginPage({
  params,
}: {
  params: { secret: string };
}) {
  if (params.secret !== process.env.ADMIN_SECRET_SLUG) {
    notFound();
  }

  const session = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  if (isValidSession(session)) {
    redirect(`/admin/${params.secret}/dashboard`);
  }

  return <LoginForm secret={params.secret} />;
}
