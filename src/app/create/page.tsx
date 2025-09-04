// src/app/create/page.tsx
import React from "react";
import EventForm from "../../components/EventForm";

export const metadata = {
  title: "Create Event - Event Management",
};

export default function CreatePage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-3">Create an event</h1>
        <p className="text-sm text-gray-600 mb-6">Fill the form below to create a new event. Events you create are stored locally in your browser.</p>

        <EventForm />
      </div>
    </div>
  );
}
