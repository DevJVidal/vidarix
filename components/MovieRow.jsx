import React, { useRef } from "react";

export default function MovieRow({ title, movies, openModal, type = "movie" }) {
  const scrollContainer = useRef(null);

  const scroll = (direction) => {
    if (scrollContainer.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainer.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const placeholderCount = 10;

  return (
    <div className="p-5 relative">
      <h2 className="text-2xl font-bold mb-3 fade-in">{title}</h2>

      {/* Botões de scroll */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-black via-gray-800 to-transparent p-3 rounded-r-full shadow-lg hover:scale-110 transition-transform"
      >
        <span className="text-white text-2xl font-bold">◀</span>
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-l from-black via-gray-800 to-transparent p-3 rounded-l-full shadow-lg hover:scale-110 transition-transform"
      >
        <span className="text-white text-2xl font-bold">▶</span>
      </button>

      <div
        ref={scrollContainer}
        className="flex overflow-x-scroll space-x-4 scrollbar-hide scroll-smooth"
      >
        {movies && movies.length > 0
          ? movies.map((movie) => (
              <div
                key={movie.id}
                className="relative flex-shrink-0 h-60 w-40 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:z-20 rounded-xl overflow-hidden"
                onClick={() => openModal && openModal(movie, type)}
              >
                {/* Efeito Frosted Glass */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-xl shadow-inner" />

                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="relative h-full w-full object-cover rounded-xl shadow-lg"
                />
              </div>
            ))
          : Array.from({ length: placeholderCount }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 h-60 w-40 bg-white/10 backdrop-blur-md rounded-xl animate-pulse shadow-inner"
              />
            ))}
      </div>
    </div>
  );
}
