import React from "react";
import EventForm from "../../components/EventForm";

export const metadata = {
  title: "Create Event - Event Management",
};

export default function CreatePage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
      {/* Left visual panel */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center">
        <div className="text-center text-white p-8">
          <h2 className="text-4xl font-bold mb-4">Share Your Event</h2>
          <p className="text-lg">
            Let everyone know about your amazing events. Create, manage, and track RSVPs all in one place.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full md:w-1/2 bg-gray-900 rounded-3xl shadow-2xl p-10 max-w-md">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          Create Event
        </h1>
        <p className="text-gray-500 text-sm mb-6 text-center">
          Fill out the details below. All events are stored locally in your browser.
        </p>
        <EventForm />
      </div>
    </div>
  );
}
