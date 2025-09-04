"use client";

import { create } from "zustand";

export type EventItem = {
  id: string;
  title: string;
  description?: string;
  date: string; // ISO
  location?: string;
  category?: "Conference" | "Workshop" | "Meetup" | "Other" | string;
  createdBy?: "local" | "seed";
  rsvpCount?: number;
};

type EventsState = {
  events: EventItem[];
  loading: boolean;
  fetchEvents: () => Promise<void>;
  addEvent: (ev: Omit<EventItem, "id" | "rsvpCount">) => Promise<void>;
  updateEvent: (id: string, patch: Partial<EventItem>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  getEventById: (id: string) => EventItem | undefined;
  rsvpEvent: (id: string) => Promise<void>;
};

export const useEventsStore = create<EventsState>((set, get) => ({
  events: [],
  loading: false,

  // Fetch from API
  fetchEvents: async () => {
    set({ loading: true });
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      set({ events: data.events });
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      set({ loading: false });
    }
  },

  // Add new event
  addEvent: async (ev) => {
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ev),
      });
      const newEvent = await res.json();
      set((state) => ({ events: [...state.events, newEvent] }));
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  },

  // Update event (in-memory only for now)
  updateEvent: async (id, patch) => {
    set((state) => ({
      events: state.events.map((e) =>
        e.id === id ? { ...e, ...patch } : e
      ),
    }));
  },

  // Delete event (in-memory only for now)
  deleteEvent: async (id) => {
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    }));
  },

  // Get event by ID
  getEventById: (id) => {
    return get().events.find((e) => e.id === id);
  },

  // RSVP to event (in-memory for now)
  rsvpEvent: async (id) => {
    set((state) => ({
      events: state.events.map((e) =>
        e.id === id ? { ...e, rsvpCount: (e.rsvpCount ?? 0) + 1 } : e
      ),
    }));
  },
}));
