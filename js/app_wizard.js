// Matchmaker recommendation wizard and Surprise Me random selection
window.app.wizard = {
  findWizardMatch() {
    const dom = window.app.dom;

    // 1. Get selections
    const selectedLangBtn = dom.wizardLanguageGroup.querySelector(".pill-btn.active");
    const chosenLang = selectedLangBtn ? selectedLangBtn.getAttribute("data-lang") : "All";
    const chosenGenre = dom.wizardGenreSelect.value;
    const minRating = parseFloat(dom.wizardRatingSelect.value);

    // 2. Filter matches
    let matches = window.movies.filter(movie => {
      const matchesLanguage = chosenLang === "All" || movie.language === chosenLang;
      const matchesGenre = chosenGenre === "All" || movie.genre.includes(chosenGenre);
      const matchesRating = movie.rating >= minRating;
      
      return matchesLanguage && matchesGenre && matchesRating;
    });

    // 3. Select match
    if (matches.length === 0) {
      alert("No exact matches found for that combination. Try choosing a different genre or lower rating!");
      return;
    }

    // Pick a random movie from the filtered matches
    const randomIdx = Math.floor(Math.random() * matches.length);
    const matchedMovie = matches[randomIdx];

    // Open detail modal directly
    window.app.modal.openMovieDetail(matchedMovie.id);
  },

  showSurpriseMovie() {
    if (!window.movies || window.movies.length === 0) return;
    const randomIdx = Math.floor(Math.random() * window.movies.length);
    const randomMovie = window.movies[randomIdx];
    window.app.modal.openMovieDetail(randomMovie.id);
  }
};
