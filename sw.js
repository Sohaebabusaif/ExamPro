const CACHE_NAME = 'exampro-cache-v2';
const DYNAMIC_CACHE = 'exampro-dynamic-v2';

// الملفات الأساسية ليتم حفظها مسبقاً
const STATIC_ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './manifest.json'
];

// 1. التثبيت - حفظ الملفات الأساسية
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching offline page');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// 2. التفعيل - مسح الملفات القديمة
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== DYNAMIC_CACHE) {
            console.log('[Service Worker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 3. اعتراض الطلبات (Fetch)
self.addEventListener('fetch', (event) => {
  // للروابط الخارجية (CDNs) والملفات الأخرى
  event.respondWith(
    caches.match(event.request).then((cachedRes) => {
      // إذا كان الملف في الـ Cache، قم بإرجاعه فوراً
      if (cachedRes) {
        return cachedRes;
      }
      // إذا لم يكن في الـ Cache، اطلبه من الشبكة، ثم احفظه في הـ Dynamic Cache للوصول إليه لاحقاً بدون إنترنت
      return fetch(event.request).then((networkRes) => {
        return caches.open(DYNAMIC_CACHE).then((cache) => {
          // حفظ نسخة فقط إذا كان الطلب ناجحاً
          if (event.request.url.startsWith('http') && networkRes && networkRes.status === 200) {
            cache.put(event.request.url, networkRes.clone());
          }
          return networkRes;
        });
      }).catch(() => {
        // إذا فشل الاتصال ولم يكن الملف في الـ Cache (مثلاً لا يوجد نت)
        // يمكننا عرض صفحة بديلة أو فقط تجاهل الخطأ لأن التطبيق أساساً SPA (Single Page Application)
      });
    })
  );
});
