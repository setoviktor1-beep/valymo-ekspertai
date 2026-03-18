import { cookies } from "next/headers";

const SESSION_COOKIE = "ve_admin_session";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "change-me-now";
}

export function isAdminAuthenticated() {
  return cookies().get(SESSION_COOKIE)?.value === getAdminPassword();
}

export function createAdminSession() {
  cookies().set(SESSION_COOKIE, getAdminPassword(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export function destroyAdminSession() {
  cookies().delete(SESSION_COOKIE);
}
