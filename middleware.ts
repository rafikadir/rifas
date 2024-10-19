import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { userRoles } from "./src/interfaces/users";

// Paths protegidos para cada tipo de usuario
const userProtectedPaths = ["/pagar", "/perfil", "/compras"];
const vendedorProtectedPaths = ["/admin"];
const adminProtectedPaths = ["/admin/usuarios", "/admin/ajustes"];

// Middleware principal de autenticación y autorización
export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const isLoggedIn = !!token;
  
  const userIsAdmin = token?.role === userRoles.ADMIN;
  const userIsVendedor = token?.role === userRoles.VENDEDOR;

  const pathIsProtected = userProtectedPaths.some((path) => pathname.startsWith(path));
  const pathIsAdminProtected = adminProtectedPaths.some((path) => pathname.startsWith(path));
  const pathIsVendedorProtected = vendedorProtectedPaths.some((path) => pathname.startsWith(path));

  if (!pathIsProtected && !pathIsAdminProtected && !pathIsVendedorProtected) {
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/api/auth/signin", origin));
  }

  if (pathIsAdminProtected && !userIsAdmin) {
    return NextResponse.redirect(new URL("/", origin));
  }

  if (pathIsVendedorProtected && !(userIsVendedor || userIsAdmin)) {
    return NextResponse.redirect(new URL("/", origin));
  }

  // Si la ruta está protegida y el usuario está autenticado, continuar
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/pagar",
    "/perfil",
    "/compras/:path*",
    "/admin/:path*",
    "/api/auth/:path*",
  ],
};
