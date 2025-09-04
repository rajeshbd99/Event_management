"use client";

import React, { useEffect, useState } from "react";
import { useEventsStore } from "../store/useEventsStore";
import { format } from "date-fns";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date?: string;
  location?: string;
  rsvpCount?: number;
  createdBy?: string;
}

export default function EventDetailsClient({ id }: { id: string }) {
  const seededEvents = useEventsStore((s) => s.seededEvents);
  const setSeededEvents = useEventsStore((s) => s.setSeededEvents);
  const getEventById = useEventsStore((s) => s.getEventById);
  const rsvpEvent = useEventsStore((s) => s.rsvpEvent);

  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState<Event | null>(null);
  const [justRsvped, setJustRsvped] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function ensureSeeded() {
      if (!seededEvents || seededEvents.length === 0) {
        try {
          setLoading(true);
          const res = await fetch("/api/events");
          const data = await res.json();
          if (data?.events) {
            setSeededEvents(data.events);
          }
        } catch { }
        finally {
          if (mounted) setLoading(false);
        }
      }
    }

    ensureSeeded();
    return () => { mounted = false; };
  }, [seededEvents, setSeededEvents]);

  useEffect(() => {
    const found = getEventById(id) as Event | null;
    setEvent(found ?? null);
  }, [seededEvents, id, getEventById]);

  if (loading) {
    return <div className="py-12 text-center text-white">Loading event...</div>;
  }

  if (!event) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-2">Event not found</h2>
        <p className="text-gray-300 mb-4">The event you are looking for could not be found.</p>
        <Link href="/" className="text-[#db3aa0] underline">Back to home</Link>
      </div>
    );
  }

  const dateLabel = event.date
    ? format(new Date(event.date), "EEEE, MMMM d, yyyy '•' h:mm a")
    : "TBA";

  function handleRsvp() {
    if (!event) return;
    rsvpEvent(event.id);
    setJustRsvped(true);

    setTimeout(() => {
      const updated = getEventById(event.id) as Event | null;
      setEvent(updated ?? null);
      setJustRsvped(false);
    }, 150);
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-pink-500/30 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-purple-500/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

      {/* Event Card */}
      <div className="relative z-10 w-full max-w-3xl bg-gray-800 rounded-3xl p-8 shadow-2xl text-white">
        <div className="uppercase text-sm text-[#db3aa0] font-bold mb-2">{event.category}</div>
        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
        <p className="text-sm text-gray-300 mb-6">{dateLabel} — {event.location}</p>
        <div className="bg-gray-700 p-4 rounded-xl mb-6">{event.description}</div>

        <div className="flex flex-wrap gap-4 items-center">
          <button
            onClick={handleRsvp}
            className="px-5 py-2 bg-[#db3aa0] rounded-lg font-semibold hover:bg-pink-600 transition"
          >
            {justRsvped ? "Thanks!" : "RSVP"}
          </button>

          <span className="text-gray-300">{event.rsvpCount ?? 0} people interested</span>

          <Link
            href="/my-events"
            className="px-5 py-2 border rounded-lg text-gray-200 hover:bg-gray-700 transition"
          >
            My Events
          </Link>

          {event.createdBy === "local" && (
            <Link href={`/events/${event.id}/edit`}>
              <button className="ml-auto px-5 py-2 bg-[#0f7bd6] rounded-lg font-semibold hover:bg-blue-600 transition text-white">
                Edit
              </button>
            </Link>
          )}

        </div>
      </div>
    </div>
  );
}
