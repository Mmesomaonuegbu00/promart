export const protectedRoutes = [
  "/checkout",
  "/dashboard",
  "/profile",
  "/settings",
   "/cart",

];

export function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some((route) =>
    pathname === route || pathname.startsWith(`${route}/`)
  );
}
