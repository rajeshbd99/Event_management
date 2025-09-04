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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content grows */}
      <main className="flex-grow container mx-auto py-12">
        {localEvents.length === 0 ? (
          <div className="text-center text-gray-600 py-24">
            You have no events yet.{" "}
            <Link href="/create" className="font-semibold text-[#db3aa0] hover:underline">
              Create your first event
            </Link>
            .
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {localEvents.map((ev) => (
    <div
      key={ev.id}
      className="relative bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-950 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl hover:scale-105 transition-transform duration-300"
    >
      {/* Decorative Blobs */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/30 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

      {/* Event Category */}
      <div className="bg-[#db3aa0] text-white text-xs font-bold px-3 py-1 rounded-full uppercase mb-4">
        {ev.category}
      </div>

      {/* Event Title */}
      <h2 className="text-2xl font-bold text-white mb-2">{ev.title}</h2>

      {/* Event Info */}
      <p className="text-sm text-gray-300 mb-1">{new Date(ev.date).toLocaleDateString()}</p>
      <p className="text-sm text-gray-300 mb-4">{ev.location}</p>

      {/* Action Buttons */}
      <div className="flex justify-center items-center gap-4 mt-2 flex-wrap">
        <Link
          href={`/events/${ev.id}`}
          className="px-4 py-2 text-sm text-[#db3aa0] font-medium border border-[#db3aa0] rounded-full hover:bg-[#db3aa0] hover:text-white transition"
        >
          View
        </Link>
        <Link
          href={`/events/${ev.id}/edit`}
          className="px-4 py-2 text-sm text-[#0f7bd6] font-medium border border-[#0f7bd6] rounded-full hover:bg-[#0f7bd6] hover:text-white transition"
        >
          Edit
        </Link>
        <button
          onClick={() => confirmDelete(ev.id)}
          className="px-4 py-2 text-sm text-red-500 font-medium border border-red-500 rounded-full hover:bg-red-500 hover:text-white transition"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
        )}

        {/* Delete Modal */}
        <Modal
          open={modalOpen}
          title="Delete event?"
          onClose={() => setModalOpen(false)}
          onConfirm={onConfirm}
          confirmLabel="Delete"
        >
          Are you sure you want to permanently delete this event? This action cannot be undone.
        </Modal>
      </main>
    </div>
  );
}
