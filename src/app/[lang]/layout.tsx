import type { Metadata } from "next";
import { Judson, Karla } from "next/font/google";
import "../globals.css";

export const metadata: Metadata = {
  title: "Duty Exchange",
  description: "Duty Exchange",
};

const judson = Judson({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-judson",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-karla",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${judson.variable} ${karla.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
