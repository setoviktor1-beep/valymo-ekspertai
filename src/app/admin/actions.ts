"use server";

import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/auth";
import { updateSiteContent, type SiteContent } from "@/lib/content";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

export async function saveContent(content: SiteContent) {
  if (!isAdminAuthenticated()) {
    throw new Error("Unauthorized");
  }

  await updateSiteContent(content);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function uploadFile(formData: FormData) {
  if (!isAdminAuthenticated()) {
    throw new Error("Unauthorized");
  }

  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient()!;
    const { error } = await supabase.storage
      .from("uploads")
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (error) throw new Error(`Nuotraukos įkėlimo klaida: ${error.message}`);

    const { data } = supabase.storage.from("uploads").getPublicUrl(filename);
    return data.publicUrl;
  }

  // Fallback: lokalus failų sistema (tik kūrimo aplinkoje)
  const uploadDir = path.join(process.cwd(), "public/uploads");
  await mkdir(uploadDir, { recursive: true });
  const filePath = path.join(uploadDir, filename);
  await writeFile(filePath, buffer);

  return `/uploads/${filename}`;
}
