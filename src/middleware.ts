import { NextRequest, NextResponse } from "next/server"

const indexableRoutes = new Set([
  "/",
  "/about_us_01",
  "/services",
  "/insurance",
  "/insights",
  "/contact",
  "/faq",
  "/privacy-policy",
])

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  if (!indexableRoutes.has(request.nextUrl.pathname)) {
    response.headers.set("X-Robots-Tag", "noindex, follow")
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.png|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|webp|svg|gif|ico)$).*)"],
}
