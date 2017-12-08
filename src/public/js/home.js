// Home page map, load js and css only on screens > 600px
(function() {
  var loaded = false;
  mapInit();
  window.addEventListener('resize', mapInit, false);

  function mapInit() {
    var screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var head = document.getElementsByTagName('head')[0];
    var body = document.getElementsByTagName('body')[0];
    if (screenWidth > 600 && loaded === false) {
      loaded = true;
      var leafletCss = document.createElement('link');
      leafletCss.rel = 'stylesheet';
      leafletCss.href = '/styles/vendor-css/leaflet-1.2.0/leaflet.css';
      head.appendChild(leafletCss);
      var leaflet = document.createElement('script');
      leaflet.type = 'text/javascript';
      leaflet.src = '/js/leaflet/leaflet-1.2.0/leaflet.js';
      body.appendChild(leaflet);

      leaflet.onload = function() {
        var map = L.map('leaflet-inner-container').setView([51.9615616, 5.6517542], 13);
        L.tileLayer('https://b.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        L.marker([51.9615616, 5.6517542]).addTo(map);
      }
    }
  }

  var moreButton = document.getElementById('more-button');
  moreButton.addEventListener('click', toggleMore, false);
  var introMore = document.getElementById('intro-more');
  introMore.style.display = 'none';

  function toggleMore() {
    console.log(introMore.style.display)
    moreButton.innerHTML = moreButton.innerHTML === 'Meer \u25BD' ? '\u25B3 Minder' : 'Meer \u25BD';
    if (introMore.style.display === 'none') {
      animateToggle(introMore, 1);
    } else {
      animateToggle(introMore, -1);
    }
  }

  var PANEL_ANIMATION_DELAY = 15; /*ms*/
  var PANEL_ANIMATION_STEPS = 10;

  function animateToggle(el, direction) {
    el.style.display = 'block';
    var contentHeight = el.offsetHeight;
    if (direction === 1) {
      el.style.height = '0px';
    }
    var stepHeight = contentHeight / PANEL_ANIMATION_STEPS;
    setTimeout(function() {
      animateStep(el, 1, stepHeight, direction);
    }, PANEL_ANIMATION_DELAY);
  }

  function animateStep(el, iteration, stepHeight, direction) {
    if (iteration < PANEL_ANIMATION_STEPS) {
      el.style.height = Math.round(((direction > 0) ? iteration : PANEL_ANIMATION_STEPS - iteration) * stepHeight) + "px";
      iteration++;
      setTimeout(function() {
        animateStep(el, iteration, stepHeight, direction);
      }, PANEL_ANIMATION_DELAY);
    } else {
      el.style.display = (direction < 0) ? 'none' : 'block';
      el.style.height = '';
    }
  }

})();