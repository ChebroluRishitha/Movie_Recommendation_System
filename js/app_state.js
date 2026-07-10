// Initialize the application namespace and global state
window.app = {
  state: {
    activeLanguage: "All",
    activeGenre: "All",
    searchQuery: "",
    sortOption: "rating",
    watchlist: JSON.parse(localStorage.getItem("cinematch_watchlist")) || [],
    showOnlyWatchlist: false,
    actorFilter: null
  },
  
  // Cache for DOM elements to keep lookups dry
  dom: {
    movieGrid: document.getElementById("movieGrid"),
    moviesCountEl: document.getElementById("moviesCount"),
    searchInput: document.getElementById("searchInput"),
    btnSearch: document.getElementById("btnSearch"),
    sortSelect: document.getElementById("sortSelect"),
    btnResetFilters: document.getElementById("btnResetFilters"),
    
    btnWatchlistFilter: document.getElementById("btnWatchlistFilter"),
    countWatchlist: document.getElementById("count-watchlist"),
    
    sidebarLanguages: document.getElementById("sidebarLanguages"),
    sidebarGenres: document.getElementById("sidebarGenres"),
    
    wizardLanguageGroup: document.getElementById("wizardLanguageGroup"),
    wizardGenreSelect: document.getElementById("wizardGenreSelect"),
    wizardRatingSelect: document.getElementById("wizardRatingSelect"),
    btnFindMatch: document.getElementById("btnFindMatch"),
    btnSurprise: document.getElementById("btnSurprise"),
    
    detailModal: document.getElementById("detailModal"),
    btnCloseModal: document.getElementById("btnCloseModal"),
    modalPoster: document.getElementById("modalPoster"),
    modalTitle: document.getElementById("modalTitle"),
    modalGenres: document.getElementById("modalGenres"),
    modalRating: document.getElementById("modalRating"),
    modalYear: document.getElementById("modalYear"),
    modalDuration: document.getElementById("modalDuration"),
    modalLanguage: document.getElementById("modalLanguage"),
    modalPlot: document.getElementById("modalPlot"),
    modalCast: document.getElementById("modalCast"),
    modalInfoLang: document.getElementById("modalInfoLang"),
    modalInfoYear: document.getElementById("modalInfoYear"),
    btnFavorite: document.getElementById("btnFavorite")
  }
};
