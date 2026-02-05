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
    fullscreen: true,
    autoHideMenuBar: true,
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

ipcMain.handle('print-receipt', async (event, receiptHTML) => {
  return new Promise((resolve, reject) => {
    const printWindow = new BrowserWindow({
      width: 302,  // 80mm ≈ 302px at 96 DPI
      height: 600,
      show: false,
      webPreferences: {
        nodeIntegration: false,
      },
    })

    // Load the receipt HTML
    printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(receiptHTML)}`)

    printWindow.webContents.once('did-finish-load', async () => {
      try {
        const printers = await printWindow.webContents.getPrintersAsync()
        const deviceName =
          printers.find((printer) => printer.isDefault)?.name || undefined

        const printOptions = {
          silent: true,
          printBackground: true,
          deviceName,
          margins: {
            marginType: 'none',
          },
          pageSize: {
            width: 80000,
            height: 327600,
          },
          scaleFactor: 100,
        }

        printWindow.webContents.print(printOptions, (success, errorType) => {
          // Close the print window after printing
          setTimeout(() => {
            printWindow.close()
          }, 100)

          if (success) {
            resolve(true)
          } else {
            reject(new Error(errorType || 'Print failed'))
          }
        })
      } catch (error) {
        printWindow.close()
        reject(error)
      }
    })

    printWindow.webContents.once('did-fail-load', () => {
      printWindow.close()
      reject(new Error('Failed to load receipt HTML'))
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