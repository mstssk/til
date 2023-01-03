const path = require("node:path");
const { app, BrowserWindow, screen } = require("electron");

const createWindow = () => {
  const primaryDisplay = screen.getPrimaryDisplay();

  const win = new BrowserWindow({
    width: 120,
    height: 120,
    x: 30,
    y: primaryDisplay.bounds.height - 150,
    frame: false,
    titleBarStyle: "customButtonsOnHover",
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.setWindowButtonVisibility(true);
  win.setVisibleOnAllWorkspaces(true, {
    visibleOnFullScreen: true,
    skipTransformProcessType: true,
  });
  win.loadFile("index.html");

  // デベロッパー ツールを開きます。
  // win.webContents.openDevTools();
};

// このメソッドは、Electron の初期化が完了し、
// ブラウザウインドウの作成準備ができたときに呼ばれます。
// 一部のAPIはこのイベントが発生した後にのみ利用できます。
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // macOS では、Dock アイコンのクリック時に他に開いているウインドウがない
    // 場合、アプリのウインドウを再作成するのが一般的です。
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// macOS を除き、全ウインドウが閉じられたときに終了します。 ユーザーが
// Cmd + Q で明示的に終了するまで、アプリケーションとそのメニューバーを
// アクティブにするのが一般的です。
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
