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
        var map = L.map('leaflet-inner-container', {attributionControl: false}).setView([51.9615616, 5.6517542], 13);
        L.control.attribution({prefix: ''}).addTo(map);
        L.tileLayer('https://b.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy;<a href="http://osm.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        L.marker([51.9615616, 5.6517542]).addTo(map);
      };
    }
  }

// Home page, animated collapsable content
  var moreButton = document.getElementById('more-button');
  var introMore = document.getElementById('intro-more');
  moreButton.addEventListener("click", function() {
    this.classList.toggle("active");
    var content = introMore;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      moreButton.innerHTML = 'Meer \u25BD';
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      moreButton.innerHTML = 'Minder \u25B3';
    }
  });

})();