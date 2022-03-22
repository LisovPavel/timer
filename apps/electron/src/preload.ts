import { contextBridge, ipcRenderer }  from 'electron';

contextBridge.exposeInMainWorld('electronApi', {
    setTitle: (title: string) => ipcRenderer.send('set-title', title),
})

export {}
