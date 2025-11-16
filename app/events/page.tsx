// app/events/page.tsx (SERVER COMPONENT)

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComeWithUs from "@/components/ComeWithUsSection";
import CategoryFilters from "./CategoryFilters";
import EventsGrid from "./EventsGrid";
import { ApiEventsOverview, ApiEvent, ApiHero, UiCategory } from "./types";

// export const dynamic = "force-dynamic";
// export const revalidate = 0;

async function fetchEventsData(): Promise<ApiEventsOverview | null> {
  const baseUrl = process.env.NEXT_PUBLIC_WP_API;
  if (!baseUrl) return null;

  try {
    const res = await fetch(`${baseUrl}/starfleet/v1/events`, {
      // cache: "no-store",
    });
    if (!res.ok) throw new Error("Erreur API événements");
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default async function EventsPage() {
  const data = await fetchEventsData();

  const hero: ApiHero | null = data?.page?.hero ?? null;
  const allEvents: ApiEvent[] = data?.events ?? [];

  const today = new Date().toISOString().slice(0, 10);

  const upcoming = allEvents.filter((event) => {
    if (!event.event_date) return false;
    return event.event_date >= today;
  });

  const categoryIconMap: Record<string, string> = {
    convention: "ri-building-line",
    livestream: "ri-live-line",
    quiz: "ri-question-answer-line",
    meetup: "ri-group-line",
  };

  const uiCategories: UiCategory[] = [
    { id: "all", name: "Tous les Événements", icon: "ri-calendar-line" },
    ...(data?.categories ?? []).map((c) => ({
      id: c.slug,
      name: c.name,
      icon: categoryIconMap[c.slug] ?? "ri-price-tag-3-line",
    })),
  ];

  return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/*<Header />*/}

        <main className="pt-20">
          <section className="relative py-20 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                  backgroundImage: `url('${hero?.background_image?.url ?? ""}')`,
                }}
            />
            <div className="relative max-w-7xl mx-auto px-6 text-center">
              <h1
                  className="text-5xl md:text-6xl font-bold mb-6"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
              >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {hero?.title}
              </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                {hero?.subtitle}
              </p>
            </div>
          </section>

          <CategoryFilters categories={uiCategories} />

          <EventsGrid events={upcoming} />
          <ComeWithUs />
        </main>

        {/*<Footer />*/}
      </div>
  );
}
