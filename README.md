# kiyotopkop.me — portfolio mockups (Phase 1)

Seven design directions for the portfolio of **Aerrol John "Kiyo" Jimenez**, Cybersecurity + Full-Stack Developer.

**Live gallery:** https://kiyotopkop.github.io/portfolio-mockups/

| # | Direction | Idea |
|---|---|---|
| 01 | Terminal TUI | First screen is a tmux workspace with a live activity log |
| 02 | The Rack | Three.js server rack; every unit is a project (plain-view fallback) |
| 03 | Bold Motion | Giant cursor-reactive KIYO type, magnetic buttons, marquee |
| 04 | Case-File Dossier | Projects as declassified case files |
| 05 | Kiyo's Desk | Illustrated desk; every object is a project |
| 06 | Editorial Cover | Portfolio as a magazine cover and feature |
| 07 | Traceroute | Each section is a network hop; a packet follows your scroll |

Static HTML/CSS/JS, no build step. Every page respects `prefers-reduced-motion` and has its own mobile layout.

- The AutoShop screen in each mockup is a mock UI with fictional demo data. No client information is shown.
- Palettes come from Sanzo Wada's *A Dictionary of Color Combinations*, using the color data from [mattdesl/dictionary-of-colour-combinations](https://github.com/mattdesl/dictionary-of-colour-combinations).

Run locally: `python3 -m http.server 4321` in this folder, then open http://localhost:4321.
