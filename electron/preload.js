import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  printCurrent: (options) => ipcRenderer.invoke('print-current', options),
})

