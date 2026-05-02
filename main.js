const { app, BrowserWindow, Menu, shell, dialog } = require('electron')
const path = require('path')
const https = require('https')
const fs = require('fs')
const os = require('os')

const CURRENT_VERSION = '3.6.0'

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 900,
    minWidth: 960,
    minHeight: 640,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    title: 'FIRE Calculator',
    icon: path.join(__dirname, 'src', 'icon.ico'),
    backgroundColor: '#ffffff',
    show: false
  })

  win.loadFile(path.join(__dirname, 'src', 'index.html'))
  win.once('ready-to-show', () => {
    win.show()
    checkForUpdates(win, false)
  })

  return win
}

function downloadAndInstall(win, downloadUrl, version) {
  const tmpPath = path.join(os.tmpdir(), `FIRE-Calculator-Setup-${version}.exe`)
  dialog.showMessageBox(win, {
    type: 'info',
    title: 'Downloading update...',
    message: `Downloading v${version}, please wait.`,
    detail: 'The installer will launch automatically when ready.',
    buttons: ['OK']
  })

  const file = fs.createWriteStream(tmpPath)
  const doDownload = (url, hops) => {
    if (hops > 10) return
    https.get(url, { headers: { 'User-Agent': 'FIRE-Calculator/'+version } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        doDownload(res.headers.location, hops + 1)
        return
      }
      res.pipe(file)
      file.on('finish', () => file.close(() => {
        shell.openPath(tmpPath).then(() => setTimeout(() => app.quit(), 1500))
      }))
    }).on('error', err => {
      fs.unlink(tmpPath, () => {})
      dialog.showMessageBox(win, { type: 'warning', title: 'Download failed', message: err.message, buttons: ['OK'] })
    })
  }
  doDownload(downloadUrl, 0)
}

function checkForUpdates(win, manual) {
  // Use GitHub API — returns JSON with base64-encoded file content
  const options = {
    hostname: 'api.github.com',
    path: '/repos/robavio/fire-calculator-releases/contents/latest.json',
    method: 'GET',
    headers: {
      'User-Agent': 'FIRE-Calculator-App',
      'Accept': 'application/vnd.github.v3+json'
    }
  }

  const req = https.request(options, (res) => {
    let raw = ''
    res.on('data', chunk => raw += chunk)
    res.on('end', () => {
      try {
        if (res.statusCode !== 200) {
          throw new Error(`GitHub API returned status ${res.statusCode}`)
        }
        const apiResp = JSON.parse(raw)
        if (!apiResp.content) throw new Error('No content field in API response')
        // GitHub returns content as base64 with newlines — strip them before decoding
        const decoded = Buffer.from(apiResp.content.replace(/\n/g, ''), 'base64').toString('utf8')
        const info = JSON.parse(decoded)
        if (!info || !info.version) throw new Error('Invalid version file')

        if (info.version !== CURRENT_VERSION) {
          dialog.showMessageBox(win, {
            type: 'info',
            title: 'Update available',
            message: `Version ${info.version} is available`,
            detail: `You have v${CURRENT_VERSION}.\n\n${info.notes || 'A new version is ready.'}\n\nUpdate now? The app will close and relaunch automatically.`,
            buttons: ['Update now', 'Later'],
            defaultId: 0,
            cancelId: 1
          }).then(result => {
            if (result.response === 0) {
              downloadAndInstall(win, info.downloadUrl || info.url, info.version)
            }
          })
        } else if (manual) {
          dialog.showMessageBox(win, {
            type: 'info',
            title: 'Up to date',
            message: `You are running the latest version (v${CURRENT_VERSION}).`,
            buttons: ['OK']
          })
        }
      } catch (e) {
        if (manual) {
          dialog.showMessageBox(win, {
            type: 'warning',
            title: 'Update check failed',
            message: 'Could not read update information.',
            detail: e.message,
            buttons: ['OK']
          })
        }
      }
    })
  })

  req.on('error', err => {
    if (manual) {
      dialog.showMessageBox(win, {
        type: 'warning',
        title: 'Update check failed',
        message: 'Could not reach the update server.',
        detail: err.message,
        buttons: ['OK']
      })
    }
  })

  req.end()
}

app.whenReady().then(() => {
  const win = createWindow()
  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        { role: 'reload', label: 'Reload' },
        { type: 'separator' },
        { role: 'quit', label: 'Exit' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'zoomIn', label: 'Zoom in', accelerator: 'CmdOrCtrl+=' },
        { role: 'zoomOut', label: 'Zoom out' },
        { role: 'resetZoom', label: 'Reset zoom' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Full screen' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        { label: 'Check for updates', click: () => checkForUpdates(win, true) },
        { type: 'separator' },
        { label: `Version ${CURRENT_VERSION}`, enabled: false }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)
})

app.on('window-all-closed', () => app.quit())
