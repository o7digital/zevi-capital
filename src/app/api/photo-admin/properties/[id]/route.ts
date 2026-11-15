import { NextResponse } from "next/server";
import { directusError, directusJson } from "../../_directus";

const fields = [
   "*",
   "cover_image.*",
   "photos.*",
   "photos.image.*",
   "property_images.*",
   "property_images.image.*",
].join(",");

export async function GET(_: Request, { params }: { params: { id: string } }) {
   try {
      const query = new URLSearchParams({ fields });
      query.set("deep[photos][_sort]", "sort_order");
      query.set("deep[property_images][_sort]", "sort_order");

      const payload = await directusJson(`/items/properties/${params.id}?${query.toString()}`);
      return NextResponse.json(payload);
   } catch (error) {
      return directusError(error);
   }
}
