import { NextRequest, NextResponse } from "next/server"
import { divisions } from "@/data/advisory"

const indexableRoutes = new Set([
  "/",
  "/about_us_01",
  "/services",
  "/insurance",
  "/contact",
  "/faq",
  "/privacy-policy",
  ...divisions.map(division => division.href),
])

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const isProperty = request.nextUrl.pathname === "/listing_details_01" && /^\d+$/.test(request.nextUrl.searchParams.get("id") || "")
  if (!indexableRoutes.has(request.nextUrl.pathname) && !isProperty) {
    response.headers.set("X-Robots-Tag", "noindex, follow")
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.png|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|webp|svg|gif|ico)$).*)"],
}
