import React from "react";
import EventDetailsClient from "../../../components/EventDetailsClient";

export const dynamic = "force-dynamic";

export default function EventPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return <EventDetailsClient id={id} />;
}
