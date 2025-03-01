import { cookies } from "next/headers";
import { jwtVerify, importSPKI } from "jose";

export async function verifyAccessToken() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access-token")?.value;
    if (!accessToken) {
      return null;
    }
    const alg = "RS256";
    const spki = process.env.ACCESS_TOKEN_PUBLIC_KEY ?? "";
    const publicKey = await importSPKI(spki, alg);
    const { payload } = await jwtVerify(accessToken, publicKey, {
      algorithms: [alg],
    });
    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function refreshToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh-token")?.value;
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refresh-token=${refreshToken}`,
      },
      credentials: "include",
    });
    const data = await res.json();
    cookieStore.set("access-token", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60,
      path: "/",
    });

    cookieStore.set("refresh-token", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return;
  } catch (error) {
    console.error(error);
  }
}
