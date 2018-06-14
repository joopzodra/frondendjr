importScripts("/apps/dagelijks-vers/precache-manifest.12a44e89263e2fbda5565c11e3ce277c.js", "https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

/* eslint-disable */

workbox.core.setCacheNameDetails({
  prefix: 'dagvers',
  suffix: 'v1'
});

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

workbox.routing.registerNavigationRoute('/apps/dagelijks-vers/index.html');

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'dagvers-images',
    plugins: [
    new workbox.expiration.Plugin({
      maxEntries: 60,
        maxAgeSeconds: 2592000, // 30 * 24 * 60 * 60 = 30 Days
      }),
    ],
  }),
  );

if ('BroadcastChannel' in self) {
  workbox.routing.registerRoute(
    /https:\/\/frontendjr\.nl\/gedichtenDb\/fragments.*$/,
    workbox.strategies.staleWhileRevalidate({
      plugins: [
        new workbox.broadcastUpdate.Plugin('fragments-updates')
      ]
    })
    )
} else {
  workbox.routing.registerRoute(
    /https:\/\/frontendjr\.nl\/gedichtenDb\/fragments.*$/,
    workbox.strategies.networkFirst()
    )  
}

