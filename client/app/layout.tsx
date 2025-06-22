import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import ReactQueryWrapper from "@/components/providers";

export const metadata: Metadata = {
  title: "Cyber Store | E-Store",
  icons: "/favicon.png",
  description:
    "Cyber Store is a full-stack e-commerce web application built for practice and portfolio purposes. It demonstrates modern web development practices with end-to-end type safety.",
};

export default function RootLayout({
  children,
  auth,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased  overflow-x-hidden mx-auto container`}>
        <ReactQueryWrapper>
          <NavBar />
          {children}
          {auth}
          <Footer />
        </ReactQueryWrapper>
      </body>
    </html>
  );
}
