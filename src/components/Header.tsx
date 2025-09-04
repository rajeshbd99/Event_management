"use client";

import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";


export default function Header() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/create", label: "Create Event" },
    { href: "/my-events", label: "My Events" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-md dark:bg-gray-900/70">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-400 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-pink-200/40">
          </div>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-bold text-base md:text-lg">EventSphere</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              plan • create • celebrate
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-gray-700 dark:text-gray-200 transition hover:text-pink-500"
            >
              {link.label}
              <span className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-gradient-to-r from-pink-500 to-cyan-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          
          <Link
            href="/create"
            className="ml-2 inline-flex items-center rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
          >
            + Add Event
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md hover:bg-gray-200/60 dark:hover:bg-gray-800/60 transition"
          >
            {open ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white/90 backdrop-blur-md dark:bg-gray-900/90">
          <div className="flex flex-col container py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-gray-700 hover:text-pink-500 dark:text-gray-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/create"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white shadow-md"
            >
              + Add Event
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
