"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  localEvents: EventItem[]; // events created by the user
  seededEvents: EventItem[]; // events from API
  setSeededEvents: (items: EventItem[]) => void;
  addLocalEvent: (ev: EventItem) => void;
  updateLocalEvent: (id: string, patch: Partial<EventItem>) => void;
  deleteLocalEvent: (id: string) => void;
  getEventById: (id: string) => EventItem | undefined;
  rsvpEvent: (id: string) => void;
  clearAll: () => void;
};

export const useEventsStore = create<EventsState>()(
  persist(
    (set, get) => ({
      localEvents: [],
      seededEvents: [],
      setSeededEvents: (items) => set({ seededEvents: items }),
      addLocalEvent: (ev) =>
        set((state) => ({ localEvents: [ev, ...state.localEvents] })),
      updateLocalEvent: (id, patch) =>
        set((state) => ({
          localEvents: state.localEvents.map((e) => (e.id === id ? { ...e, ...patch } : e)),
        })),
      deleteLocalEvent: (id) =>
        set((state) => ({ localEvents: state.localEvents.filter((e) => e.id !== id) })),
      getEventById: (id) => {
        const all = [...get().localEvents, ...get().seededEvents];
        return all.find((e) => e.id === id);
      },
      rsvpEvent: (id) => {
        const localIndex = get().localEvents.findIndex((e) => e.id === id);
        if (localIndex !== -1) {
          set((state) => {
            const updated = [...state.localEvents];
            updated[localIndex] = {
              ...updated[localIndex],
              rsvpCount: (updated[localIndex].rsvpCount ?? 0) + 1,
            };
            return { localEvents: updated };
          });
          return;
        }

        const seededIndex = get().seededEvents.findIndex((e) => e.id === id);
        if (seededIndex !== -1) {
          set((state) => {
            const updatedSeeded = [...state.seededEvents];
            updatedSeeded[seededIndex] = {
              ...updatedSeeded[seededIndex],
              rsvpCount: (updatedSeeded[seededIndex].rsvpCount ?? 0) + 1,
            };
            return { seededEvents: updatedSeeded };
          });
        }
      },
      clearAll: () => set({ localEvents: [], seededEvents: [] }),
    }),
    {
      name: "evm-storage-v1", // localStorage key
      partialize: (state) => ({ localEvents: state.localEvents }),
    }
  )
);
