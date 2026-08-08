import { NextResponse } from "next/server";
import { directusError, directusJson } from "../_directus";

const fields = [
   "id",
   "title",
   "easybroker_id",
   "location",
   "address",
   "status",
   "cover_image.id",
   "cover_image.title",
   "photos.id",
   "photos.sort_order",
   "photos.image.id",
   "photos.image.title",
   "property_images.id",
   "property_images.sort_order",
   "property_images.image.id",
   "property_images.image.title",
].join(",");

export async function GET(request: Request) {
   try {
      const { searchParams } = new URL(request.url);
      const search = searchParams.get("search")?.trim();
      const params = new URLSearchParams({
         fields,
         limit: "40",
         sort: "-id",
      });
      params.set("deep[photos][_sort]", "sort_order");
      params.set("deep[property_images][_sort]", "sort_order");

      if (search) {
         params.set("filter[_or][0][title][_icontains]", search);
         params.set("filter[_or][1][easybroker_id][_icontains]", search);
         params.set("filter[_or][2][location][_icontains]", search);
      }

      const payload = await directusJson(`/items/properties?${params.toString()}`);
      return NextResponse.json(payload);
   } catch (error) {
      return directusError(error);
   }
}
