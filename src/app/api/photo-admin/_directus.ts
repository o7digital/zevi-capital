import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL?.replace(/\/$/, "");
export const COOKIE_NAME = "zevi_directus_access";

export function unauthorized() {
   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function directusToken() {
   return cookies().get(COOKIE_NAME)?.value;
}

export async function directusRequest(path: string, options: RequestInit = {}) {
   if (!DIRECTUS_URL) {
      return NextResponse.json({ error: "Directus URL is not configured" }, { status: 500 });
   }

   const token = directusToken();
   if (!token) return unauthorized();

   const headers = new Headers(options.headers);
   headers.set("Authorization", `Bearer ${token}`);
   if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
   }

   const response = await fetch(`${DIRECTUS_URL}${path}`, {
      ...options,
      headers,
      cache: "no-store",
   });

   const text = await response.text();
   return new NextResponse(text, {
      status: response.status,
      headers: {
         "Content-Type": response.headers.get("Content-Type") || "application/json",
      },
   });
}

export async function directusJson<T = any>(path: string, options: RequestInit = {}) {
   if (!DIRECTUS_URL) throw new Error("Directus URL is not configured");

   const token = directusToken();
   if (!token) {
      const error = new Error("Unauthorized");
      (error as Error & { status?: number }).status = 401;
      throw error;
   }

   const headers = new Headers(options.headers);
   headers.set("Authorization", `Bearer ${token}`);
   if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
   }

   const response = await fetch(`${DIRECTUS_URL}${path}`, {
      ...options,
      headers,
      cache: "no-store",
   });
   const payload = await response.json().catch(() => null);

   if (!response.ok) {
      const message = payload?.errors?.[0]?.message || response.statusText;
      const error = new Error(message);
      (error as Error & { status?: number }).status = response.status;
      throw error;
   }

   return payload as T;
}

export function directusError(error: unknown) {
   const status = typeof error === "object" && error && "status" in error ? Number((error as { status?: number }).status) : 500;
   const message = error instanceof Error ? error.message : "Unexpected Directus error";
   return NextResponse.json({ error: message }, { status: Number.isFinite(status) ? status : 500 });
}
