import Link from "next/link";
import {useState} from "react";
import {ApiEvent} from "@/app/evenements/types";
import {EventRegistrationModal} from "@/components/EventRegistrationModal";




const formatEventDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;

  const months = ["JAN", "FÉV", "MAR", "AVR", "MAI", "JUN", "JUL", "AOÛ", "SEP", "OCT", "NOV", "DÉC"];
  const day = String(d.getDate()).padStart(2, "0");
  const month = months[d.getMonth()] ?? "";
  return `${day} ${month}`;
};

const ArticlesSection = ({ articles, texts }) => {
  const fallbackEvents=  [];


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




  const data = articles && articles.length > 0 ? articles : fallbackEvents;

  return (
      <section id="evenements" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{fontFamily: "Orbitron, sans-serif"}}
            >
              <span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">{texts?.articles?.title || ""}</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{texts?.articles?.subtitle || ""}
            </p>
          </div>

          <section className="py-16">
            <div className="max-w-7xl mx-auto px-6">
              {data.length === 0 ? (
                  <p className="text-center text-gray-400">
                    Aucun article pour pour l’instant.
                  </p>
              ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 group cursor-pointer"
                        >
                          <div className="relative overflow-hidden">
                            {post.image && (
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                                />
                            )}
                            <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {post.category}
                        </span>
                            </div>
                          </div>

                          <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                              {post.title}
                            </h3>

                            <p className="text-gray-400 mb-4 line-clamp-2">
                              {post.excerpt}
                            </p>

                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{post.author}</span>
                              <span>{post.date}</span>
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </Link>
                    ))}
                  </div>
              )}



            </div>
          </section>


          <div className="text-center mt-12">
            <Link
                href="/blog"
                className="inline-flex items-center bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-purple-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap"
            >
              <i className="ri-calendar-line mr-2"></i>
              Voir tous les articles
            </Link>
          </div>
        </div>
      </section>
  );
};

export default ArticlesSection;
