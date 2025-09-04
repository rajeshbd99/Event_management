// src/components/MyEventsList.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useEventsStore } from "../store/useEventsStore";
import Modal from "./Modal";

export default function MyEventsList() {
  const localEvents = useEventsStore((s) => s.localEvents);
  const deleteLocalEvent = useEventsStore((s) => s.deleteLocalEvent);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function confirmDelete(id: string) {
    setDeletingId(id);
    setModalOpen(true);
  }

  function onConfirm() {
    if (deletingId) {
      deleteLocalEvent(deletingId);
    }
    setModalOpen(false);
    setDeletingId(null);
  }

  if (localEvents.length === 0) {
    return (
      <div className="py-12 text-center text-gray-600">
        You have no events yet. <Link href="/create" className="underline text-[#db3aa0]">Create your first event</Link>.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {localEvents.map((ev) => (
        <div key={ev.id} className="card flex items-center justify-between gap-4">
          <div>
            <div className="kicker">{ev.category}</div>
            <div className="font-semibold">{ev.title}</div>
            <div className="text-sm text-gray-600">{new Date(ev.date).toLocaleString()}</div>
            <div className="text-sm text-gray-700 mt-1">{ev.location}</div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <Link href={`/events/${ev.id}`} className="text-sm text-[#db3aa0] hover:underline">
              View
            </Link>
            <Link href={`/events/${ev.id}/edit`} className="text-sm text-[#0f7bd6] underline">
              Edit
            </Link>
            <button
              onClick={() => confirmDelete(ev.id)}
              className="text-sm text-red-600 underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <Modal
        open={modalOpen}
        title="Delete event?"
        onClose={() => setModalOpen(false)}
        onConfirm={onConfirm}
        confirmLabel="Delete"
      >
        Are you sure you want to permanently delete this event? This action cannot be undone.
      </Modal>
    </div>
  );
}
