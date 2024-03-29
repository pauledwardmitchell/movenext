import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
	publicRoutes: ["/", "/privacy", "/terms"]
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};