// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { TODO } from './services/Database.service';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  insertTODO: (todo: TODO) => ipcRenderer.invoke('todo:insert', todo),
  deleteTODO: (id: number) => ipcRenderer.invoke('todo:delete', id),
  getAllTODO: () => ipcRenderer.invoke('todo:getAll'),
  getOneTODO: (id: number) => ipcRenderer.invoke('todo:getOne', id),
  updateTODO: (todo: TODO) => ipcRenderer.invoke('todo:update', todo),
  queryDatabase: async (sqlQuery: string, params: any[]): Promise<any[]> => {
    return await ipcRenderer.invoke('db-query', sqlQuery, params);
  },
  insertData: async (sqlQuery: string, params: any[]): Promise<number> => {
    return await ipcRenderer.invoke('db-insert', sqlQuery, params);
  },
  updateData: async (sqlQuery: string, params: any[]): Promise<number> => {
    return await ipcRenderer.invoke('db-update', sqlQuery, params);
  },
  deleteData: async (sqlQuery: string, params: any[]): Promise<number> => {
    return await ipcRenderer.invoke('db-delete', sqlQuery, params);
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
