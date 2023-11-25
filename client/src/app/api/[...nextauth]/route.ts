import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: <string> process.env.GOOGLE_CLIENT_ID,
      clientSecret: <string> process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});

export { handler as GET, handler as POST };