/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import Database from 'better-sqlite3';

import {
  deleteTODO,
  getAllTODO,
  getOneTODO,
  insertTODO,
  updateTODO,
  TODO,
} from './services/Database.service';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    ipcMain.handle('todo:insert', async (_, todo: TODO) => {
      insertTODO(todo);
    });
    ipcMain.handle('todo:update', async (_, todo: TODO) => {
      updateTODO(todo);
    });
    ipcMain.handle('todo:delete', async (_, id: number) => {
      deleteTODO(id);
    });
    ipcMain.handle('todo:getOne', async (_, id: number) => {
      return getOneTODO(id);
    });
    ipcMain.handle('todo:getAll', async () => {
      return getAllTODO();
    });
    ipcMain.handle('db-query', (event, sqlQuery: string, params: any[]) => {
      const db = new Database(
        path.join(__dirname, '../../', 'release/app', 'database.db'),
        { verbose: console.log, fileMustExist: true },
      );
      try {
        const stmt = db.prepare(sqlQuery);
        const result = stmt.all(params);
        return result;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        db.close();
      }
    });
    ipcMain.handle('db-insert', (event, sqlQuery: string, params: any[]) => {
      const db = new Database('database.db', { verbose: console.log });
      try {
        const stmt = db.prepare(sqlQuery);
        const result = stmt.run(params);
        return result.lastInsertRowid;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        db.close();
      }
    });

    // Update data (UPDATE)
    ipcMain.handle('db-update', (event, sqlQuery: string, params: any[]) => {
      const db = new Database('database.db', { verbose: console.log });
      try {
        const stmt = db.prepare(sqlQuery);
        const result = stmt.run(params);
        return result.changes; // number of rows updated
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        db.close();
      }
    });

    // Delete data (DELETE)
    ipcMain.handle('db-delete', (event, sqlQuery: string, params: any[]) => {
      const db = new Database('database.db', { verbose: console.log });
      try {
        const stmt = db.prepare(sqlQuery);
        const result = stmt.run(params);
        return result.changes; // number of rows deleted
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        db.close();
      }
    });
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })

  .catch(console.log);
