import { NextRequest, NextResponse } from "next/server";

export function middleware(
  request: NextRequest
) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyemail" ||
    path === "/verifyEmail" ||
    path === "/forgotpassword" ||
    path === "/resetpassword";

  const isExcludedPath =
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path === "/favicon.ico" ||
    path.startsWith("/fonts") ||
    path.startsWith("/images");

  if (isExcludedPath) {
    return NextResponse.next();
  }

  const token =
    request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(
      new URL("/profile", request.url)
    );
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}