const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    fullscreen: true, // فرض وضع ملء الشاشة لمنع التشتت
    autoHideMenuBar: true, // إخفاء شريط القوائم
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true, // حماية أمنية
      devTools: false // تعطيل أدوات المطور لمنع الغش
    },
    icon: path.join(__dirname, 'icons', 'icon-512x512.png')
  });

  // إزالة القائمة العلوية بالكامل
  mainWindow.setMenu(null);

  // تحميل الصفحة الرئيسية للنظام
  mainWindow.loadFile('index.html');

  // منع الطالب من الخروج من وضع ملء الشاشة باستخدام Esc
  mainWindow.on('leave-full-screen', () => {
    mainWindow.setFullScreen(true);
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow();

  // منع اختصارات لوحة المفاتيح لإغلاق البرنامج أو فتح أدوات المطور (مثل Alt+F4, Ctrl+Shift+I)
  globalShortcut.register('CommandOrControl+Shift+I', () => {
    console.log('DevTools disabled');
  });
  globalShortcut.register('CommandOrControl+W', () => {
    console.log('Close tab disabled');
  });
  globalShortcut.register('F11', () => {
    console.log('Fullscreen toggle disabled');
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
