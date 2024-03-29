import { Inter } from "next/font/google";
import { Providers } from "../providers";
import "../globals.css";
export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
