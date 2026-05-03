# FIRE Suite — Windows App

A personal finance desktop app for Windows built with Electron. Includes a FIRE projection calculator, Net Worth tracker, and Budget tracker.

**Current version: 3.8.0**

---

## What's in the app

- **FIRE Calculator** — project your investment pot, model compound growth, and find your financial independence date
- **Net Worth Tracker** — log your net worth each year across multiple asset categories with charts and projections
- **Budget Tracker** — monthly income and expense spreadsheet with rolling totals and an all-time summary view

---

## First time setup (do this once)

### Step 1 — Install Node.js
1. Go to https://nodejs.org
2. Download the **LTS** version (the left button)
3. Run the installer, click Next through everything
4. Restart your computer after it finishes

### Step 2 — Install Git
1. Go to https://git-scm.com/download/win and download the installer
2. Run it with default settings
3. Restart your terminal after it finishes

### Step 3 — Clone this repo
Open a terminal (press `Win + R`, type `cmd`, press Enter) and run:
```
git clone https://github.com/robavio/fire-calculator-releases.git
cd fire-calculator-releases
```

### Step 4 — Install dependencies
```
npm install
```
Wait for it to finish (may take 1–2 minutes, downloads ~200MB into `node_modules`).

### Step 5 — Test it works
```
npm start
```
The app should open. Close it when done.

### Step 6 — Build the .exe installer
```
npm run build
```
This creates a `dist` folder. Inside you'll find:
- `FIRE Calculator Setup 3.9.0.exe` — the installer you can run on any Windows PC

---

## Running the app (after building)
Double-click `FIRE Calculator Setup 3.9.0.exe` to install it.
It will appear in your Start Menu and on your Desktop.

---

## Updating to a new version

When a new version is pushed to this repo:

1. Open a terminal in the `fire-calculator-releases` folder
2. Pull the latest code:
   ```
   git pull
   ```
3. Rebuild:
   ```
   npm run build
   ```
4. Run the new installer from the `dist` folder — it will update the existing installation

> **Your data is safe across updates.** Budget tracker data, Net Worth entries, and settings are stored locally on your machine (separate from the app files) and are not affected by updates.

---

## Version history

### v3.9.0
- Larger, uniform text hierarchy across all pages (headings, subheadings, labels all bumped up)
- Budget tracker rows now default to blank labels — name them however you want
- Extra "Money In" rows below Net Pay (Transfers, Gifts, Misc) removed — all income goes in the top section
- Budget cells show £ sign on the left; click anywhere in a cell to input a number
- Budget table resizes dynamically with the window (no fixed minimum width)
- Year tiles on the Budget Years page enlarged
- Budget ← Years button is now red and sits next to the Home button
- Net Worth "Add Entry" button removed — all saves happen instantly as you type
- Net Worth date picker auto-advances to the next unfilled year after each entry is saved

### v3.8.0
- Net Worth tracker now auto-saves on every number input, same as the budget tracker
- Export Data Backup — saves all your NW and budget data to a dated JSON file (File menu)
- Import Data Backup — restores a backup file, replacing current data (File menu)
- Backup files are human-readable JSON, safe to store anywhere

### v3.7.0
- Fixed Add Year button in Budget Tracker (now opens a proper in-app modal instead of a system prompt)
- Net Worth tracker now saves all data locally — entries persist across app restarts
- Net Worth tracker live preview — charts and stats update as you type each value, before pressing Add Entry
- Fixed Net Worth category delete button — clicking a category name no longer accidentally removes it
- All text sizes increased across every page
- Home buttons are now red for visibility
- Navigate menu added to the app menu bar (File / Navigate / Help)

### v3.6.0
- Budget tracker now saves all data locally — reopening the app restores everything you entered
- Budget data persists safely across app updates
- Years page redesigned with large tile cards — add only the years you need with the "+ Add Year" button
- Budget table layout tightened to fit the full table on screen without vertical scrolling

### v3.5.0
- FIRE Suite with compound interest projection, real value line, and withdrawal sustainability
- Net Worth tracker with category allocation, year-on-year change, and CAGR projection
- Budget tracker with monthly income/expense grid, rolling totals, and all-time summary
- Dark/light/auto theme support
- Help > Check for updates menu item

---

## Notes for developers

**Version numbers** are set in two places — keep them in sync:
- `package.json` → `"version": "3.9.0"`
- `main.js` → `const CURRENT_VERSION = '3.9.0'`

**Update checker** reads `latest.json` from this repo via the GitHub API. To notify users of a new version, update that file with the new version number and release notes after pushing a new build.

`node_modules/` and `dist/` are excluded from the repo via `.gitignore`.
