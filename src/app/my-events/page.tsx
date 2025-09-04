import React from "react";
import MyEventsList from "../../components/MyEventsList";

export const metadata = {
  title: "My Events - Event Management",
};

export default function MyEventsPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-3">My Events</h1>
        <p className="text-sm text-gray-600 mb-6">Events you created are listed here. You can view or delete them.</p>
        <MyEventsList />
      </div>
    </div>
  );
}
