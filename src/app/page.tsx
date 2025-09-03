// src/app/page.tsx
import React from "react";
import Link from "next/link";
import EventList from "../components/EventList";

export default function Home() {
  return (
    <div className="container py-12">
      <section className="hero mb-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold mb-2">Create, discover, and manage beautiful events.</h1>
          <p className="text-lg opacity-90 mb-4">
            A colorful Event Management prototype built with Next.js, Tailwind CSS and modern UX patterns.
            Create events, view details, and manage your events — responsive and accessible.
          </p>
          <div className="flex gap-3">
            <Link href="/create" className="inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold bg-white text-[#db3aa0] shadow">
              Create an Event
            </Link>
            <Link href="/my-events" className="inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold bg-white/10 text-white/95">
              My Events
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Upcoming Events</h2>
          <p className="text-sm text-gray-500">Search, filter, and explore</p>
        </div>

        <EventList />
      </section>
    </div>
  );
}
