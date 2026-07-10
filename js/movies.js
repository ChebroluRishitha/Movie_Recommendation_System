// Consolidate multilingual datasets into a single database array
const movies = [
  ...(window.moviesEnglish || []),
  ...(window.moviesHindi || []),
  ...(window.moviesTelugu || []),
  ...(window.moviesTamil || [])
];

window.movies = movies;
