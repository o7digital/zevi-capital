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

  const path = request.nextUrl.pathname
  const isPublicPropertyRoute = path === "/listing_details_01" || path === "/propiedades" || path.startsWith("/propiedades/")
  if (!indexableRoutes.has(path) && !isPublicPropertyRoute) {
    response.headers.set("X-Robots-Tag", "noindex, follow")
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.png|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|webp|svg|gif|ico)$).*)"],
}
