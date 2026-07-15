import { createHash } from "crypto";

export const ADMIN_SESSION_COOKIE = "substrate_admin_session";

export function getSessionToken(): string {
  return createHash("sha256")
    .update(`${process.env.ADMIN_PASSWORD}:substrate-admin-session`)
    .digest("hex");
}

export function isValidSession(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;
  return cookieValue === getSessionToken();
}
