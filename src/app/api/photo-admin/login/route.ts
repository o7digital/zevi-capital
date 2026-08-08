import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_NAME, DIRECTUS_URL } from "../_directus";

export async function POST(request: Request) {
   if (!DIRECTUS_URL) {
      return NextResponse.json({ error: "Directus URL is not configured" }, { status: 500 });
   }

   const { email, password } = await request.json().catch(() => ({}));
   if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
   }

   const response = await fetch(`${DIRECTUS_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
   });
   const payload = await response.json().catch(() => null);

   if (!response.ok || !payload?.data?.access_token) {
      const message = payload?.errors?.[0]?.message || "Invalid Directus login";
      return NextResponse.json({ error: message }, { status: response.status || 401 });
   }

   cookies().set(COOKIE_NAME, payload.data.access_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: Math.max(60, Math.floor((payload.data.expires || 900000) / 1000)),
   });

   return NextResponse.json({ ok: true });
}
