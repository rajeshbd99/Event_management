"use client";

import Link from "next/link";
import { EventItem } from "../store/useEventsStore";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { format } from "date-fns";

export default function EventCard({
  event,
}: {
  event: EventItem & { rsvpCount?: number };
}) {
  return (
    <Card className="p-6 group transition hover:shadow-xl hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Badge>{event.category || "General"}</Badge>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {event.date
            ? format(new Date(event.date), "MMM d, yyyy • h:mm a")
            : "TBA"}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-brand-pink transition-colors">
        {event.title}
      </h3>

      {/* Description */}
      {event.description && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {event.description}
        </p>
      )}

      {/* Location + RSVP */}
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>📍 {event.location || "TBA"}</span>
        <span className="font-medium text-brand-purple">
          🎟️ {event.rsvpCount ?? 0} RSVPs
        </span>
      </div>

      {/* View Button */}
      <div className="mt-5 text-right">
        <Link
          href={`/events/${event.id}`}
          className="inline-block text-sm font-medium text-brand-pink hover:underline"
        >
          View Details →
        </Link>
      </div>
    </Card>
  );
}
