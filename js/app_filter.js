// Sidebar filters, category listing, and counts rendering
window.app.filters = {
  // Calculate and display movie counts by language in sidebar
  setupLanguageCounts() {
    const totalCount = window.movies.length;
    const englishCount = window.movies.filter(m => m.language === "English").length;
    const hindiCount = window.movies.filter(m => m.language === "Hindi").length;
    const teluguCount = window.movies.filter(m => m.language === "Telugu").length;
    const tamilCount = window.movies.filter(m => m.language === "Tamil").length;

    document.getElementById("count-lang-all").textContent = totalCount;
    document.getElementById("count-lang-english").textContent = englishCount;
    document.getElementById("count-lang-hindi").textContent = hindiCount;
    document.getElementById("count-lang-telugu").textContent = teluguCount;
    document.getElementById("count-lang-tamil").textContent = tamilCount;
    document.getElementById("count-watchlist").textContent = window.app.state.watchlist.length;
  },

  // Get all unique genres and render them in the sidebar
  renderGenreFilters() {
    const genres = new Set();
    window.movies.forEach(movie => {
      movie.genre.forEach(g => genres.add(g));
    });

    const sortedGenres = Array.from(genres).sort();
    const dom = window.app.dom;
    
    // Start with "All Genres" pill
    let html = `
      <button class="sidebar-pill active" data-genre="All" id="genre-pill-all">
        <span>All Genres</span>
        <span class="count">${window.movies.length}</span>
      </button>
    `;

    sortedGenres.forEach(genre => {
      const count = window.movies.filter(m => m.genre.includes(genre)).length;
      html += `
        <button class="sidebar-pill" data-genre="${genre}">
          <span>${genre}</span>
          <span class="count">${count}</span>
        </button>
      `;
    });

    dom.sidebarGenres.innerHTML = html;
  }
};
