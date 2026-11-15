import { NextResponse } from "next/server";
import { directusError, directusJson } from "../../../_directus";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
   try {
      const { fileId } = await request.json().catch(() => ({}));
      if (!fileId) {
         return NextResponse.json({ error: "fileId is required" }, { status: 400 });
      }

      const payload = await directusJson(`/items/properties/${params.id}`, {
         method: "PATCH",
         body: JSON.stringify({ cover_image: fileId }),
      });

      return NextResponse.json(payload);
   } catch (error) {
      return directusError(error);
   }
}
