import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    const authHeader = req.headers.get("authorization");
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (!authHeader) {
      return new NextResponse("Acceso denegado", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Panel de Administración"',
        },
      });
    }

    const base64 = authHeader.replace("Basic ", "");
    const decoded = Buffer.from(base64, "base64").toString("utf-8");
    const [, password] = decoded.split(":");

    if (password !== adminPassword) {
      return new NextResponse("Credenciales incorrectas", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Panel de Administración"',
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
