import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "957408793306-vl981cfbqs9o20u0tml27lk3pf3o9dr8.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  // secret: process.env.NEXTAUTH_SECRET,
  // callbacks: {
  //   async jwt({ token }) {
  //     token.userRole = "user";
  //     return token;
  //   },
  // },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
