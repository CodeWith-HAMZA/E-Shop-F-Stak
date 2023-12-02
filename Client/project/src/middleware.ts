export {default } from "next-auth/middleware"

export const config= {
    matcher: [
        "/admin/:path*",
        "/seller/:path*", 
        "/orders/:path*",
        "/checkout",
        // "/cart"

]}