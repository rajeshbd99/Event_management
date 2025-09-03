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

  // Fetch seeded events once on mount
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

    // Only fetch if we don't already have seeded events
    if (!seededEvents || seededEvents.length === 0) {
      fetchSeeded();
    }

    return () => {
      mounted = false;
    };
  }, [seededEvents, setSeededEvents]);

  // Merge local + seeded (local first)
  const merged: EventItem[] = useMemo(() => {
    // Ensure dedupe by id; keep local events first
    const map = new Map<string, EventItem>();
    for (const ev of localEvents) map.set(ev.id, ev);
    for (const ev of seededEvents) if (!map.has(ev.id)) map.set(ev.id, ev);
    return Array.from(map.values());
  }, [localEvents, seededEvents]);

  // derive categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    merged.forEach((e) => set.add(e.category ?? "Other"));
    return Array.from(set);
  }, [merged]);

  // filter + search
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

    // sort
    list.sort((a, b) => {
      const da = new Date(a.date).getTime() || 0;
      const db = new Date(b.date).getTime() || 0;
      if (sort === "upcoming") {
        // upcoming: earliest future first (past events at end)
        return da - db;
      } else if (sort === "newest") {
        return db - da;
      } else {
        return da - db;
      }
    });

    return list;
  }, [merged, search, activeCategory, sort]);

  return (
    <section>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="w-full md:w-2/3">
          <label className="sr-only">Search events</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, description, or location..."
            className="w-full rounded-md border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff7eb6]"
          />
        </div>

        <div className="flex gap-2 items-center">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-md border border-gray-200 px-3 py-2"
          >
            <option value="upcoming">Upcoming</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* categories */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1 rounded-full text-sm border ${
            !activeCategory ? "bg-[#db3aa0] text-white border-transparent" : "bg-white text-gray-700"
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory((c) => (c === cat ? null : cat))}
            className={`px-3 py-1 rounded-full text-sm border ${
              activeCategory === cat ? "bg-[#db3aa0] text-white border-transparent" : "bg-white text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12">Loading events...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-600">No events found. Try adjusting search or filters.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ev) => (
            <EventCard key={ev.id} event={ev} />
          ))}
        </div>
      )}
    </section>
  );
}
