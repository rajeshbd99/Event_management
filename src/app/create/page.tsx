import React from "react";
import EventForm from "../../components/EventForm";

export const metadata = {
  title: "Create Event - EventSphere",
};

export default function CreatePage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-brand-pink via-brand-purple to-brand-cyan relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-blob"></div>

      {/* Left visual panel */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center px-12 z-10">
        <div className="text-center text-white max-w-md">
          <h2 className="text-4xl md:text-5xl font-extrabold font-display mb-6 leading-tight">
            Host Events <br />
            <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent">
              That Inspire ✨
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/90 font-light">
            Create, manage, and track RSVPs in one place. Share your ideas with the world in style.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center p-10 z-10">
        <div className="w-full max-w-lg rounded-2xl bg-white/90 dark:bg-gray-900/90 shadow-2xl backdrop-blur-md p-12">
          <h1 className="text-3xl font-bold font-display text-center mb-4 bg-gradient-to-r from-brand-pink to-brand-cyan bg-clip-text text-white">
            Create Event
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm text-center mb-6">
            Fill out the details below. Your events are stored locally in your browser.
          </p>
          <EventForm />
        </div>
      </div>
    </div>
  );
}
