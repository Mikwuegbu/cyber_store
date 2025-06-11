import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Cyber Store | E-Store",
  icons: "/favicon.png",
  description:
    "Cyber Store is a full-stack e-commerce web application built for practice and portfolio purposes. It demonstrates modern web development practices with end-to-end type safety.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased  overflow-x-hidden`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
