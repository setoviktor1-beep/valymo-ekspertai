"use client";

import { useState, useRef } from "react";
import { 
  Save, LayoutDashboard, Search, Megaphone, CheckSquare, 
  Briefcase, CircleDollarSign, HelpCircle, Building2, 
  Plus, Trash2, CheckCircle2, AlertCircle, Loader2, Image as ImageIcon, Upload, X
} from "lucide-react";
import Image from "next/image";
import type { SiteContent } from "@/lib/content";
import { saveContent, uploadFile } from "./actions";

type Tab = {
  id: string;
  label: string;
  icon: React.ElementType;
};

const TABS: Tab[] = [
  { id: "hero", label: "Pagrindinis (Hero)", icon: LayoutDashboard },
  { id: "services", label: "Paslaugos", icon: Briefcase },
  { id: "prices", label: "Kainos", icon: CircleDollarSign },
  { id: "about", label: "Apie mus", icon: CheckSquare },
  { id: "faq", label: "DUK", icon: HelpCircle },
  { id: "company", label: "Įmonė ir Kontaktai", icon: Building2 },
  { id: "seo", label: "SEO Nustatymai", icon: Search },
];

export function AdminDashboard({ initialContent, logoutAction }: { initialContent: SiteContent, logoutAction: () => void }) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  const handleSave = async () => {
    setStatus("saving");
    try {
      await saveContent(content);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (e) {
      console.error(e);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const updateField = (path: string[], value: any) => {
    setContent((prev) => {
      const next = JSON.parse(JSON.stringify(prev)); // Deep clone
      let current: any = next;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return next;
    });
  };

  // Modern Image Picker Component
  const ImagePicker = ({ label, path }: { label: string, path: string[] }) => {
    const value = path.reduce((obj: any, key) => obj[key], content) || "";
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const url = await uploadFile(formData);
        updateField(path, url);
      } catch (err) {
        console.error("Upload failed", err);
        alert("Nepavyko įkelti nuotraukos.");
      } finally {
        setIsUploading(false);
      }
    };

    return (
      <div className="mb-6">
        <span className="text-sm font-semibold text-slate-700 block mb-2">{label}</span>
        <div className="flex items-start gap-4">
          <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-brand-300">
            {value ? (
              <>
                <Image src={value} alt="Preview" fill className="object-cover" />
                <button 
                  onClick={() => updateField(path, "")}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full text-red-500 shadow-sm hover:bg-white transition"
                >
                  <X size={14} />
                </button>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-slate-400">
                {isUploading ? <Loader2 size={24} className="animate-spin text-brand-500" /> : <ImageIcon size={24} />}
                <p className="mt-2 text-[10px] font-bold uppercase tracking-wider">Nėra nuotraukos</p>
              </div>
            )}
          </div>
          <div className="flex-1">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleUpload} 
            />
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Rekomenduojama naudoti aukštos kokybės .jpg arba .png nuotraukas. Maksimalus dydis 5MB.
            </p>
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
            >
              <Upload size={16} /> {isUploading ? "Įkeliama..." : "Pasirinkti nuotrauką"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const Input = ({ label, path, multiline = false }: { label: string, path: string[], multiline?: boolean }) => {
    const value = path.reduce((obj: any, key) => obj[key], content);
    return (
      <label className="grid gap-2 mb-4">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => updateField(path, e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-200"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => updateField(path, e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-200"
          />
        )}
      </label>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "hero":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Pagrindinis (Hero) sekcija</h2>
            <ImagePicker label="Hero nuotrauka (Dešinėje pusėje)" path={["hero", "image"]} />
            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Badge (Mažas tekstas viršuje)" path={["hero", "badge"]} />
              <Input label="Išryškintas žodis (Pabraukimui)" path={["hero", "highlight"]} />
            </div>
            <Input label="Antraštė" path={["hero", "title"]} />
            <Input label="Aprašymas" path={["hero", "description"]} multiline />
            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Pagrindinio mygtuko tekstas (CTA 1)" path={["hero", "primaryCta"]} />
              <Input label="Antrinio mygtuko tekstas (CTA 2)" path={["hero", "secondaryCta"]} />
            </div>
          </div>
        );
      case "services":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Paslaugos</h2>
              <button 
                onClick={() => updateField(["services"], [...content.services, { title: "", description: "", slug: "", fullDescription: "", features: [], image: "" }])}
                className="flex items-center gap-2 rounded-xl bg-brand-100 text-brand-700 px-4 py-2 text-sm font-bold transition hover:bg-brand-200"
              >
                <Plus size={16} /> Pridėti paslaugą
              </button>
            </div>
            {content.services.map((service, idx) => (
              <div key={idx} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-4">
                <button 
                  onClick={() => updateField(["services"], content.services.filter((_, i) => i !== idx))}
                  className="absolute right-4 top-4 text-slate-400 hover:text-red-500 transition"
                >
                  <Trash2 size={20} />
                </button>
                <div className="pr-8">
                  <Input label={`Paslaugos pavadinimas`} path={["services", idx.toString(), "title"]} />
                  <Input label="Paslaugos aprašymas" path={["services", idx.toString(), "description"]} multiline />
                  <Input label="Pilnas aprašymas (paslaugos puslapyje)" path={["services", idx.toString(), "fullDescription"]} multiline />
                  <Input label="URL (slug)" path={["services", idx.toString(), "slug"]} />
                  <ImagePicker label="Paslaugos nuotrauka" path={["services", idx.toString(), "image"]} />

                  {/* Features list */}
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-slate-700">Kas įskaičiuota (sąrašas)</span>
                      <button
                        onClick={() => {
                          const newServices = JSON.parse(JSON.stringify(content.services));
                          newServices[idx].features = [...(newServices[idx].features || []), ""];
                          updateField(["services"], newServices);
                        }}
                        className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 transition hover:bg-slate-200"
                      >
                        <Plus size={12} /> Pridėti
                      </button>
                    </div>
                    {(content.services[idx].features || []).map((feature: string, fIdx: number) => (
                      <div key={fIdx} className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => {
                            const newServices = JSON.parse(JSON.stringify(content.services));
                            newServices[idx].features[fIdx] = e.target.value;
                            updateField(["services"], newServices);
                          }}
                          className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:bg-white"
                        />
                        <button
                          onClick={() => {
                            const newServices = JSON.parse(JSON.stringify(content.services));
                            newServices[idx].features = newServices[idx].features.filter((_: string, i: number) => i !== fIdx);
                            updateField(["services"], newServices);
                          }}
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case "prices":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Kainos</h2>
              <button 
                onClick={() => updateField(["prices"], [...content.prices, { name: "", price: "", details: "" }])}
                className="flex items-center gap-2 rounded-xl bg-brand-100 text-brand-700 px-4 py-2 text-sm font-bold transition hover:bg-brand-200"
              >
                <Plus size={16} /> Pridėti kainą
              </button>
            </div>
            {content.prices.map((price, idx) => (
              <div key={idx} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-4">
                <button 
                  onClick={() => updateField(["prices"], content.prices.filter((_, i) => i !== idx))}
                  className="absolute right-4 top-4 text-slate-400 hover:text-red-500 transition"
                >
                  <Trash2 size={20} />
                </button>
                <div className="grid md:grid-cols-2 gap-4 pr-8">
                  <Input label="Paslaugos pavadinimas" path={["prices", idx.toString(), "name"]} />
                  <Input label="Kaina (pvz. Nuo 55 €)" path={["prices", idx.toString(), "price"]} />
                </div>
                <Input label="Papildoma informacija / Detalės" path={["prices", idx.toString(), "details"]} />
              </div>
            ))}
          </div>
        );
      case "faq":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">DUK</h2>
              <button 
                onClick={() => updateField(["faq"], [...content.faq, { question: "", answer: "" }])}
                className="flex items-center gap-2 rounded-xl bg-brand-100 text-brand-700 px-4 py-2 text-sm font-bold transition hover:bg-brand-200"
              >
                <Plus size={16} /> Pridėti klausimą
              </button>
            </div>
            {content.faq.map((faq, idx) => (
              <div key={idx} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-4">
                <button 
                  onClick={() => updateField(["faq"], content.faq.filter((_, i) => i !== idx))}
                  className="absolute right-4 top-4 text-slate-400 hover:text-red-500 transition"
                >
                  <Trash2 size={20} />
                </button>
                <div className="pr-8">
                  <Input label="Klausimas" path={["faq", idx.toString(), "question"]} />
                  <Input label="Atsakymas" path={["faq", idx.toString(), "answer"]} multiline />
                </div>
              </div>
            ))}
          </div>
        );
      case "about":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Apie mus sekcija</h2>
            <ImagePicker label="Sekcijos nuotrauka" path={["about", "image"]} />
            <Input label="Antraštė" path={["about", "title"]} />
            <Input label="Aprašymas" path={["about", "description"]} multiline />
            
            <div className="mt-8 border-t border-slate-200 pt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Privalumai (sąrašas)</h3>
                <button 
                  onClick={() => updateField(["benefits"], [...content.benefits, ""])}
                  className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
                >
                  <Plus size={14} /> Pridėti
                </button>
              </div>
              {content.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3 mb-3">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => {
                      const newBenefits = [...content.benefits];
                      newBenefits[idx] = e.target.value;
                      updateField(["benefits"], newBenefits);
                    }}
                    className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-200"
                  />
                  <button 
                    onClick={() => updateField(["benefits"], content.benefits.filter((_, i) => i !== idx))}
                    className="text-slate-400 hover:text-red-500 p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case "company":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Įmonės informacija ir Kontaktai</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Įmonės / Puslapio pavadinimas" path={["company", "name"]} />
              <Input label="Miestas" path={["company", "city"]} />
              <Input label="Adresas" path={["company", "address"]} />
              <Input label="Aptarnavimo zona" path={["company", "serviceArea"]} />
              <Input label="Telefono numeris rodymui" path={["company", "displayPhone"]} />
              <Input label="Telefonas nuorodai" path={["company", "phone"]} />
              <Input label="El. paštas" path={["company", "email"]} />
              <Input label="Facebook puslapio nuoroda" path={["company", "facebook"]} />
            </div>

            <div className="mt-8 border-t border-slate-200 pt-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Kontaktų sekcija apačioje</h3>
              <Input label="Antraštė" path={["contact", "title"]} />
              <Input label="Aprašymas" path={["contact", "description"]} multiline />
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Darbo laikas" path={["contact", "hours"]} />
                <Input label="Skambučio mygtuko tekstas" path={["contact", "callLabel"]} />
              </div>
            </div>
          </div>
        );
      case "seo":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">SEO Nustatymai</h2>
            <Input label="Puslapio Pavadinimas (Title)" path={["seo", "title"]} />
            <Input label="Aprašymas (Meta description)" path={["seo", "description"]} multiline />
            
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Raktažodžiai</h3>
                <button 
                  onClick={() => updateField(["seo", "keywords"], [...content.seo.keywords, ""])}
                  className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
                >
                  <Plus size={14} /> Pridėti
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {content.seo.keywords.map((kw, idx) => (
                  <div key={idx} className="flex items-center gap-2 rounded-full bg-slate-100 pl-4 pr-1 py-1">
                    <input
                      type="text"
                      value={kw}
                      onChange={(e) => {
                        const newKws = [...content.seo.keywords];
                        newKws[idx] = e.target.value;
                        updateField(["seo", "keywords"], newKws);
                      }}
                      className="bg-transparent border-none text-sm outline-none w-32 focus:ring-0 p-0"
                    />
                    <button 
                      onClick={() => updateField(["seo", "keywords"], content.seo.keywords.filter((_, i) => i !== idx))}
                      className="text-slate-400 hover:text-red-500 p-1 rounded-full hover:bg-slate-200"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900 font-sans">
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-2 text-brand-600">
            <Megaphone size={24} />
            <span className="text-xl font-black tracking-tight">TVS Panelė</span>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all ${
                activeTab === tab.id 
                  ? "bg-brand-50 text-brand-700" 
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? "text-brand-500" : "text-slate-400"} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button onClick={() => logoutAction()} className="w-full text-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition py-2">
            Atsijungti
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl font-bold text-slate-800">
            {TABS.find(t => t.id === activeTab)?.label}
          </h1>
          
          <div className="flex items-center gap-4">
            {status === "success" && (
              <span className="flex items-center gap-2 text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">
                <CheckCircle2 size={16} /> Išsaugota
              </span>
            )}
            {status === "error" && (
              <span className="flex items-center gap-2 text-sm font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg">
                <AlertCircle size={16} /> Klaida
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={status === "saving"}
              className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-6 py-2.5 rounded-xl font-bold transition shadow-sm disabled:opacity-70"
            >
              {status === "saving" ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {status === "saving" ? "Saugoma..." : "Išsaugoti pakeitimus"}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
