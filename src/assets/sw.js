/* eslint-disable no-undef */
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

if (workbox) {
  workbox.googleAnalytics.initialize();

  var defaultStrategy = workbox.strategies.networkFirst({
    cacheName: "fallback",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 128,
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true,
      }),
      new workbox.cacheableResponse.Plugin({
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
    workbox.strategies.networkFirst()
  );

  workbox.routing.registerRoute(
    new RegExp(/.*\.(?:png|jpg|jpeg|svg|gif|webp)/g),
    workbox.strategies.cacheFirst()
  );
} else {
  console.log(`No workbox on this browser 😬`);
}

