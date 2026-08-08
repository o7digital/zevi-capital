import { NextResponse } from "next/server";
import { directusError, directusJson } from "../../../../_directus";

export async function PATCH(request: Request) {
   try {
      const { items } = await request.json().catch(() => ({ items: [] }));
      if (!Array.isArray(items)) {
         return NextResponse.json({ error: "Items must be an array" }, { status: 400 });
      }

      await Promise.all(
         items.map((item, index) =>
            directusJson(`/items/property_images/${item.id}`, {
               method: "PATCH",
               body: JSON.stringify({ sort_order: Number(item.sort_order || index + 1) }),
            })
         )
      );

      return NextResponse.json({ ok: true });
   } catch (error) {
      return directusError(error);
   }
}
