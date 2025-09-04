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
    <div className="flex items-center justify-center relative py-10 overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-gray-800 rounded-3xl p-8 w-full max-w-2xl shadow-2xl space-y-6"
        noValidate
      >
        <h2 className="text-2xl font-bold text-white text-center mb-4">Edit Event</h2>
        {errors.general && <div className="text-red-500 text-center">{errors.general}</div>}

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full rounded-lg border px-4 py-2 focus:outline-none bg-gray-700 text-white ${
              errors.title ? "border-red-400" : "border-gray-600"
            }`}
            placeholder="Event title"
          />
          {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={`w-full rounded-lg border px-4 py-2 focus:outline-none bg-gray-700 text-white ${
              errors.description ? "border-red-400" : "border-gray-600"
            }`}
            placeholder="Event description"
          />
          {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
        </div>

        {/* Date & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Date & Time</label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="datetime-local"
              className={`w-full rounded-lg border px-4 py-2 focus:outline-none bg-gray-700 text-white ${
                errors.date ? "border-red-400" : "border-gray-600"
              }`}
            />
            {errors.date && <div className="text-red-500 text-sm mt-1">{errors.date}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`w-full rounded-lg border px-4 py-2 focus:outline-none bg-gray-700 text-white ${
                errors.location ? "border-red-400" : "border-gray-600"
              }`}
              placeholder="Event location"
            />
            {errors.location && <div className="text-red-500 text-sm mt-1">{errors.location}</div>}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full rounded-lg border px-4 py-2 bg-gray-700 text-white focus:outline-none ${
              errors.category ? "border-red-400" : "border-gray-600"
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

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-2 rounded-xl bg-[#db3aa0] text-white font-semibold shadow-lg hover:bg-[#e85ab8] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
