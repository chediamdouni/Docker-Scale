import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/ClientSide/login",
    },
  }
);

export const config = {
  matcher: [
    "/profile/:path*",
    "/users/:path*",
    "/((?!|ClientSide/login|ClientSide/register|api|_next/static|_next/image|favicon.ico).*)",
  ],
};
