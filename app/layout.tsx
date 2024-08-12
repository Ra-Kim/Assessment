import type { Metadata } from "next";
import { Inter, Mulish } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const mulish = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Test Assessment",
  description: "For FuseERP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.className} no-scrollbar max-h-[100vh]`}>{children}</body>
    </html>
  );
}
