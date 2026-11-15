import { NextResponse } from "next/server";
import { DIRECTUS_URL, directusError, directusJson, directusToken } from "../../../_directus";

type PropertyImageItem = { sort_order?: number | null };

export async function POST(request: Request, { params }: { params: { id: string } }) {
   try {
      if (!DIRECTUS_URL) {
         return NextResponse.json({ error: "Directus URL is not configured" }, { status: 500 });
      }

      const token = directusToken();
      if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

      const form = await request.formData();
      const files = form.getAll("files").filter((file): file is File => file instanceof File);
      if (files.length === 0) {
         return NextResponse.json({ error: "No photos were uploaded" }, { status: 400 });
      }

      const existing = await directusJson<{ data: PropertyImageItem[] }>(
         `/items/property_images?fields=sort_order&filter[property_id][_eq]=${encodeURIComponent(params.id)}&limit=-1`
      );
      const currentMax = Math.max(0, ...existing.data.map((item) => Number(item.sort_order || 0)));
      const created = [];

      for (let index = 0; index < files.length; index += 1) {
         const file = files[index];
         const uploadForm = new FormData();
         uploadForm.append("title", `${params.id}-${Date.now()}-${index + 1}`);
         uploadForm.append("file", file, file.name);

         const uploadResponse = await fetch(`${DIRECTUS_URL}/files`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: uploadForm,
            cache: "no-store",
         });
         const uploadPayload = await uploadResponse.json().catch(() => null);
         if (!uploadResponse.ok) {
            return NextResponse.json({ error: uploadPayload?.errors?.[0]?.message || "Upload failed" }, { status: uploadResponse.status });
         }

         const item = await directusJson("/items/property_images", {
            method: "POST",
            body: JSON.stringify({
               property_id: params.id,
               image: uploadPayload.data.id,
               sort_order: currentMax + index + 1,
            }),
         });
         created.push(item.data);
      }

      return NextResponse.json({ data: created });
   } catch (error) {
      return directusError(error);
   }
}
