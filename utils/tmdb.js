const API_KEY = "4bd5fbcdcecbd4175fd5ec8e77aa419e";
const BASE_URL = "https://api.themoviedb.org/3";

// Buscar filmes por categoria (28 = Ação, 35 = Comédia, 27 = Terror, etc.)
export const fetchMovies = async (category) => {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=${category}`);
  const data = await res.json();
  return data.results || [];
};

// Filmes em alta (trending)
export const fetchTrending = async () => {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=pt-BR`);
  const data = await res.json();
  return data.results || [];
};

// Buscar filmes por vários gêneros (subcategorias)
export const fetchMoviesByGenres = async (genres) => {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=${genres}`);
  const data = await res.json();
  return data.results || [];
};

// Buscar séries populares (paginação para pegar mais resultados)
export const fetchSeries = async (pages = 2) => {
  let allSeries = [];
  for (let page = 1; page <= pages; page++) {
    const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`);
    const data = await res.json();
    allSeries = allSeries.concat(data.results || []);
  }
  return allSeries;
};

// Busca por query (barra de pesquisa)
export const searchMovies = async (query) => {
  if (!query) return [];
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}`);
  const data = await res.json();
  return data.results || [];
};

// Trailer do filme
export const fetchTrailer = async (movieId) => {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=pt-BR`);
  const data = await res.json();

  let trailer = data.results?.find(v => v.type === "Trailer" && v.site === "YouTube");

  // Se não achar em PT-BR, tenta em EN
  if (!trailer) {
    const resEn = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
    const dataEn = await resEn.json();
    trailer = dataEn.results?.find(v => v.type === "Trailer" && v.site === "YouTube");
  }

  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
};

// Trailer de séries
export const fetchSeriesTrailer = async (seriesId) => {
  const res = await fetch(`${BASE_URL}/tv/${seriesId}/videos?api_key=${API_KEY}&language=pt-BR`);
  const data = await res.json();

  let trailer = data.results?.find(v => 
    (v.type === "Trailer" || v.type === "Teaser") && v.site === "YouTube"
  );

  // Se não achar em PT-BR, tenta em EN
  if (!trailer) {
    const resEn = await fetch(`${BASE_URL}/tv/${seriesId}/videos?api_key=${API_KEY}&language=en-US`);
    const dataEn = await resEn.json();
    trailer = dataEn.results?.find(v => 
      (v.type === "Trailer" || v.type === "Teaser") && v.site === "YouTube"
    );
  }

  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
};
