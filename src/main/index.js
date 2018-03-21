'use strict'

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const Menu = electron.Menu;

const path = require('path')
const formatUrl = require('url').format;

let mainWindow , widget;
let widgetShow = true;

const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)


function createMainWindow() {
  const screen = require("electron").screen;
  const size = screen.getPrimaryDisplay().workAreaSize;
  const widgetConfig = {
    // width:130,
    //  height:38,
    //  x:size.width - 100,
    //  y:size.height - 100,
    //  resizable:false,
    //  transparent: false,
    //  frame: false,
    //  minimizable: false,
    //  maximizable :false,
    //  closable:false,
     alwaysOnTop:true,
     show:true,
     backgroundColor:'#34495e'
  }
  const window = new BrowserWindow({width: 400, height: 400});
  const widget = new BrowserWindow(widgetConfig);
  widget.setAlwaysOnTop(true);
  widget.setSkipTaskbar(true);

  

  const widgetUrl = formatUrl({
    pathname: path.join(__dirname, '/../renderer/widget.html'),
    protocol: 'file:',
    slashes: true
  });
  if (isDevelopment) {
    window.webContents.openDevTools()
    widget.webContents.openDevTools()
  }

  if (true) {
    window.loadURL(`http://localhost:3000`)
    window.webContents.on('did-finish-load' , _=>{
      widget.loadURL(widgetUrl);
    })
  }
  else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }

  const label = app.getName();
//Template for the Menu
const template = [
  {
    label,
    submenu:[{
      label: `Show/Hide Widget`,
      click: () => {
        widgetShow = !widgetShow;
        if(widgetShow){
          show(widget);
        }else{
          hide(widget);
        }
        
      },
      role: 'widget'
    },
    {
      type:'separator'
    },
    {
      label:'Quit',
      click: _=> {
        app.quit();
        widget.destroy();
      },
      accelerator: 'Cmd+Q'
    }]
  }
];
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
  window.on('closed', () => {
    mainWindow = null
    widget.destroy();
  });
  widget.on('closed', function () {
    widget = null;
  })

  ipcMain.on("start" , (event, args)=>{
    console.log("received");
  })

  ipcMain.on("timer" , (event ,args)=>{
    widget.webContents.send("timer-start", args.start);
  });

  ipcMain.on("hide", (event)=>{
    widgetShow=!widgetShow;
    hide(widget);
  });

  ipcMain.on("timer-state-change" , (event, args)=>{
    window.webContents.send("timer-state-change" , args);
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
})


function hide(win){
  return win.hide();
}
function show(win){
  return win.show();
}