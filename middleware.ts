import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {

  if(req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL (`/dashboard`, req.url))
  }

  return NextResponse.next();
}

