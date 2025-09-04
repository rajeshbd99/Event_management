import React from "react";
import EditEventForm from "../../../../components/EditEventForm";

export const dynamic = "force-dynamic";

export default function EditEventPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-3">Edit Event</h1>
        <p className="text-sm text-gray-600 mb-6">Update details for your event.</p>
        <EditEventForm id={id} />
      </div>
    </div>
  );
}
