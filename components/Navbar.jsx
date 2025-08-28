import { useState } from "react";

export default function Navbar({ onSearch, loadGenreMovies, loadGenreSeries }) {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const movieGenres = [
    { id: 28, name: "Ação" },
    { id: 12, name: "Aventura" },
    { id: 16, name: "Animação" },
    { id: 35, name: "Comédia" },
    { id: 80, name: "Crime" },
    { id: 27, name: "Terror" },
    { id: 10749, name: "Romance" },
  ];

  const seriesGenres = [
    { id: 10759, name: "Ação & Aventura" },
    { id: 16, name: "Animação" },
    { id: 35, name: "Comédia" },
    { id: 80, name: "Crime" },
    { id: 18, name: "Drama" },
    { id: 10765, name: "Sci-Fi & Fantasia" },
  ];

  return (
    <nav className="bg-primary fixed w-full z-50 shadow-lg">
      <div className="flex items-center justify-between p-5">
        {/* Logo */}
        <div
          className="text-3xl text-accent cursor-pointer font-anton"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          VIDARIX
        </div>

        {/* Botão Mobile */}
        <div className="md:hidden">
          <button
            className="text-accent"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {/* Dropdown Filmes */}
          <div className="group relative cursor-pointer">
            <span className="hover:text-blue-500 transition-colors flex items-center font-medium text-accent">
              Filmes
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
              </svg>
            </span>
            <div className="absolute hidden group-hover:block bg-primary mt-2 rounded shadow-lg p-2 md:right-0">
              {movieGenres.map((genre) => (
                <button
                  key={genre.id}
                  className="block w-full text-left px-4 py-1 hover:bg-blue-500 hover:text-white rounded"
                  onClick={() => loadGenreMovies && loadGenreMovies(genre.id, genre.name)}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>

          {/* Dropdown Séries */}
          <div className="group relative cursor-pointer">
            <span className="hover:text-blue-500 transition-colors flex items-center font-medium text-accent">
              Séries
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
              </svg>
            </span>
            <div className="absolute hidden group-hover:block bg-primary mt-2 rounded shadow-lg p-2 md:right-0">
              {seriesGenres.map((genre) => (
                <button
                  key={genre.id}
                  className="block w-full text-left px-4 py-1 hover:bg-blue-500 hover:text-white rounded"
                  onClick={() => loadGenreSeries && loadGenreSeries(genre.id, genre.name)}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>

          {/* Barra de busca */}
          <form
            onSubmit={handleSearch}
            className="flex w-65 bg-transparent rounded overflow-hidden border border-gray-600"
          >
            <input
              type="text"
              placeholder="Buscar filmes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-3 py-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-accent text-black font-bold hover:opacity-80 transition-opacity"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-primary p-4 space-y-2">
          <div>
            <span className="text-accent font-medium">Filmes</span>
            {movieGenres.map((genre) => (
              <button
                key={genre.id}
                className="block w-full text-left px-4 py-1 hover:bg-blue-500 hover:text-white rounded"
                onClick={() => { loadGenreMovies && loadGenreMovies(genre.id, genre.name); setMenuOpen(false); }}
              >
                {genre.name}
              </button>
            ))}
          </div>
          <div>
            <span className="text-accent font-medium">Séries</span>
            {seriesGenres.map((genre) => (
              <button
                key={genre.id}
                className="block w-full text-left px-4 py-1 hover:bg-blue-500 hover:text-white rounded"
                onClick={() => { loadGenreSeries && loadGenreSeries(genre.id, genre.name); setMenuOpen(false); }}
              >
                {genre.name}
              </button>
            ))}
          </div>
          <form
            onSubmit={handleSearch}
            className="flex w-full bg-transparent rounded overflow-hidden border border-gray-600 mt-2"
          >
            <input
              type="text"
              placeholder="Buscar filmes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-3 py-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-accent text-black font-bold hover:opacity-80 transition-opacity"
            >
              Buscar
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}
