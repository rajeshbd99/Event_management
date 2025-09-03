// src/components/Header.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-200/60 bg-transparent">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff7eb6] to-[#7afcff] flex items-center justify-center text-white font-bold shadow-md">
            EM
          </div>
          <div>
            <div className="text-lg font-bold">Event Management</div>
            <div className="text-xs text-gray-500">beautiful events, beautifully managed</div>
          </div>
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/" className="text-sm font-medium hover:text-[#db3aa0]">Home</Link>
          <Link href="/create" className="text-sm font-medium hover:text-[#db3aa0]">Create Event</Link>
          <Link href="/my-events" className="text-sm font-medium hover:text-[#db3aa0]">My Events</Link>
          <a className="ml-2 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold bg-[#db3aa0] text-white shadow-sm hover:opacity-95" href="#">
            Get Started
          </a>
        </nav>

        {/* mobile */}
        <div className="md:hidden">
          <button aria-label="Toggle menu" onClick={() => setOpen(!open)} className="p-2 rounded-md">
            {open ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* mobile menu content */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="flex flex-col container py-4">
            <Link href="/" onClick={() => setOpen(false)} className="py-2">Home</Link>
            <Link href="/create" onClick={() => setOpen(false)} className="py-2">Create Event</Link>
            <Link href="/my-events" onClick={() => setOpen(false)} className="py-2">My Events</Link>
          </div>
        </div>
      )}
    </header>
  );
}
