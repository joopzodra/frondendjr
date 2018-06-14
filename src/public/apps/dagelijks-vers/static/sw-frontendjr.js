/* eslint-disable */
/* v1 */

workbox.setConfig({debug: true})
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

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
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  /https:\/\/frontendjr\.nl\/gedichtenDb\/fragments.*$/,
  workbox.strategies.networkFirst()
  )
/*
  In /config/index.js: changed  assetsSubDirectory from 'static' to ''. Now sw.js (and other static files) is served from localhost:8080/sw.js instead from localhost:8080/static/sw.js. This is necessary because the scope of the serviceworker is relative to the script URL.

  In webpack.dev.conf.js add a plugin:
  new WorkboxPlugin.InjectManifest({
      swSrc: path.resolve(__dirname, '../static/sw.js'),
    })
  See: https://developers.google.com/web/tools/workbox/guides/precache-files/webpack

  Optionally disable debug logging: workbox.setConfig({debug: false})
 */