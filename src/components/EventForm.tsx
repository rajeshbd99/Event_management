"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useEventsStore, EventItem } from "../store/useEventsStore";

const categories = ["Conference", "Workshop", "Meetup", "Other"];

function generateId(): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
  } catch {
  }
  return `local-${Date.now()}`;
}

export default function EventForm() {
  const addLocalEvent = useEventsStore((s) => s.addLocalEvent);
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<boolean>(false);

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

  function toISO(dateStr: string): string {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toISOString();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) {
      setSubmitting(false);
      return;
    }

    const newEvent: EventItem = {
      id: generateId(),
      title: title.trim(),
      description: description.trim(),
      date: toISO(date),
      location: location.trim(),
      category,
      createdBy: "local",
      rsvpCount: 0,
    };

    addLocalEvent(newEvent);
    router.push("/my-events");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-4" noValidate>
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full rounded-md border px-3 py-2 focus:outline-none ${errors.title ? "border-red-400" : "border-gray-200"
            }`}
          placeholder="Event title"
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
          className={`w-full rounded-md border px-3 py-2 focus:outline-none ${errors.description ? "border-red-400" : "border-gray-200"
            }`}
          placeholder="Event description"
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
            type="date"
            className={`w-full rounded-md border px-3 py-2 focus:outline-none bg-transparent text-white placeholder-white ${errors.date ? "border-red-400" : "border-gray-200"
              }`}
          />

          {errors.date && <div className="text-red-500 text-sm mt-1">{errors.date}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Event location"
            className={`w-full rounded-md border px-3 py-2 focus:outline-none ${errors.location ? "border-red-400" : "border-gray-200"
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
          className={`rounded-md border px-3 py-2 bg-gray-800 text-white placeholder-white ${errors.category ? "border-red-400" : "border-gray-200"
            }`}
        >
          <option value="" className="bg-gray-800 text-white">
            -- Select category --
          </option>
          {categories.map((c) => (
            <option key={c} value={c} className="bg-gray-800 text-white">
              {c}
            </option>
          ))}
        </select>
        {errors.category && <div className="text-red-500 text-sm mt-1">{errors.category}</div>}
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold bg-[#db3aa0] text-white shadow disabled:opacity-60 hover:cursor-pointer"
        >
          {submitting ? "Creating..." : "Create Event"}
        </button>
      </div>
    </form>
  );
}
