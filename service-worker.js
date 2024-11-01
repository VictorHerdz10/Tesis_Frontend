// service-worker.js
// File: service-worker.js

self.addEventListener('push', event => {
  const data = event.data.json();
  let icon='/public/icon/icon1.png';
  if(data.icon=='caducacion'&& data.badge=='caducacion'){
    icon='/public/icon/caducar.png';
  }
  if(data.icon=='presupuesto'&& data.badge=='presupuesto'){
    icon='/public/icon/bajor.png';
  }
  console.log(icon,badge);
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: icon,
    actions: data.actions,
    data: data.data
  });
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'ver') {
    clients.matchAll().then(clients => {
      if (clients.length >= 1) {
        return clients[0].focus();
      }
      self.clients.openWindow(data.url);
    });
  }
});

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/script.js'
      ]);
    })
  );
});