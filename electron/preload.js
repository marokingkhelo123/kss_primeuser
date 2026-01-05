const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  printCurrent: (options) => ipcRenderer.invoke('print-current', options),
  printReceipt: (receiptHTML) => ipcRenderer.invoke('print-receipt', receiptHTML),
})

