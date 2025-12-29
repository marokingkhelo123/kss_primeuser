import { app, BrowserWindow, shell, ipcMain } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isDev = !app.isPackaged
const devServerURL = process.env.ELECTRON_DEV_SERVER_URL || 'http://localhost:3001'

const createWindow = () => {
  const preloadPath = path.join(__dirname, 'preload.js')

  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1200,
    minHeight: 800,
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: preloadPath,
    },
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  if (isDev) {
    mainWindow.loadURL(devServerURL)
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  } else {
    const indexPath = path.join(__dirname, '..', 'dist', 'index.html')
    mainWindow.loadFile(indexPath)
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) {
      shell.openExternal(url)
    }
    return { action: 'deny' }
  })
}

ipcMain.handle('print-current', async (event, options = {}) => {
  const contents = event.sender
  const printers = await contents.getPrintersAsync()
  const deviceName =
    options.deviceName ||
    printers.find((printer) => printer.isDefault)?.name ||
    undefined

  const printOptions = {
    silent: true,
    printBackground: true,
    deviceName,
    ...options,
  }

  return new Promise((resolve, reject) => {
    contents.print(printOptions, (success, errorType) => {
      if (success) {
        resolve(true)
      } else {
        reject(new Error(errorType || 'Print failed'))
      }
    })
  })
})

app.whenReady().then(() => {
  app.setAppUserModelId('com.kssdesktop.primeuser')
  createWindow()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

