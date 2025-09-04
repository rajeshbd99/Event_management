import React from "react";
import EditEventForm from "../../../../components/EditEventForm";

export const dynamic = "force-dynamic";

export default function EditEventPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-16">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-pink-500/30 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-purple-500/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

      <div className="relative bg-gray-900 z-10 w-full max-w-3xl rounded-3xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white text-center mb-3">Edit Event</h1>
        <p className="text-sm text-gray-300 text-center mb-6">
          Update details for your event.
        </p>

        <EditEventForm id={id} />
      </div>
    </div>
  );
}
