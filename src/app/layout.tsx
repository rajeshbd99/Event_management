import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "EventSphere — Plan • Create • Celebrate",
  description:
    "Create, discover, and manage beautiful events with EventSphere. Built on Next.js + Tailwind.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent theme flash if you toggle data-theme in DarkModeToggle */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){try{var t=localStorage.getItem("theme");t&&document.documentElement.setAttribute("data-theme",t)}catch(e){}}();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${display.variable} antialiased font-sans`}
      >
        {/* Cosmic radial background */}
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(255,78,205,.18),transparent_40%),radial-gradient(ellipse_at_top_right,rgba(124,58,237,.18),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,.18),transparent_40%)]" />

        {/* Soft grid texture (no external asset needed) */}
        <div className="fixed inset-0 -z-10 opacity-[0.06] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><path d='M0 39.5H40' stroke='%23ffffff' stroke-opacity='0.7'/><path d='M0.5 0V40' stroke='%23ffffff' stroke-opacity='0.7'/></svg>\")",
          }}
        />

        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
