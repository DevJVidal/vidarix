export default function Banner({ movie }) {
  const bgImage = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <div
      className="relative w-full h-[90vh] sm:h-[80vh] md:h-[70vh] flex items-end justify-start p-4 sm:p-6 md:p-10"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay dramático com gradiente e blur */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Card cinematográfico */}
      <div className="relative max-w-4xl w-full rounded-xl overflow-hidden shadow-2xl border border-white border-opacity-10 bg-white bg-opacity-10 backdrop-blur-xl flex flex-col sm:flex-row hover:scale-105 transition-transform duration-500">
        {/* Imagem do filme */}
        <div className="w-full sm:w-1/3">
          <img
            src={bgImage}
            alt={movie.title}
            className="w-full h-full object-cover rounded-l-xl"
          />
        </div>

        {/* Conteúdo do card */}
        <div className="w-full sm:w-2/3 p-4 sm:p-6 md:p-8 flex flex-col justify-end text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-3 drop-shadow-lg">
            {movie.title}
          </h1>
          <p className="text-sm sm:text-base md:text-base mb-4 md:mb-6 max-h-24 overflow-hidden overflow-ellipsis drop-shadow-md">
            {movie.overview}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="bg-accent px-6 py-2 font-bold rounded hover:opacity-90 transition-opacity shadow-lg">
              Assistir
            </button>
            <button className="bg-white text-black px-6 py-2 font-bold rounded hover:opacity-90 transition-opacity shadow-lg">
              Minha Lista
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
