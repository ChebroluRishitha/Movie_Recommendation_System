# 🎬 Movie Recommendation System

A premium, responsive, and highly interactive movie recommendation website built with clean, modern vanilla web technologies. Featuring a rich multilingual database, customized recommendation wizard, and offline theatrical poster support.

Designed and developed by **Rishitha Chebrolu from IIT Bombay**.

---

## ✨ Features

- **Multilingual Support**: Supports **English**, **Hindi**, **Telugu**, and **Tamil** languages, with live count pills updated dynamically.
- **Customizable Recommendation Wizard**: Tailor movie picks by language, genre, and rating criteria to find your perfect match.
- **Search Engine with Cast Filters**:
  - High-precision search utilizing **word boundary matching (`\bquery\b`)** to prevent false positives in plot text.
  - Interactive, clickable cast buttons in the modal that automatically apply strict filtering for that actor's filmography.
- **Save to Watchlist**: Save your favorite movies locally using `localStorage` so your list persists across sessions.
- **Offline Poster Cache**: Displays pre-scraped local theatrical posters, with a clean CSS text-card fallback handler.
- **Premium User Interface**: Dark-themed, responsive layout utilizing glassmorphism, responsive sidebar grids, and smooth CSS micro-interactions.

---

## 🛠️ Technology Stack & Architecture

Built with a strict focus on modularity and high performance:
- **Core**: Vanilla HTML5 (semantic layout)
- **Styling**: Modular Vanilla CSS3 (separated into specific style tokens)
- **Modularity**: Strict file-size budget constraints—all Javascript files are cleanly separated by tasks and kept **under 150 lines of code** for optimal readability and maintainability.

---

## 📂 Project Structure

```
movie_recommendation_system/
├── index.html                           # Main entry point website
├── movie_recommendation_system.html     # Alternative entry point page
├── .gitignore                           # Git ignore configuration
├── css/                                 # Style Sheets
│   ├── base.css                         # Global CSS resets & variables
│   ├── layout.css                       # Grid grid layouts & structure
│   ├── sidebar.css                      # Left filter sidebar styles
│   ├── grid.css                         # Movie card list grid
│   ├── wizard.css                       # Recommendation engine UI
│   ├── modal_base.css                   # Details modal overlay & container
│   ├── modal_body.css                   # Modal details structure
│   └── modal.css                        # Modal buttons & interaction states
├── js/                                  # JavaScript Datasets & Controllers
│   ├── data_english.js                  # English movie database (<20 lines)
│   ├── data_hindi.js                    # Hindi movie database (<20 lines)
│   ├── data_telugu.js                   # Telugu movie database (<25 lines)
│   ├── data_tamil.js                    # Tamil movie database (<15 lines)
│   ├── movies.js                        # Consolidated database compiler
│   ├── app_state.js                     # Global variables & state storage
│   ├── app_filter.js                    # Dynamic sidebar filters & counts
│   ├── app_grid.js                      # Rendering logic for movie grid
│   ├── app_modal.js                     # Movie detail modal interactions
│   ├── app_wizard.js                    # Recommendation wizard calculator
│   └── app_main.js                      # Core event handlers & bootstrapping
└── posters/                             # Downloaded theatrical posters
```

---

## 🚀 Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/ChebroluRishitha/Movie_Recommendation_System.git
   ```
2. Simply double-click `index.html` or host locally using a dev server:
   ```bash
   npx http-server
   ```
