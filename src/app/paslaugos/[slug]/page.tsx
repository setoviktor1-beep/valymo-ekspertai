import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CheckCircle2, Phone, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getSiteContent } from "@/lib/content";

// Puslapiai renderinami dinamiškai – turinys gaunamas iš Supabase kiekvieną kartą
export const dynamic = "force-dynamic";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const content = await getSiteContent();
  const service = content.services.find((s) => s.slug === params.slug);
  if (!service) return {};
  return {
    title: `${service.title} | ${content.company.name}`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: Props) {
  const content = await getSiteContent();
  const service = content.services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  return (
    <main className="bg-white text-slate-900">
      {/* Header */}
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center p-4">
        <header className="flex w-full max-w-7xl items-center justify-between rounded-full border border-white/40 bg-white/70 px-6 py-3 shadow-soft backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-brand-600 transition">
            <ArrowLeft size={16} /> Grįžti į pradžią
          </Link>
          <a
            href={`tel:${content.company.phone}`}
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600"
          >
            <Phone size={16} />
            <span className="hidden sm:inline">{content.company.displayPhone}</span>
            <span className="sm:hidden">Skambinti</span>
          </a>
        </header>
      </div>

      {/* Hero */}
      <section className="bg-warm-50 pt-32 pb-16 lg:pt-48 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-brand-600">Paslauga</p>
              <h1 className="mt-4 text-5xl font-black tracking-tight text-slate-900 md:text-6xl">{service.title}</h1>
              <p className="mt-6 text-xl leading-relaxed text-slate-600">{service.description}</p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href={`tel:${content.company.phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-brand-600"
                >
                  <Phone size={20} /> Užsakyti dabar
                </a>
                <Link
                  href="/#kainos"
                  className="inline-flex items-center justify-center rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 text-lg font-bold text-slate-900 transition hover:border-brand-200 hover:bg-brand-50"
                >
                  Peržiūrėti kainas
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl">
              <Image
                src={service.image || "/images/hero-clean.png"}
                alt={service.title}
                width={700}
                height={500}
                className="h-full w-full object-cover"
                priority
              />
              <div className="absolute top-6 right-6 flex items-center gap-2 rounded-2xl bg-white p-4 shadow-xl">
                <ShieldCheck className="text-brand-500" size={28} />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Kokybė</p>
                  <p className="text-sm font-black text-slate-900">Garantuota</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description + Features */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Apie šią paslaugą</h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate-600">
                {service.fullDescription.split("\n").filter(Boolean).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900">Kas įskaičiuota</h2>
              <ul className="mt-6 space-y-4">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 flex-shrink-0 text-brand-500" size={22} />
                    <span className="text-lg text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-500 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-black text-white">{content.contact.title}</h2>
          <p className="mt-6 text-xl text-brand-50">{content.contact.description}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href={`tel:${content.company.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-5 text-xl font-black text-brand-600 shadow-xl transition hover:-translate-y-1"
            >
              <Phone size={24} /> {content.contact.callLabel}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 text-center text-sm font-medium text-slate-500">
        <p>© {new Date().getFullYear()} {content.company.name}. Visos teisės saugomos.</p>
      </footer>
    </main>
  );
}
