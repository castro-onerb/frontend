const PUBLIC_ROUTES = [
  '/login',
  '/recover',
  '/invalidate-codes',
];

export function isPublicRoute(pathname: string = window.location.pathname): boolean {
  return PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
}
