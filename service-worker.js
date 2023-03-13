var cacheName = 'v1';
var cacheFiles = [
    '/',
    '/index.html',
    '/css/main.css',
    '/js/lessons.js',
    '/img',
    '/randymart.webmanifest',
];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Installed');

    // e.waitUntil Delays the event until the Promise is resolved
    e.waitUntil(
        // Open the cache
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching cacheFiles');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    // e.respondWidth Responds to the fetch event
    e.respondWith(
        // Check in cache for the request being made
        caches.match(e.request).then(function(response) {
            // If the request is in the cache
                console.log("[ServiceWorker] Found in Cache", e.request.url, response);
                // Return the cached version
                return response || fetch(e.request).then(function(response) {
                    // response may be used only once
                    return caches.open(cacheName).then(function(cache) {
                        cache.put(e.request.url, response.clone());
                        return response;
                    });
                });
            })
    );
});