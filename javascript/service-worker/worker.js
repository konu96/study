const CACHE_NAME = 'test-cache';

self.addEventListener('install', () => {
  console.log('ServiceWorker installed!!')
  caches.open(CACHE_NAME).then(cache => cache.add('./dog.jpg'));
});

self.addEventListener('fetch', event => {
  if (event.request.url !== 'http://localhost:8080' && !event.request.url.includes('index.ts')) {
    event.respondWith(new Response('Hello!!!'));
  }
});
