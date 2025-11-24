import Link from "next/link";
import {useState} from "react";
import {ApiEvent} from "@/app/evenements/types";
import {EventRegistrationModal} from "@/components/EventRegistrationModal";
import Image from "next/image";




const formatEventDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;

  const months = ["JAN", "FÉV", "MAR", "AVR", "MAI", "JUN", "JUL", "AOÛ", "SEP", "OCT", "NOV", "DÉC"];
  const day = String(d.getDate()).padStart(2, "0");
  const month = months[d.getMonth()] ?? "";
  return `${day} ${month}`;
};

const EventsSection = ({ events, texts }) => {
  const fallbackEvents: EventCard[] = [];

  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<ApiEvent | null>(null);
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


  const openModal = (event: ApiEvent) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const data = events && events.length > 0 ? events : fallbackEvents;

  return (
      <section id="evenements" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ fontFamily: "Orbitron, sans-serif" }}
            >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">{texts?.event?.title || ""}</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{texts?.event?.subtitle || ""}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {data.map((event, index) => (
                <div
                    key={event.id ?? index}
                    className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="relative overflow-hidden">

                      <Image
                          src={event.image || fallbackEvents[index]?.image}
                          alt={event.title || "Événement Star Trek"}
                          width={387}   // taille de base desktop
                          height={192}
                          className="w-full h-48 object-cover object-top transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                          sizes="(max-width: 768px) 380, 387px"
                      />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <div className="bg-purple-600/90 backdrop-blur-sm rounded-lg px-3 py-2">
                        <div className="text-sm font-bold text-white text-center">
                          {(event.event_date_display)}
                        </div>
                      </div>
                    </div>
                    {event.type && (
                        <div className="absolute top-4 right-4">
                    <span className="bg-blue-600/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                      {event.type}
                    </span>
                        </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3
                        className="text-xl font-semibold mb-3 text-purple-400"
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                      {event.title}
                    </h3>

                    {event.location && (
                        <div className="flex items-center text-gray-400 mb-3">
                          <i className="ri-map-pin-line mr-2"></i>
                          <span className="text-sm">{event.location}</span>
                        </div>
                    )}

                    {event.description && (
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          {event.description}
                        </p>
                    )}


                        <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap"

                                onClick={() => openModal(event)}
                        >
                          <i className="ri-calendar-check-line mr-2"></i>
                          S’inscrire
                        </button>

                  </div>
                </div>
            ))}
          </div>
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
          <div className="text-center mt-12">
            <Link
                href="/evenements"
                className="inline-flex items-center bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-purple-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap"
            >
              <i className="ri-calendar-line mr-2"></i>
              Voir tous les événements
            </Link>
          </div>
        </div>
      </section>
  );
};

export default EventsSection;
