import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import config from "./config";

const verifyAuthToRedirect = async (req: NextRequest) => {
  try {
    const cookies = req.cookies.getAll();
    const cookieHeader = cookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const response = await fetch(`${config.app.url}/users/me`, {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
      },
    });

    const result = await response.json();
    return !result.error ? result : null;
  } catch (error) {
    return null;
  }
};

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  let url = req.url;
  if (req.nextUrl.pathname.includes(".")) return NextResponse.next();

  const isPathAuth = url.includes("/auth");
  let account = await verifyAuthToRedirect(req);

  if (account && isPathAuth)
    return NextResponse.redirect(new URL("/", req.url));
  if (!account && !isPathAuth)
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));

  return NextResponse.next();
}
