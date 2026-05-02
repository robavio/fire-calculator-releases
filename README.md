# FIRE Calculator — Windows App

## First time setup (do this once)

### Step 1 — Install Node.js
1. Go to https://nodejs.org
2. Download the **LTS** version (the left button)
3. Run the installer, click Next through everything
4. Restart your computer after it finishes

### Step 2 — Get the project files
Either download this folder as a ZIP, or just make sure you have:
```
fire-app/
  main.js
  package.json
  src/
    index.html
    icon.ico
```

### Step 3 — Open a terminal in the project folder
1. Open File Explorer and navigate to the `fire-app` folder
2. Click the address bar at the top, type `cmd` and press Enter
3. A black terminal window will open

### Step 4 — Install dependencies
In the terminal, type exactly:
```
npm install
```
Wait for it to finish (may take 1-2 minutes, will download ~200MB)

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
- `FIRE Calculator Setup 1.0.0.exe` — the installer you can share and run on any Windows PC

---

## Running the app (after building)
Just double-click `FIRE Calculator Setup 1.0.0.exe` to install it.
It will appear in your Start Menu and on your Desktop.

---

## Updating the app (how future updates work)

When we add new features together in Claude:

1. Claude gives you a new `src/index.html` file (or sometimes `main.js`)
2. You replace the old file with the new one in this folder
3. Open the terminal in the `fire-app` folder and run:
   ```
   npm run build
   ```
4. A new `.exe` will appear in the `dist` folder
5. Run the new installer — it will update the existing installation

### Version numbers
When we add a new feature, update the version in two places:
- `package.json` — change `"version": "1.0.0"` to e.g. `"1.1.0"`
- `main.js` — change `const CURRENT_VERSION = '1.0.0'` to match

---

## Optional: Automatic update notifications
The app includes an update checker under Help > Check for updates.
To enable this properly, you would need a free GitHub account:
1. Create a repo called `fire-calculator-releases`
2. Add a file called `latest.json` with this format:
   ```json
   {
     "version": "1.1.0",
     "notes": "Added salary-linked deposits",
     "url": "https://github.com/YOUR_USERNAME/fire-calculator-releases/releases"
   }
   ```
3. In `main.js`, replace `YOUR_GITHUB_USERNAME` with your actual GitHub username
4. When you update the app, update this JSON file too
5. Users will see a notification popup when they open the app

If you don't want to set up GitHub, the app still works perfectly —
the update checker just won't notify anyone automatically.
