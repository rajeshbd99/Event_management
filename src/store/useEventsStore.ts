// src/store/useEventsStore.ts
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
};

type EventsState = {
  localEvents: EventItem[]; // events created by the user (persisted)
  seededEvents: EventItem[]; // events from API (not persisted)
  setSeededEvents: (items: EventItem[]) => void;
  addLocalEvent: (ev: EventItem) => void;
  deleteLocalEvent: (id: string) => void;
  getEventById: (id: string) => EventItem | undefined;
  clearAll: () => void;
};

export const useEventsStore = create<EventsState>()(
  persist(
    (set, get) => ({
      localEvents: [],
      seededEvents: [],
      setSeededEvents: (items) => set({ seededEvents: items }),
      addLocalEvent: (ev) => set((state) => ({ localEvents: [ev, ...state.localEvents] })),
      deleteLocalEvent: (id) =>
        set((state) => ({ localEvents: state.localEvents.filter((e) => e.id !== id) })),
      getEventById: (id) => {
        const all = [...get().localEvents, ...get().seededEvents];
        return all.find((e) => e.id === id);
      },
      clearAll: () => set({ localEvents: [], seededEvents: [] }),
    }),
    {
      name: "evm-storage-v1", // localStorage key
      partialize: (state) => ({ localEvents: state.localEvents }),
    }
  )
);
