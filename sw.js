importScripts('/cache-polyfill.js');
self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open('airhorner2').then(function(cache) {	// MANUALLY configure the urls to be cached 
			return cache.addAll([
			'/',
			'/index.html',
			'/index.html?homescreen=1',
			'/?homescreen=1',
			'/styles/main.css',
			'/scripts/main.min.js',
			'/sounds/airhorn.mp3'
			]);
		})
	);
});
self.addEventListener('fetch', function(event) {
	console.log("fetching:", event.request.url);
	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	); 
});
