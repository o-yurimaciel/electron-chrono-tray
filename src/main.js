const { app, BrowserWindow, ipcMain } = require('electron');

const ChronoTray = require('./components/chronoTray');

let mainWindow;
let tray;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    height: 160,
    width: 350,
    frame: false,
    resizable: false,
    show: false,
    skipTaskbar: true,
  });

  tray = new ChronoTray('assets/robotTemplate.png', mainWindow);

  mainWindow.loadFile('index.html');

  mainWindow.on('blur', () => {
    setTimeout(() => {
      mainWindow.hide();
    }, 200);
  });
});

ipcMain.on('timeUpdate', (event, timeUpdate) => {
  if (process.platform === 'darwin') {
    tray.setTitle(timeUpdate);
  } else {
    // tray.setTooltip(timeUpdate);
  }
});
