// Main entrypoint, event listeners binding, and system initialization
window.app.main = {
  init() {
    const filters = window.app.filters;
    const grid = window.app.grid;
    
    filters.setupLanguageCounts();
    filters.renderGenreFilters();
    grid.renderGrid();
    this.setupEventListeners();
  },

  resetAllFilters() {
    const state = window.app.state;
    const dom = window.app.dom;

    Object.assign(state, {
      activeLanguage: "All",
      activeGenre: "All",
      searchQuery: "",
      sortOption: "rating",
      showOnlyWatchlist: false,
      actorFilter: null
    });

    dom.searchInput.value = "";
    dom.sortSelect.value = "rating";
    dom.btnWatchlistFilter.classList.remove("active");

    const resetPills = (selector, attr) => {
      document.querySelectorAll(selector).forEach(btn => 
        btn.classList.toggle("active", btn.getAttribute(attr) === "All")
      );
    };
    resetPills("#sidebarLanguages .sidebar-pill", "data-lang");
    resetPills("#sidebarGenres .sidebar-pill", "data-genre");

    window.app.grid.renderGrid();
  },

  setupEventListeners() {
    const dom = window.app.dom;
    const state = window.app.state;
    const main = this;

    const triggerSearch = () => {
      if (dom.searchInput.value !== state.actorFilter) {
        state.actorFilter = null;
      }
      state.searchQuery = dom.searchInput.value;
      window.app.grid.renderGrid();
    };

    dom.btnSearch.addEventListener("click", () => {
      triggerSearch();
      document.getElementById("explore").scrollIntoView({ behavior: "smooth" });
    });

    dom.searchInput.addEventListener("keyup", (e) => {
      triggerSearch();
      if (e.key === "Enter") {
        document.getElementById("explore").scrollIntoView({ behavior: "smooth" });
      }
    });

    dom.btnResetFilters.addEventListener("click", () => main.resetAllFilters());

    dom.sortSelect.addEventListener("change", (e) => {
      state.sortOption = e.target.value;
      window.app.grid.renderGrid();
    });

    if (dom.btnSurprise) {
      dom.btnSurprise.addEventListener("click", () => {
        window.app.wizard.showSurpriseMovie();
      });
    }

    dom.btnWatchlistFilter.addEventListener("click", () => {
      state.showOnlyWatchlist = !state.showOnlyWatchlist;
      dom.btnWatchlistFilter.classList.toggle("active", state.showOnlyWatchlist);
      window.app.grid.renderGrid();
    });

    const bindPillClick = (container, stateProp, attrName) => {
      container.addEventListener("click", (e) => {
        const btn = e.target.closest(".sidebar-pill");
        if (!btn) return;
        container.querySelectorAll(".sidebar-pill").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state[stateProp] = btn.getAttribute(attrName);
        window.app.grid.renderGrid();
      });
    };
    bindPillClick(dom.sidebarLanguages, "activeLanguage", "data-lang");
    bindPillClick(dom.sidebarGenres, "activeGenre", "data-genre");

    dom.wizardLanguageGroup.addEventListener("click", (e) => {
      const button = e.target.closest(".pill-btn");
      if (!button) return;
      dom.wizardLanguageGroup.querySelectorAll(".pill-btn").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
    });

    dom.btnFindMatch.addEventListener("click", () => {
      window.app.wizard.findWizardMatch();
    });

    dom.btnCloseModal.addEventListener("click", () => window.app.modal.closeModal());
    dom.btnFavorite.addEventListener("click", () => window.app.modal.toggleWatchlist());

    dom.detailModal.addEventListener("click", (e) => {
      if (e.target === dom.detailModal) window.app.modal.closeModal();
    });

    // Delegated click on actor inside details modal
    dom.modalCast.addEventListener("click", (e) => {
      const btn = e.target.closest(".cast-member-btn");
      if (!btn) return;
      
      const actorName = btn.getAttribute("data-actor");
      window.app.modal.closeModal();
      
      main.resetAllFilters();
      
      state.searchQuery = actorName;
      state.actorFilter = actorName;
      dom.searchInput.value = actorName;
      
      window.app.grid.renderGrid();
      document.getElementById("explore").scrollIntoView({ behavior: "smooth" });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && dom.detailModal.classList.contains("active")) {
        window.app.modal.closeModal();
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  window.app.main.init();
});
