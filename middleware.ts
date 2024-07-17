import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes:['/','/home'] 
  // above are the routes which are public , no need to login 
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};