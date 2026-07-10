// Movie grid list render engine, sorting, and search matching
window.app.grid = {
  renderGrid() {
    const state = window.app.state;
    const dom = window.app.dom;

    // 1. Filter movies
    let filteredMovies = window.movies.filter(movie => {
      if (state.showOnlyWatchlist && !state.watchlist.includes(movie.id)) {
        return false;
      }

      // Check strict actor filter
      if (state.actorFilter && !movie.cast.includes(state.actorFilter)) {
        return false;
      }
      
      const matchesLanguage = state.activeLanguage === "All" || movie.language === state.activeLanguage;
      const matchesGenre = state.activeGenre === "All" || movie.genre.includes(state.activeGenre);
      
      let matchesSearch = true;
      if (state.searchQuery.trim() !== "") {
        const query = state.searchQuery.toLowerCase().trim();
        const matchesTitle = movie.title.toLowerCase().includes(query);
        
        // Exact word boundary matching for plot text to prevent false positives (like 'an' matching 'many')
        const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const plotRegex = new RegExp('\\b' + escapedQuery + '\\b', 'i');
        const matchesPlot = plotRegex.test(movie.plot);
        
        const matchesCast = movie.cast.some(actor => actor.toLowerCase().includes(query));
        const matchesGenreList = movie.genre.some(g => g.toLowerCase().includes(query));
        
        matchesSearch = matchesTitle || matchesPlot || matchesCast || matchesGenreList;
      }

      return matchesLanguage && matchesGenre && matchesSearch;
    });

    // 2. Sort movies
    filteredMovies.sort((a, b) => {
      if (state.sortOption === "rating") return b.rating - a.rating;
      if (state.sortOption === "year-desc") return b.year - a.year;
      if (state.sortOption === "year-asc") return a.year - b.year;
      if (state.sortOption === "title") return a.title.localeCompare(b.title);
      return 0;
    });

    // 3. Update count display
    dom.moviesCountEl.textContent = filteredMovies.length;

    // 4. Build grid HTML
    if (filteredMovies.length === 0) {
      dom.movieGrid.innerHTML = `
        <div class="no-results">
          <i class="fa-solid fa-face-frown-open"></i>
          <h3>No Movies Found</h3>
          <p>We couldn't find any movies matching your current filters. Try resetting them!</p>
          <button class="pill-btn active" id="btnNoResultsReset">Reset All Filters</button>
        </div>
      `;
      document.getElementById("btnNoResultsReset").addEventListener("click", () => {
        window.app.main.resetAllFilters();
      });
      return;
    }

    let gridHtml = "";
    filteredMovies.forEach(movie => {
      const genreString = movie.genre.join(" • ");
      
      gridHtml += `
        <div class="movie-card" data-id="${movie.id}">
          <div class="movie-poster-container">
            <div class="card-badges">
              <span class="card-badge badge-lang">${movie.language}</span>
              <span class="card-badge badge-year">${movie.year}</span>
            </div>
            <div class="rating-badge">
              <i class="fa-solid fa-star"></i> ${movie.rating.toFixed(1)}
            </div>
            <img class="movie-poster" src="${movie.poster}" alt="${movie.title} Poster" loading="lazy" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="poster-placeholder" style="display: none;">
              <div class="placeholder-icon"><i class="fa-solid fa-film"></i></div>
              <div class="placeholder-title">${movie.title}</div>
            </div>
          </div>
          <div class="movie-card-info">
            <div>
              <h3 class="movie-card-title">${movie.title}</h3>
              <p class="movie-card-genres">${genreString}</p>
            </div>
            <div class="movie-card-footer">
              <span class="movie-card-duration">${movie.duration || "N/A"}</span>
              <span class="movie-card-more">Details <i class="fa-solid fa-arrow-right"></i></span>
            </div>
          </div>
        </div>
      `;
    });

    dom.movieGrid.innerHTML = gridHtml;

    // Attach click events
    document.querySelectorAll(".movie-card").forEach(card => {
      card.addEventListener("click", () => {
        const id = parseInt(card.getAttribute("data-id"));
        window.app.modal.openMovieDetail(id);
      });
    });
  }
};
