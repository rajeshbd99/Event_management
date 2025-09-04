// src/app/api/events/route.ts
import { NextResponse } from "next/server";

const seededEvents = [
  {
    id: "evt-1",
    title: "Sunrise Design Conference",
    description: "A full-day conference for UI/UX designers with workshops, talks and networking.",
    date: "2025-09-20T09:30:00.000Z",
    location: "Dhaka International Convention Center",
    category: "Conference",
    createdBy: "seed",
    rsvpCount: 12
  },
  {
    id: "evt-2",
    title: "React Native Workshop",
    description: "Hands-on workshop building cross-platform apps with React Native.",
    date: "2025-09-25T13:00:00.000Z",
    location: "Online (Zoom)",
    category: "Workshop",
    createdBy: "seed",
    rsvpCount: 5
  },
  {
    id: "evt-3",
    title: "Weekend Meetup: Data Talks",
    description: "Casual meetup for data lovers — lightning talks and hot chocolate.",
    date: "2025-10-05T16:00:00.000Z",
    location: "Cafe Connect, Gulshan",
    category: "Meetup",
    createdBy: "seed",
    rsvpCount: 8
  },
  {
    id: "evt-4",
    title: "Photography Walk",
    description: "Explore the city and practice street photography with local mentors.",
    date: "2025-10-12T06:00:00.000Z",
    location: "Riverside Park",
    category: "Other",
    createdBy: "seed",
    rsvpCount: 3
  },
  {
    id: "evt-5",
    title: "Machine Learning Summit",
    description: "Two-day summit covering trends, research, and applied ML in industry.",
    date: "2025-11-08T09:00:00.000Z",
    location: "Tech Hub Auditorium",
    category: "Conference",
    createdBy: "seed",
    rsvpCount: 21
  },
  {
    id: "evt-6",
    title: "Startup Pitch Night",
    description: "Early-stage founders pitch to investors and mentors in a fast-paced format.",
    date: "2025-09-30T18:30:00.000Z",
    location: "Innovation Garage",
    category: "Meetup",
    createdBy: "seed",
    rsvpCount: 7
  }
];

export async function GET() {
  return NextResponse.json({ events: seededEvents });
}
