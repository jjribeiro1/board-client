import { NextRequest, NextResponse } from "next/server";
import { refreshToken, verifyAccessToken } from "./lib/auth";

const publicRoutes = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  const tokenPayload = await verifyAccessToken();
  if (!tokenPayload && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (tokenPayload && !isPublicRoute) {
    const tokenExpirationTime = tokenPayload.exp as number;
    const now = Math.floor(Date.now() / 1000);
    const timeUntilExpiration = tokenExpirationTime - now;
    const THREE_MINUTES = 180;

    if (timeUntilExpiration <= THREE_MINUTES && timeUntilExpiration > 0) {
      await refreshToken();
    }
    if (timeUntilExpiration <= 0) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
