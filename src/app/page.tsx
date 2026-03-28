import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone, ShieldCheck, Sparkles, Clock, MapPin, Star } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { getSiteContent } from "@/lib/content";

function buildLocalBusinessSchema(content: Awaited<ReturnType<typeof getSiteContent>>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://valymoekspertai.lt";

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: content.company.name,
    image: `${siteUrl}/og-image.jpg`,
    url: siteUrl,
    telephone: content.company.displayPhone,
    address: {
      "@type": "PostalAddress",
      addressLocality: content.company.city,
      streetAddress: content.company.address,
      addressCountry: "LT"
    },
    areaServed: content.company.serviceArea,
    priceRange: "$$",
    description: content.seo.description
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://valymoekspertai.lt";

  return {
    title: {
      absolute: content.seo.title
    },
    description: content.seo.description,
    keywords: content.seo.keywords,
    alternates: {
      canonical: siteUrl
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: siteUrl,
      siteName: content.company.name,
      locale: "lt_LT",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description
    }
  };
}

export default async function HomePage() {
  const content = await getSiteContent();
  const localBusinessSchema = buildLocalBusinessSchema(content);

  return (
    <main className="bg-white text-slate-900 selection:bg-brand-100 selection:text-brand-900">
      <JsonLd data={localBusinessSchema} />

      {/* Modern Floating Header */}
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center p-4">
        <header className="flex w-full max-w-7xl items-center justify-between rounded-full border border-white/40 bg-white/70 px-6 py-3 shadow-soft backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white shadow-glow">
              <Sparkles size={18} />
            </div>
            <p className="text-lg font-bold tracking-tight text-slate-900">{content.company.name}</p>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#paslaugos" className="text-sm font-medium text-slate-600 hover:text-brand-600">Paslaugos</a>
            <a href="#apie" className="text-sm font-medium text-slate-600 hover:text-brand-600">Apie</a>
            <a href="#kainos" className="text-sm font-medium text-slate-600 hover:text-brand-600">Kainos</a>
          </div>
          <a
            href={`tel:${content.company.phone}`}
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600 hover:shadow-glow"
          >
            <Phone size={16} />
            <span className="hidden sm:inline">{content.company.displayPhone}</span>
            <span className="sm:hidden">Skambinti</span>
          </a>
        </header>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-warm-50 pt-32 pb-16 lg:pt-48 lg:pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-20 blur-3xl">
            <div className="h-[600px] w-[600px] rounded-full bg-brand-400" />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-2xl animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-bold text-brand-700">
                <Sparkles size={14} className="animate-pulse" />
                {content.hero.badge}
              </div>
              <h1 className="mt-8 text-5xl font-black tracking-tight text-slate-900 md:text-7xl">
                {content.hero.title.replace(
                  content.hero.highlight,
                  `__${content.hero.highlight}__`
                ).split("__").map((chunk, index) =>
                  index % 2 === 1 ? (
                    <span key={`${chunk}-${index}`} className="relative inline-block">
                      <span className="relative z-10 text-brand-600">{chunk}</span>
                      <span className="absolute bottom-1 left-0 h-4 w-full bg-brand-200/50 -rotate-1" />
                    </span>
                  ) : (
                    chunk
                  )
                )}
              </h1>
              <p className="mt-8 text-xl leading-relaxed text-slate-600">
                {content.hero.description}
              </p>
              <div className="mt-12 flex flex-col gap-5 sm:flex-row">
                <a
                  href={`tel:${content.company.phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-500 px-8 py-5 text-lg font-bold text-white shadow-glow transition hover:-translate-y-1 hover:bg-brand-600"
                >
                  {content.hero.primaryCta}
                  <ArrowRight size={20} />
                </a>
                <a
                  href="#paslaugos"
                  className="inline-flex items-center justify-center rounded-2xl border-2 border-slate-200 bg-white px-8 py-5 text-lg font-bold text-slate-900 transition hover:border-brand-200 hover:bg-brand-50"
                >
                  {content.hero.secondaryCta}
                </a>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-8">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-0.5 text-brand-500">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-sm font-bold text-slate-900">5/5 žvaigždučių</p>
                </div>
                <div className="h-10 w-px bg-slate-200" />
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-black text-slate-900">300+</p>
                  <p className="text-sm font-medium text-slate-500">Patenkintų klientų</p>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="animate-float">
                <div className="absolute -inset-4 z-0 rounded-[3rem] bg-brand-100 rotate-2 opacity-50" />
                <div className="absolute -inset-2 z-0 rounded-[3rem] border-2 border-brand-200 -rotate-1" />
                
                <div className="relative z-10 overflow-hidden rounded-[2.5rem] bg-white shadow-2xl transition hover:shadow-brand-500/10">
                  <div className="animate-ken-burns">
                    <Image
                      src={content.hero.image || "/images/hero-clean.png"}
                      alt="Valymo priemonės namų švarai"
                      width={600}
                      height={800}
                      className="h-full w-full object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <div className="rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-white">
                          <CheckCircle2 size={24} />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-slate-900">Mėgaukitės laisve</p>
                          <p className="text-sm text-slate-600">Mes pasirūpinsime švara už jus.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Badge */}
                <div className="absolute -right-8 top-12 z-20 hidden rotate-12 items-center gap-2 rounded-2xl bg-white p-4 shadow-xl xl:flex">
                  <ShieldCheck className="text-brand-500" size={32} />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Kokybė</p>
                    <p className="text-sm font-black text-slate-900">Garantuota</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex items-center gap-4 rounded-3xl bg-warm-50 p-6 transition hover:bg-brand-50">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-sm">
                <Clock size={24} />
              </div>
              <div>
                <p className="font-bold text-slate-900">Darbo laikas</p>
                <p className="text-sm text-slate-600">{content.contact.hours}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-3xl bg-warm-50 p-6 transition hover:bg-brand-50">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-sm">
                <MapPin size={24} />
              </div>
              <div>
                <p className="font-bold text-slate-900">Mūsų zona</p>
                <p className="text-sm text-slate-600">{content.company.serviceArea}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-3xl bg-brand-500 p-6 text-white shadow-glow">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm">
                <Phone size={24} />
              </div>
              <div>
                <p className="font-bold">Greitas užsakymas</p>
                <p className="text-sm text-white/90">{content.company.displayPhone}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="paslaugos" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-brand-600">Paslaugos</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Geriausi sprendimai jūsų namams ir verslui</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Mūsų komanda užtikrina nepriekaištingą švarą, nesvarbu, ar tai vienkartinis buto valymas, ar nuolatinė biuro priežiūra.
            </p>
          </div>
          
          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {content.services.map((service, index) => (
              <article
                key={service.title}
                className="group relative rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-soft transition hover:-translate-y-2 hover:border-brand-100 hover:shadow-glow"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-warm-50 text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="mt-8 text-2xl font-bold text-slate-900">{service.title}</h3>
                <p className="mt-4 text-slate-600 leading-relaxed">{service.description}</p>
                <Link href={`/paslaugos/${service.slug}`} className="mt-8 flex items-center gap-2 font-bold text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
                  Sužinoti daugiau <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="apie" className="bg-warm-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/3] overflow-hidden rounded-[3rem] bg-slate-200 shadow-2xl">
                <Image
                  src={content.about.image || "/images/hero-clean.png"}
                  alt="Apie mūsų komandą"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition hover:scale-105 duration-700"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 rounded-3xl bg-white p-8 shadow-2xl">
                <p className="text-4xl font-black text-brand-600">100%</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Patenkintų klientų</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-brand-600">Apie mus</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">{content.about.title}</h2>
              <div className="mt-8 space-y-6 text-lg leading-relaxed text-slate-600">
                {content.about.description.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <ul className="mt-10 space-y-4">
                {content.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 font-bold text-slate-900">
                    <CheckCircle2 className="text-brand-500" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="kainos" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-brand-600">Kainos</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Skaidrūs ir aiškūs įkainiai</h2>
            </div>
            <p className="max-w-md text-lg text-slate-600">
              Tiksli kaina pateikiama įvertinus patalpų plotą, būklę ir specifinius jūsų pageidavimus.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {content.prices.map((price) => (
              <article key={price.name} className="relative rounded-[2.5rem] bg-white p-10 shadow-soft ring-1 ring-slate-100 transition hover:shadow-xl">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-brand-600">{price.name}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-5xl font-black tracking-tight text-slate-900">{price.price}</span>
                </div>
                <p className="mt-6 leading-relaxed text-slate-600">{price.details}</p>
                <div className="mt-8 border-t border-slate-50 pt-8">
                  <a href={`mailto:${content.company.email}`} className="inline-flex w-full justify-center rounded-2xl bg-warm-50 py-3 font-bold text-slate-900 transition hover:bg-brand-500 hover:text-white">
                    Rezervuoti laiką
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-warm-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-brand-600">DUK</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900">Dažniausiai užduodami klausimai</h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {content.faq.map((item) => (
              <article key={item.question} className="rounded-3xl border border-white bg-white/50 p-8 backdrop-blur-sm transition hover:bg-white">
                <h3 className="text-xl font-bold text-slate-900">{item.question}</h3>
                <p className="mt-4 leading-relaxed text-slate-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="kontaktai" className="relative isolate overflow-hidden bg-brand-500 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="relative z-10">
              <h2 className="text-4xl font-black tracking-tight text-white sm:text-6xl">{content.contact.title}</h2>
              <p className="mt-8 text-xl leading-relaxed text-brand-50">
                {content.contact.description}
              </p>
              <div className="mt-10 flex flex-col gap-6 sm:flex-row">
                <a
                  href={`tel:${content.company.phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-5 text-xl font-black text-brand-600 shadow-xl transition hover:-translate-y-1 hover:bg-brand-50"
                >
                  <Phone size={24} />
                  {content.contact.callLabel}
                </a>
                <a
                  href={content.company.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1877F2] px-8 py-5 text-xl font-black text-white shadow-xl transition hover:-translate-y-1 hover:bg-[#0e65d9]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.884v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
              </div>
            </div>
            <div className="relative z-10 lg:pl-16">
              <div className="rounded-[3rem] bg-white/10 p-10 backdrop-blur-md ring-1 ring-white/20">
                <div className="space-y-8">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-100">Adresas</p>
                    <p className="mt-2 text-2xl font-bold text-white">{content.company.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-100">Darbo laikas</p>
                    <p className="mt-2 text-2xl font-bold text-white">{content.contact.hours}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-100">Telefonas</p>
                    <p className="mt-2 text-2xl font-bold text-white underline underline-offset-8 decoration-brand-200">{content.company.displayPhone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-100">El. paštas</p>
                    <a href={`mailto:${content.company.email}`} className="mt-2 block text-xl font-bold text-white underline underline-offset-8 decoration-brand-200 break-all">{content.company.email}</a>
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-100">Socialiniai tinklai</p>
                    <a
                      href={content.company.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-4 py-2 text-base font-bold text-white transition hover:bg-[#0e65d9]"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.884v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                      </svg>
                      Valymo Ekspertai
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Background blobs */}
        <div className="absolute top-0 right-0 -z-10 -translate-y-1/2 translate-x-1/2 opacity-30 blur-3xl">
          <div className="h-[500px] w-[500px] rounded-full bg-brand-400" />
        </div>
        <div className="absolute bottom-0 left-0 -z-10 translate-y-1/2 -translate-x-1/2 opacity-30 blur-3xl">
          <div className="h-[500px] w-[500px] rounded-full bg-brand-600" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 text-center text-sm font-medium text-slate-500">
        <p>© {new Date().getFullYear()} {content.company.name}. Visos teisės saugomos.</p>
        <div className="mt-4 flex justify-center items-center gap-6">
          <a
            href={content.company.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#1877F2] hover:text-[#0e65d9] font-semibold transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.884v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
            </svg>
            Facebook
          </a>
          <a href="/admin" className="hover:text-brand-600 hover:underline">Administravimas</a>
        </div>
      </footer>
    </main>
  );
}
