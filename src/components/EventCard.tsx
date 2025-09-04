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
    <Card className="relative p-6 bg-gray-900 text-white rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1">
  {/* Top Ribbon for Category */}
  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#db3aa0] text-white px-4 py-1 rounded-full text-xs font-semibold uppercase shadow-md">
    {event.category || "General"}
  </div>

  {/* Date */}
  <div className="text-center text-sm text-gray-400 mb-3">
    {event.date ? format(new Date(event.date), "MMM d, yyyy • h:mm a") : "TBA"}
  </div>

  {/* Title */}
  <h3 className="text-xl font-bold text-center mb-2">{event.title}</h3>

  {/* Description */}
  {event.description && (
    <p className="text-sm text-gray-300 mb-4 text-center line-clamp-3">
      {event.description}
    </p>
  )}

  {/* Location + RSVP */}
  <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
    <span className="flex items-center gap-1">📍 {event.location || "TBA"}</span>
    <span className="flex items-center gap-1 font-medium text-[#db3aa0]">
      🎟️ {event.rsvpCount ?? 0} RSVPs
    </span>
  </div>

  {/* View Button */}
  <div className="text-center">
    <Link
      href={`/events/${event.id}`}
      className="inline-block px-5 py-2 rounded-full bg-[#db3aa0] hover:bg-pink-500 transition text-white font-semibold"
    >
      View Details →
    </Link>
  </div>
</Card>

  );
}
