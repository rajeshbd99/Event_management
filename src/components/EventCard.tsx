// src/components/EventCard.tsx
"use client";

import Link from "next/link";
import { format } from "date-fns";
import { EventItem } from "../store/useEventsStore";

export default function EventCard({ event }: { event: EventItem }) {
  const date = event.date ? new Date(event.date) : null;
  const dateLabel = date ? format(date, "EEE, MMM d • h:mm a") : "TBA";

  return (
    <article className="card hover:translate-y-[-4px] transition-transform duration-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="kicker">{event.category ?? "Other"}</div>
          <h3 className="mt-2 text-lg font-semibold">{event.title}</h3>
          <p className="mt-2 text-sm text-gray-600">{event.description ?? ""}</p>
        </div>

        <div className="text-right">
          <div className="text-sm text-gray-500">{dateLabel}</div>
          <div className="mt-3 text-sm text-gray-700">{event.location ?? "Location"}</div>
          <Link
            href={`/events/${event.id}`}
            className="mt-3 inline-block text-sm font-medium text-[#db3aa0] hover:underline"
          >
            View details →
          </Link>
        </div>
      </div>
    </article>
  );
}
