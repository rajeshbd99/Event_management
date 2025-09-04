"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-16 bg-gradient-to-r from-brand-pink via-brand-purple to-brand-cyan text-white">
      <div className="relative container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold">EventSphere ✨</h2>
          <p className="text-xs text-white/80">
            Create & celebrate events with style
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-5 text-sm">
          <Link href="#" className="hover:text-yellow-200 transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-yellow-200 transition-colors">
            Terms
          </Link>
          <Link href="#" className="hover:text-yellow-200 transition-colors">
            Contact
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20 py-3 text-center text-xs text-white/70">
        © {new Date().getFullYear()} EventSphere. Built with ❤️
      </div>
    </footer>
  );
}
