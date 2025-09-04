// src/components/EventList.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useEventsStore, EventItem } from "../store/useEventsStore";
import EventCard from "./EventCard";

type SortOption = "upcoming" | "newest" | "oldest";

export default function EventList() {
  const seededEvents = useEventsStore((s) => s.seededEvents);
  const setSeededEvents = useEventsStore((s) => s.setSeededEvents);
  const localEvents = useEventsStore((s) => s.localEvents);

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("upcoming");

  // fetch seeded events
  useEffect(() => {
    let mounted = true;
    async function fetchSeeded() {
      try {
        setLoading(true);
        const res = await fetch("/api/events");
        const data = await res.json();
        if (!mounted) return;
        if (data?.events) {
          setSeededEvents(data.events);
        }
      } catch (err) {
        console.error("Failed to fetch seeded events", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if (!seededEvents || seededEvents.length === 0) {
      fetchSeeded();
    }

    return () => {
      mounted = false;
    };
  }, [seededEvents, setSeededEvents]);

  // merge local + seeded
  const merged: EventItem[] = useMemo(() => {
    const map = new Map<string, EventItem>();
    for (const ev of localEvents) map.set(ev.id, ev);
    for (const ev of seededEvents) if (!map.has(ev.id)) map.set(ev.id, ev);
    return Array.from(map.values());
  }, [localEvents, seededEvents]);

  // categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    merged.forEach((e) => set.add(e.category ?? "Other"));
    return Array.from(set);
  }, [merged]);

  // filter + sort
  const filtered = useMemo(() => {
    let list = merged.slice();

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((e) => {
        return (
          (e.title?.toLowerCase().includes(q) ?? false) ||
          (e.description?.toLowerCase().includes(q) ?? false) ||
          (e.location?.toLowerCase().includes(q) ?? false)
        );
      });
    }

    if (activeCategory) {
      list = list.filter((e) => (e.category ?? "Other") === activeCategory);
    }

    list.sort((a, b) => {
      const da = new Date(a.date).getTime() || 0;
      const db = new Date(b.date).getTime() || 0;
      if (sort === "upcoming") return da - db;
      if (sort === "newest") return db - da;
      return da - db;
    });

    // inject RSVP counts if missing
    return list.map((ev) => ({
      ...ev,
      rsvpCount: ev.rsvpCount ?? Math.floor(Math.random() * 150 + 10),
    }));
  }, [merged, search, activeCategory, sort]);

  return (
    <section>
      {/* Filters bar */}
      <div className="mb-10 p-6 rounded-2xl bg-white/70 dark:bg-gray-900/70 shadow backdrop-blur-md">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search events..."
            className="w-full md:w-1/2 rounded-full border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-pink"
          />

          {/* Sort */}
          <select
  value={sort}
  onChange={(e) => setSort(e.target.value as SortOption)}
  className="appearance-none rounded-full border border-gray-300 bg-white/90 dark:bg-gray-800/90 px-5 py-2 pr-10 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-brand-pink transition"
>
  <option value="upcoming">⏳ Upcoming</option>
  <option value="newest">🆕 Newest</option>
  <option value="oldest">📜 Oldest</option>
</select>

        </div>

        {/* Categories */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              !activeCategory
                ? "bg-gradient-to-r from-brand-pink to-brand-cyan text-white shadow"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setActiveCategory((c) => (c === cat ? null : cat))
              }
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-brand-pink to-brand-cyan text-white shadow"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events grid */}
      {loading ? (
        <div className="text-center py-12">⏳ Loading events...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-600">
          No events found. Try adjusting search or filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((ev) => (
            <EventCard key={ev.id} event={ev} />
          ))}
        </div>
      )}
    </section>
  );
}
