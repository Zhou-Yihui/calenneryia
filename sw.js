// 零依赖 ServiceWorker
const CACHE = 'mh-cal-v1';
const ICON = '/1764750842575.png';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll([
      '/','/index.html','/manifest.json','/1764750842575.png'
    ]))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

// 新太辰日提醒（58 h 自动）
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  self.registration.showNotification(data.title || '新太辰日到达', {
    body: data.body || '今天是新太辰日',
    icon: ICON,
    tag: 'new-day',
    timestamp: data.timestamp || Date.now()
  });
});
