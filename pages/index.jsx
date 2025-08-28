import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import MovieRow from "../components/MovieRow";
import Footer from "../components/Footer";
import { 
  fetchTrending, 
  fetchMovies, 
  fetchMoviesByGenres, 
  fetchSeries, 
  searchMovies, 
  fetchTrailer,
  fetchSeriesTrailer
} from "../utils/tmdb";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [horror, setHorror] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [series, setSeries] = useState([]);
  const [bannerMovie, setBannerMovie] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);

  const resultsRef = useRef(null); // referência para scroll nos resultados

  useEffect(() => {
    const loadMovies = async () => {
      const trendingMovies = (await fetchTrending()) || [];
      setTrending(trendingMovies);
      if (trendingMovies.length > 0) {
        setBannerMovie(trendingMovies[Math.floor(Math.random() * trendingMovies.length)]);
      }

      setAction((await fetchMovies("28")) || []);   
      setComedy((await fetchMovies("35")) || []);   
      setHorror((await fetchMovies("27")) || []);   
      setSubcategories((await fetchMoviesByGenres("12,14,16")) || []); 
      setSeries((await fetchSeries()) || []);
    };

    loadMovies();
  }, []);

  const handleSearch = async (query) => {
    const results = (await searchMovies(query)) || [];
    setSearchResults(results);

    // Scroll para os resultados
    if (resultsRef.current && results.length > 0) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openModal = async (item, type = "movie") => {
    setSelectedMovie(item);
    let trailer = null;

    if (type === "movie") {
      trailer = await fetchTrailer(item.id);
    } else {
      trailer = await fetchSeriesTrailer(item.id);
    }

    setTrailerUrl(trailer);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setTrailerUrl(null);
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const loadGenreMovies = async (genreId) => {
    const movies = await fetchMoviesByGenres(genreId);
    setSubcategories(movies || []);
  };

  const loadGenreSeries = async (genreId) => {
    const allSeries = await fetchSeries();
    const filteredSeries = allSeries.filter((s) => s.genre_ids.includes(genreId));
    setSeries(filteredSeries || []);
  };

  const MovieModal = ({ movie, trailer, onClose }) => {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="relative bg-white/10 backdrop-blur-md rounded-lg max-w-4xl w-full mx-4 sm:mx-6 md:mx-0 p-5 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white text-2xl font-bold hover:opacity-80 transition-opacity"
          >
            ✖
          </button>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-shrink-0 w-full md:w-1/3">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name}
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>

            <div className="flex-1 text-white">
              <h2 className="text-2xl font-bold mb-2">{movie.title || movie.name}</h2>
              <p className="text-sm sm:text-base mb-4 line-clamp-6">{movie.overview}</p>
              {trailer && (
                <iframe
                  className="w-full h-48 sm:h-64 md:h-80 rounded-lg"
                  src={trailer.replace("watch?v=", "embed/")}
                  title="Trailer"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar 
        onSearch={handleSearch} 
        loadGenreMovies={loadGenreMovies} 
        loadGenreSeries={loadGenreSeries} 
      />

      {bannerMovie && <Banner movie={bannerMovie} />}

      <div className="mt-[0vh]">
        {searchResults.length > 0 && (
          <div ref={resultsRef}
            className="animate-pulse-bg rounded-lg p-2 transition-colors duration-1000"
            >
            <MovieRow title="Resultados" movies={searchResults} openModal={openModal} />
          </div>
        )}

        <MovieRow title="Em Alta" movies={trending} openModal={openModal} />
        <MovieRow title="Ação" movies={action} openModal={openModal} />
        <MovieRow title="Comédia" movies={comedy} openModal={openModal} />
        <MovieRow title="Terror" movies={horror} openModal={openModal} />
        <MovieRow title="Filmes" movies={subcategories} openModal={openModal} />
        <MovieRow title="Séries Populares" movies={series} openModal={openModal} />
      </div>

      <Footer />

      {selectedMovie && (
        <MovieModal movie={selectedMovie} trailer={trailerUrl} onClose={closeModal} />
      )}
    </div>
  );
}
