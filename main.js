const { app, BrowserWindow } = require("electron");
// include the Node.js 'path' module at the top of your file
const path = require("node:path");

const createWindow = () => {
  let mainWindow = null;
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webviewTag: true,
      // nodeIntegration: false,
      // contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  var html = [
    "<body>",
    "<button id='getData'>Show teams and scores</button>",
    "<div id='scoreboard'>",
    "<div style='display:flex; gap:20px'><span>Команда 1</span><span>Счет 1</span></div>",
    "<div style='display:flex; gap:20px'><span>Команда 2</span><span>Счет 2</span></div>",
    "</div>",
    "<webview id='webview' src='https://www.fon.bet/live' style='display:inline-flex; width:100%; height:400px'>",
    "</body>",
  ].join("");
  //   Загрузка удаленного URL
  // mainWindow.loadURL("https://fon.bet./live");
  mainWindow.loadURL("data:text/html;charset=utf-8," + encodeURI(html));
  mainWindow.openDevTools();
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
  // Загрузка локального HTML файла
    // mainWindow.loadFile("index.html");
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
