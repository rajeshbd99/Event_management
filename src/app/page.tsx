import React from "react";
import Link from "next/link";
import { Button } from "../components/ui/Button";
import EventList from "../components/EventList";

export default function Home() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[90vh] px-6 bg-gradient-to-br from-brand-pink via-brand-purple to-brand-cyan overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-pink-400/40 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-400/40 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold font-display leading-tight mb-6">
            <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-md">
              EventSphere
            </span>
            <br />
            <span className="text-white/95 text-6xl">
              Create, Celebrate & Connect
            </span>
          </h1>

          <p className="text-base md:text-lg text-white/90 font-light mb-8 text-center max-w-2xl mx-auto">
            Explore exciting events, connect with like-minded people, and create memorable experiences.
            EventSphere helps you organize, discover, and celebrate events effortlessly, all in one place.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/create">
              <Button
                size="lg"
                className="px-8 py-3 text-base bg-black text-brand-pink font-bold shadow-lg shadow-pink-300/40 hover:shadow-xl hover:scale-105 transition-all"
              >
                + Create Event
              </Button>
            </Link>
            <Link href="/my-events">
              <Button
                size="lg"
                className="px-8 py-3 text-base border-2 border-white/80 text-white font-bold hover:bg-white/10 hover:shadow-lg transition-all"
                variant="ghost"
              >
                🎉 View My Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 container text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-pink mb-2">
            🚀 Don’t Miss Out
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold font-display bg-gradient-to-r from-brand-pink via-brand-purple to-brand-cyan bg-clip-text mb-4 text-white">
            Upcoming Events
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
            Discover exciting opportunities, gatherings, and celebrations happening near you.
          </p>
        </div>

        {/* Event Cards */}
        <div>
          <EventList />
        </div>
      </section>

    </div>
  );
}
