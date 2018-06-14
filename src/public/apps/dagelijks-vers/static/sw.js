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

const broadcastFeatureDetector = () => {
  if ('BroadcastChannel' in self) {
    return workbox.strategies.staleWhileRevalidate({
      plugins: [
      new workbox.broadcastUpdate.Plugin('fragments-updates')
      ]
    });
  } else {
    return workbox.strategies.networkFirst();
  }
};

workbox.routing.registerRoute(
  /https:\/\/frontendjr\.nl\/gedichtenDb\/fragments.*$/,
  broadcastFeatureDetector
  )
