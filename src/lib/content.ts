import { promises as fs } from "node:fs";
import path from "node:path";

export type Service = {
  title: string;
  description: string;
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

function sanitizeLines(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parsePipeList<T>(
  value: FormDataEntryValue | null,
  mapLine: (parts: string[]) => T | null
) {
  return sanitizeLines(value)
    .map((line) => mapLine(line.split("|").map((part) => part.trim())))
    .filter((item): item is T => item !== null);
}

export async function getSiteContent(): Promise<SiteContent> {
  const raw = await fs.readFile(contentPath, "utf8");
  return JSON.parse(raw) as SiteContent;
}

export async function updateSiteContent(content: SiteContent): Promise<SiteContent> {
  const nextContent = {
    ...content,
    updatedAt: new Date().toISOString()
  };

  await fs.writeFile(contentPath, `${JSON.stringify(nextContent, null, 2)}\n`, "utf8");
  return nextContent;
}
