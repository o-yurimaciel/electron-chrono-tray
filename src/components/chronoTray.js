const { Tray, Menu, app } = require('electron');

const contextMenu = Menu.buildFromTemplate([
  {
    label: 'Sair',
    click: () => {
      app.quit();
    },
  },
]);

class ChronoTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);
    this.on('click', this.onClick.bind(this));
    this.mainWindow = mainWindow;
    this.setToolTip('ChronoTray');
    this.setContextMenu(contextMenu);
  }

  onClick(event, bounds) {
    const { x, y } = bounds;
    const { width, height } = this.mainWindow.getBounds();

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      this.mainWindow.setBounds({
        x: x >= 400 ? x - Math.floor(width / 2) : x,
        y: y >= 300 ? y - 40 - Math.floor(height / 2) : y,
        width,
        height,
      });
      this.mainWindow.show();
    }
  }
}

module.exports = ChronoTray;
