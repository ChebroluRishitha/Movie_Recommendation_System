// Detail modal dialog box controllers and watchlist actions
window.app.modal = {
  openMovieDetail(movieId) {
    const movie = window.movies.find(m => m.id === movieId);
    if (!movie) return;

    const dom = window.app.dom;

    // 1. Set text contents
    dom.modalTitle.textContent = movie.title;
    dom.modalRating.textContent = movie.rating.toFixed(1);
    dom.modalYear.textContent = movie.year;
    dom.modalDuration.textContent = movie.duration || "N/A";
    dom.modalLanguage.textContent = movie.language;
    dom.modalPlot.textContent = movie.plot;
    dom.modalInfoLang.textContent = movie.language;
    dom.modalInfoYear.textContent = movie.year;

    // Set poster source
    dom.modalPoster.src = movie.poster;
    dom.modalPoster.style.display = "block";

    // 2. Set genres
    dom.modalGenres.innerHTML = movie.genre.map(g => `<span class="genre-tag">${g}</span>`).join("");

    // 3. Set cast list
    dom.modalCast.innerHTML = movie.cast.map(actor => `
      <button class="cast-member-btn" data-actor="${actor}">
        <i class="fa-solid fa-user"></i> ${actor}
      </button>
    `).join("");

    // 4. Update watchlist button
    this.updateWatchlistButton(movie.id);
    dom.btnFavorite.setAttribute("data-current-id", movie.id);

    // 5. Show modal
    dom.detailModal.classList.add("active");
    document.body.style.overflow = "hidden"; // Disable scrolling background
  },

  closeModal() {
    window.app.dom.detailModal.classList.remove("active");
    document.body.style.overflow = "auto";
  },

  updateWatchlistButton(movieId) {
    const state = window.app.state;
    const dom = window.app.dom;
    const isSaved = state.watchlist.includes(movieId);
    
    if (isSaved) {
      dom.btnFavorite.classList.add("active");
      dom.btnFavorite.innerHTML = `<i class="fa-solid fa-heart"></i> In Watchlist`;
    } else {
      dom.btnFavorite.classList.remove("active");
      dom.btnFavorite.innerHTML = `<i class="fa-regular fa-heart"></i> Save to Watchlist`;
    }
  },

  toggleWatchlist() {
    const state = window.app.state;
    const dom = window.app.dom;
    const id = parseInt(dom.btnFavorite.getAttribute("data-current-id"));
    if (isNaN(id)) return;

    const index = state.watchlist.indexOf(id);
    if (index > -1) {
      state.watchlist.splice(index, 1);
    } else {
      state.watchlist.push(id);
    }

    localStorage.setItem("cinematch_watchlist", JSON.stringify(state.watchlist));
    this.updateWatchlistButton(id);
    window.app.filters.setupLanguageCounts();
    window.app.grid.renderGrid();
  }
};
