// src/components/EventCard.tsx
"use client";

import Link from "next/link";
import { EventItem } from "../store/useEventsStore";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { format } from "date-fns";

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <Card className="p-5 group transition">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <Badge>{event.category || "General"}</Badge>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {event.date
            ? format(new Date(event.date), "MMM d, yyyy • h:mm a")
            : "TBA"}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-display font-semibold group-hover:text-brand-pink transition-colors mb-2">
        {event.title}
      </h3>

      {/* Description */}
      {event.description && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {event.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          📍 {event.location || "TBA"}
        </span>
        <Link
          href={`/events/${event.id}`}
          className="text-sm font-medium text-brand-pink hover:underline"
        >
          View →
        </Link>
      </div>
    </Card>
  );
}
