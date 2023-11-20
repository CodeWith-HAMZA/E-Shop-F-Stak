// import Header from "@/components/Private/Admin/client/AdminHeader";
import Header from "@/app/Header";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>

      <body>
        <Toaster />
        <Header />
        {children}
      </body>
    </html>
  );
}