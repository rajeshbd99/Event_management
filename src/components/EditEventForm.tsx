"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useEventsStore, EventItem } from "../store/useEventsStore";

const categories = ["Conference", "Workshop", "Meetup", "Other"];

export default function EditEventForm({ id }: { id: string }) {
  const getEventById = useEventsStore((s) => s.getEventById);
  const updateLocalEvent = useEventsStore((s) => s.updateLocalEvent);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<EventItem | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const ev = getEventById(id);
    if (ev) {
      setEvent(ev);
      setTitle(ev.title ?? "");
      setDescription(ev.description ?? "");
      if (ev.date) {
        const dt = new Date(ev.date);
        setDate(!isNaN(dt.getTime()) ? dt.toISOString().slice(0, 16) : "");
      }
      setLocation(ev.location ?? "");
      setCategory(ev.category ?? "");
    }
    setLoading(false);
  }, [id, getEventById]);

  function validate() {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "Title is required";
    if (!description.trim()) errs.description = "Description is required";
    if (!date) errs.date = "Date & time is required";
    if (date) {
      const d = new Date(date).getTime();
      if (isNaN(d)) errs.date = "Invalid date";
      else if (d < Date.now()) errs.date = "Date must be in the future";
    }
    if (!location.trim()) errs.location = "Location is required";
    if (!category.trim()) errs.category = "Category is required";
    return errs;
  }

  function toISO(dateStr: string) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toISOString();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    if (!event) return;

    if (event.createdBy !== "local") {
      setErrors({ general: "Only local events can be edited." });
      return;
    }

    updateLocalEvent(event.id, {
      title: title.trim(),
      description: description.trim(),
      date: toISO(date),
      location: location.trim(),
      category,
    });

    router.push(`/events/${event.id}`);
  }

  if (loading) return <div className="py-12 text-center">Loading...</div>;
  if (!event) return <div className="py-12 text-center">Event not found.</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-4" noValidate>
      {errors.general && <div className="text-red-500">{errors.general}</div>}

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full rounded-md border px-3 py-2 focus:outline-none ${
            errors.title ? "border-red-400" : "border-gray-200"
          }`}
        />
        {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className={`w-full rounded-md border px-3 py-2 focus:outline-none ${
            errors.description ? "border-red-400" : "border-gray-200"
          }`}
        />
        {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
      </div>

      {/* Date & location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date & time</label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="datetime-local"
            className={`w-full rounded-md border px-3 py-2 focus:outline-none ${
              errors.date ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.date && <div className="text-red-500 text-sm mt-1">{errors.date}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={`w-full rounded-md border px-3 py-2 focus:outline-none ${
              errors.location ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.location && <div className="text-red-500 text-sm mt-1">{errors.location}</div>}
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`rounded-md border px-3 py-2 ${
            errors.category ? "border-red-400" : "border-gray-200"
          }`}
        >
          <option value="">-- Select category --</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.category && <div className="text-red-500 text-sm mt-1">{errors.category}</div>}
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" className="inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold bg-[#db3aa0] text-white shadow">
          Save changes
        </button>
      </div>
    </form>
  );
}
