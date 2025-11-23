// app/events/EventsGrid.tsx
"use client";
import {ApiEvent} from "./types";
import {
    RiCalendarLine, RiMapPinLine, RiCalendarCheckLine
} from "react-icons/ri";
import {useState} from "react";
import {EventRegistrationModal} from "@/components/EventRegistrationModal";

export default function EventsGrid({events}: { events: ApiEvent[] }) {

    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<ApiEvent | null>(null);

    const openModal = (event: ApiEvent) => {
        setSelectedEvent(event);
        setShowModal(true);
    };
    if (events.length === 0) {
        return (
            <p className="text-center text-gray-400 py-16">
                Aucun événement à venir pour le moment. 🖖
            </p>
        );
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <>
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={
                                        event.image ?? ""
                                    }
                                    alt={event.title}
                                    className="w-full h-64 object-cover object-top transition-transform duration-300 group-hover:scale-110"
                                />

                                {event.event_date && (
                                    <div className="absolute top-4 right-4">
                                        <div className="bg-blue-600/90 rounded-lg px-3 py-2 text-center">
                                            <div className="text-sm font-bold text-white">
                                                {event.event_date_display}
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                <h3
                                    className="text-2xl font-semibold mb-3 text-blue-400"
                                    style={{fontFamily: "Orbitron, sans-serif"}}
                                >
                                    {event.title}
                                </h3>

                                {/* Infos */}
                                <div className="space-y-2 mb-4">
                                    {event.event_date && (
                                        <div className="flex items-center text-gray-400">
                                            <RiCalendarLine className="mr-3 text-purple-400"/>
                                            <span>
                                                {event.event_date_display}
                                                {event.event_time && ` à ${event.event_time}`}
                    </span>
                                        </div>
                                    )}

                                    {event.location && (
                                        <div className="flex items-center text-gray-400">
                                            <RiMapPinLine className="mr-3 text-purple-400"/>
                                            <span>{event.location}</span>
                                        </div>
                                    )}
                                </div>

                                {event.excerpt && (
                                    <p className="text-gray-300 mb-6 leading-relaxed">
                                        {event.excerpt}
                                    </p>
                                )}
                                {event.can_register && (
                                    <button
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold"
                                        onClick={() => openModal(event)}

                                    >
                                        <RiCalendarCheckLine className="mr-3 text-purple-400"/>
                                        S'inscrire
                                    </button>
                                )}
                            </div>


                        </div>

                    ))}
                </div>
            </section>
            <EventRegistrationModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                selectedEvent={
                    selectedEvent
                        ? {
                            title: selectedEvent.title,
                            id: selectedEvent.id,
                            date: selectedEvent.event_date ?? "",
                            dateDisplay: selectedEvent.event_date_display ?? "",
                            time: selectedEvent.event_time ?? "",
                            location: selectedEvent.location ?? "",
                        }
                        : null
                }
                formatDate={formatDate}
            />
        </>
    );
}
