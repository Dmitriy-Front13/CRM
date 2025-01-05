import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./services/auth";


export async function middleware(req: NextRequest) {
  const authToken = req.cookies.get("authToken");

  if (!authToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const user = await getUser(authToken.value);
    if (user) {
      return NextResponse.next();
    }
  } catch (error) {
    console.error("Ошибка при проверке токена:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }

}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico|$).*)"],
};