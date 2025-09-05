import React from "react";
import MyEventsList from "../../components/MyEventsList";

export const metadata = {
  title: "My Events - EventSphere",
};

export default function MyEventsPage() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center py-16 overflow-hidden">
      <div className="relative z-10 w-full max-w-4xl px-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-3">My Events</h1>
        <p className="text-gray-300 mb-8 text-sm md:text-base">
          Events you created are listed here. You can view, edit, or delete them.
        </p>

        {/* Events list */}
        <MyEventsList />
      </div>

      
    </div>
  );
}
