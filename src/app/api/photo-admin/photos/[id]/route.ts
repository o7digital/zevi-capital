import { NextResponse } from "next/server";
import { directusError, directusJson } from "../../_directus";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
   try {
      await directusJson(`/items/property_images/${params.id}`, { method: "DELETE" });
      return NextResponse.json({ ok: true });
   } catch (error) {
      return directusError(error);
   }
}
