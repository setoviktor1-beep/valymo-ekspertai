import { redirect } from "next/navigation";
import { createAdminSession, destroyAdminSession, getAdminPassword, isAdminAuthenticated } from "@/lib/auth";
import { getSiteContent } from "@/lib/content";
import { AdminDashboard } from "./AdminDashboard";

export const metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false
  }
};

async function loginAction(formData: FormData) {
  "use server";

  const password = String(formData.get("password") ?? "");
  if (password !== getAdminPassword()) {
    redirect("/admin?error=bad-password");
  }

  createAdminSession();
  redirect("/admin");
}

async function logoutAction() {
  "use server";

  destroyAdminSession();
  redirect("/admin");
}

export default async function AdminPage({
  searchParams
}: {
  searchParams?: { error?: string };
}) {
  const authenticated = isAdminAuthenticated();

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
        <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-orange-500">Admin</p>
          <h1 className="mt-4 text-3xl font-black text-slate-900">Prisijungimas</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Prisijunkite prie naujos TVS panelės.
          </p>
          {searchParams?.error === "bad-password" ? (
            <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              Neteisingas slaptažodis.
            </p>
          ) : null}
          <form action={loginAction} className="mt-6 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">Slaptažodis</span>
              <input
                type="password"
                name="password"
                className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              />
            </label>
            <button className="rounded-2xl bg-brand-500 px-5 py-3 font-bold text-white transition hover:bg-brand-600">
              Prisijungti
            </button>
          </form>
        </div>
      </main>
    );
  }

  const content = await getSiteContent();

  return <AdminDashboard initialContent={content} logoutAction={logoutAction} />;
}
