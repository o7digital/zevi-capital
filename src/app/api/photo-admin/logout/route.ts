import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_NAME } from "../_directus";

export async function POST() {
   cookies().delete(COOKIE_NAME);
   return NextResponse.json({ ok: true });
}
