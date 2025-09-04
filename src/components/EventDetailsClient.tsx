"use client";

import React, { useEffect, useState } from "react";
import { useEventsStore } from "../store/useEventsStore";
import { format } from "date-fns";
import Link from "next/link";

// Define proper Event type
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
        } catch {
        } finally {
          if (mounted) setLoading(false);
        }
      }
    }

    ensureSeeded();
    return () => {
      mounted = false;
    };
  }, [seededEvents, setSeededEvents]);

  useEffect(() => {
    const found = getEventById(id) as Event | null;
    setEvent(found ?? null);
  }, [seededEvents, id, getEventById]);

  if (loading) {
    return <div className="py-12 text-center">Loading event...</div>;
  }

  if (!event) {
    return (
      <div className="py-12 text-center">
        <div className="text-xl font-semibold mb-2">Event not found</div>
        <div className="text-sm text-gray-600 mb-4">
          The event you are looking for could not be found.
        </div>
        <Link href="/" className="text-[#db3aa0] underline">
          Back to home
        </Link>
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
    <div className="max-w-3xl mx-auto py-12">
      <div className="kicker">{event.category}</div>
      <h1 className="text-3xl font-bold mt-2 mb-2">{event.title}</h1>
      <div className="text-sm text-gray-600 mb-4">
        {dateLabel} — {event.location}
      </div>

      <div className="card mb-4">
        <p className="text-gray-700">{event.description}</p>
      </div>

      <div className="flex gap-3 items-center">
        <button
          onClick={handleRsvp}
          className="inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold bg-[#db3aa0] text-white shadow"
        >
          {justRsvped ? "Thanks!" : "RSVP"}
        </button>

        <div className="text-sm text-gray-700">{event.rsvpCount ?? 0} people interested</div>

        <Link
          href="/my-events"
          className="inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold border"
        >
          My Events
        </Link>

        {event.createdBy === "local" && (
          <Link
            href={`/events/${event.id}/edit`}
            className="ml-auto text-sm text-[#db3aa0] underline"
          >
            Edit
          </Link>
        )}
      </div>
    </div>
  );
}
