# 🌐 Ascol57 (Constant RUSCHÉ) — Portfolio Website

> A lightweight static portfolio website showcasing projects, written in plain HTML/CSS/JS.

> Un site portfolio statique et léger présentant des projets, écrit en HTML/CSS/JS purs.

---

<p align="center">
  <strong><a href="#-english">English</a></strong>
  &nbsp;&nbsp;&bull;&nbsp;&nbsp;
  <strong><a href="#-français">Français</a></strong>
</p>

---

## 🇬🇧 English

This repository is the source for a personal static site hosted at `ascol57.github.io`. It's intentionally simple: no build step, just static HTML/CSS/JS.

### 🚀 Key features

- Responsive single-page site (hero, projects grid, modal details)
- Animated hero title, background orbs and particles
- Project cards that open a modal with rich HTML details
- Clean footer with dynamic year
- Bilingual UI (FR / EN) using `locales/fr.json` and `locales/en.json`
- Accessible modal and reduced-motion support

### 📁 Project structure

```
ascol57.github.io/
├── index.html            # Main page (content, projects, modal)
├── styles.css            # Visual styles
├── script.js             # Interactions: modal, translations, particles
├── locales/              # JSON translation files
│   ├── fr.json
│   └── en.json
├── Constant face.svg     # Example avatar
├── README.md             # This file
└── ...                   # other static assets (images, icons)
```

### 🛠️ Run locally

Because the site loads `locales/*.json` with `fetch()`, serve the folder with a small HTTP server instead of opening the file directly.

With Python (PowerShell):
```powershell
cd 'C:\Users\const\Documents\github\ascol57.github.io'
python -m http.server 8000
# open http://localhost:8000
```

Or with Node:
```powershell
cd 'C:\Users\const\Documents\github\ascol57.github.io'
npx http-server -p 8000
# open http://localhost:8000
```

### ✍️ Editing content

- Edit page content directly in `index.html`.
- Translated strings are tagged with `data-i18n`. Update `locales/fr.json` and `locales/en.json` to change translations.
- Add or edit projects by modifying `.project-card` blocks; `.project-detail` HTML is shown in the modal.

### ✅ Accessibility & UX

- Modal uses `role="dialog"` and `aria-modal` and can be closed with `Esc` or overlay click.
- CSS respects `prefers-reduced-motion`.
- Language buttons use `aria-pressed` and the page `lang` attribute is updated on switch.

### 🔧 Troubleshooting

- If translations fail to load, check the Network console for 404s on `locales/*.json` (serve via HTTP).
- If the modal doesn't open, inspect the console for JS errors and verify `.project-card` exists.

### 📝 Deployment

- To deploy to GitHub Pages, push to the `main` branch of the `ascol57.github.io` repository.
- No build step required — static files are served as-is.

### 📄 License

MIT — see LICENSE if present.

---

## 🇫🇷 Français

Ce dépôt contient le code source du site personnel `ascol57.github.io`. Le site est statique et simple à modifier et déployer (GitHub Pages ou tout hébergeur statique).

### 🚀 Fonctions principales

- Site responsive (hero, grille de projets, modale de détails)
- Titre animé, orbes d'arrière-plan et particules
- Cartes projets ouvrant une modale avec contenu HTML riche
- Footer propre avec année dynamique
- Interface bilingue (FR / EN) via `locales/fr.json` et `locales/en.json`
- Modale accessible et prise en charge de `prefers-reduced-motion`

### 📁 Structure du projet

```
ascol57.github.io/
├── index.html            # Page principale (contenu, projets, modale)
├── styles.css            # Styles visuels
├── script.js             # Interactions : modale, traductions, particules
├── locales/              # Fichiers de traduction JSON
│   ├── fr.json
│   └── en.json
├── Constant face.svg     # Avatar d'exemple
├── README.md             # Ce fichier
└── ...                   # autres assets statiques (images, icônes)
```

### 🛠️ Lancer en local

Le site charge les JSON via `fetch()` — servez le dossier via HTTP plutôt que d'ouvrir `index.html` directement.

Avec Python (PowerShell) :
```powershell
cd 'C:\Users\const\Documents\github\ascol57.github.io'
python -m http.server 8000
# ouvrez http://localhost:8000
```

Avec Node :
```powershell
cd 'C:\Users\const\Documents\github\ascol57.github.io'
npx http-server -p 8000
# ouvrez http://localhost:8000
```

### ✍️ Modifier le contenu

- Modifiez le contenu dans `index.html`.
- Les textes traduits sont marqués `data-i18n` : éditez `locales/fr.json` et `locales/en.json` pour changer les traductions.
- Pour ajouter/modifier des projets, éditez les blocs `.project-card`; le HTML dans `.project-detail` est affiché dans la modale.

### ✅ Accessibilité & UX

- La modale utilise `role="dialog"` et `aria-modal`, fermeture par `Esc` ou clic overlay.
- `prefers-reduced-motion` est respecté.
- Les boutons de langue utilisent `aria-pressed` et la langue du document (`<html lang="..">`) est mise à jour.

### 🔧 Dépannage

- Si les traductions ne se chargent pas, vérifiez la console Réseau pour des 404 sur `locales/*.json`.
- Si la modale ne s'ouvre pas, vérifiez la console JS pour des erreurs et la présence des `.project-card`.

### 📝 Déploiement

- Poussez sur `main` du dépôt `ascol57.github.io` pour déployer sur GitHub Pages.
- Aucun build requis — fichiers statiques uniquement.

### 📄 Licence

MIT — voir LICENSE si présent.