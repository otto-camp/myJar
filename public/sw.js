/* eslint-disable no-undef */
self.importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

if (workbox) {
  workbox.googleAnalytics.initialize();

  var defaultStrategy = new workbox.strategies.NetworkFirst({
    cacheName: "fallback",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true,
      }),
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200]
      }),
    ],
  });
  workbox.routing.setDefaultHandler(
    (args) => {
      if (args.event.request.method === 'GET') {
        return defaultStrategy.handle(args);
      } else {
        return null
      }
    }
  );

  workbox.routing.registerRoute(
    new RegExp(/.*\.(?:js|css)/g),
    new workbox.strategies.NetworkFirst()
  );

  workbox.routing.registerRoute(
    new RegExp(/.*\.(?:png|jpg|jpeg|svg|gif|webp)/g),
    new workbox.strategies.CacheFirst()
  );
} else {
  console.log(`No workbox on this browser 😬`);
}

