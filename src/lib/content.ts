import { promises as fs } from "node:fs";
import path from "node:path";
import { getSupabaseClient, isSupabaseConfigured } from "./supabase";

export type Service = {
  title: string;
  description: string;
  slug: string;
  fullDescription: string;
  features: string[];
  image?: string;
};

export type PriceItem = {
  name: string;
  price: string;
  details: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type SiteContent = {
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  company: {
    name: string;
    phone: string;
    displayPhone: string;
    city: string;
    address: string;
    serviceArea: string;
    email: string;
    facebook: string;
  };
  hero: {
    badge: string;
    title: string;
    highlight: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    image?: string;
  };
  benefits: string[];
  services: Service[];
  prices: PriceItem[];
  about: {
    title: string;
    description: string;
    image?: string;
  };
  faq: FaqItem[];
  contact: {
    title: string;
    description: string;
    callLabel: string;
    hours: string;
  };
  updatedAt: string;
};

const contentPath = path.join(process.cwd(), "src/content/site-content.json");

export async function getSiteContent(): Promise<SiteContent> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient()!;
    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("id", 1)
      .single();

    if (error) throw new Error(`Supabase klaida skaitant turinį: ${error.message}`);
    return data.content as SiteContent;
  }

  // Fallback: lokalus JSON failas (tik kūrimo aplinkoje)
  const raw = await fs.readFile(contentPath, "utf8");
  return JSON.parse(raw) as SiteContent;
}

export async function updateSiteContent(content: SiteContent): Promise<SiteContent> {
  const nextContent = {
    ...content,
    updatedAt: new Date().toISOString()
  };

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient()!;
    const { error } = await supabase
      .from("site_content")
      .upsert({ id: 1, content: nextContent, updated_at: new Date().toISOString() });

    if (error) throw new Error(`Supabase klaida išsaugant turinį: ${error.message}`);
    return nextContent;
  }

  // Fallback: lokalus JSON failas (tik kūrimo aplinkoje)
  await fs.writeFile(contentPath, `${JSON.stringify(nextContent, null, 2)}\n`, "utf8");
  return nextContent;
}
