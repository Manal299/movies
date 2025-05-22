const API_BASE = "http://localhost:3000";

//Movies
export async function getAllMovies() {
  const res = await fetch(`${API_BASE}/api/movies`);
  if (!res.ok) throw new Error("Failed to fetch movies");

  const data = await res.json();
  return [...data].sort((a, b) => b.releaseYear - a.releaseYear);
}

export async function getTrendingMovies() {
  const res = await fetch(`${API_BASE}/api/movies`);
  if (!res.ok) throw new Error("Failed to fetch movies");

  const data = await res.json(); 
  return [...data].sort((a, b) => b.rating - a.rating);
}

export async function getMovieDetails(id) {
  const res = await fetch(`http://localhost:3000/api/movies/${id}`);
  if (!res.ok) return null;

  return await res.json();
}

//Genres
export async function getAllGenres() {
  const res = await fetch(`${API_BASE}/api/genres`);
  if (!res.ok) throw new Error("Failed to fetch genres");
  return await res.json();
}

export async function getGenreName(id) {
  const genres = await getAllGenres();
  const genre = genres.find((g) => g._id === id);
  return genre ? genre.name : null;
}

export async function getFilteredMovies(genreId) {
  const res = await fetch(`${API_BASE}/api/genres/${genreId}`);
  if (!res.ok) throw new Error("Failed to fetch filtered movies");
  return await res.json(); 
}

//Directors
export async function getAllDirectors() {
  const res = await fetch(`${API_BASE}/api/directors`);
  if (!res.ok) throw new Error("Failed to fetch directors");
  return await res.json();
}

export async function getDirectorDetails(id) {
  const res = await fetch(`${API_BASE}/api/directors/${id}`);
  if (!res.ok) return null;
  return await res.json(); 
}
