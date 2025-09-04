// src/components/EventCard.tsx
"use client";

import Link from "next/link";
import { format } from "date-fns";
import { EventItem } from "../store/useEventsStore";
import { motion } from "framer-motion";

export default function EventCard({ event }: { event: EventItem }) {
  const date = event.date ? new Date(event.date) : null;
  const dateLabel = date ? format(date, "EEE, MMM d • h:mm a") : "TBA";

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      whileHover={{ scale: 1.01 }}
      className="card"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="kicker">{event.category ?? "Other"}</div>
          <h3 className="mt-2 text-lg font-semibold">{event.title}</h3>
          <p className="mt-2 text-sm text-gray-600">{event.description ?? ""}</p>
        </div>

        <div className="text-right">
          <div className="text-sm text-gray-500">{dateLabel}</div>
          <div className="mt-3 text-sm text-gray-700">{event.location ?? "Location"}</div>

          <div className="mt-3 flex items-center justify-end gap-3">
            <div className="text-sm text-gray-600">{(event.rsvpCount ?? 0)} RSVP</div>
            <Link
              href={`/events/${event.id}`}
              className="text-sm font-medium text-[#db3aa0] hover:underline"
            >
              View →
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
