/////////////PDOK + Leaflet////////////////////

function draw() {
    "use strict";

    // Projectie Amersfoort RD new (met proj4js-compressed.js en proj4leaflet.js)
    var RD = new L.Proj.CRS.TMS(
            "EPSG:28992",
            "+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs", [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999], {
                resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420]
            }
        ),
        // Maak de kaart
        map = new L.Map("kaart-1", {
            continuousWorld: true,
            crs: RD,
            layers: [new L.TileLayer("https://geodata.nationaalgeoregister.nl/tiles/service/tms/1.0.0/brtachtergrondkaart/EPSG:28992@png8/{z}/{x}/{y}.png", {
                tms: true,
                minZoom: 2,
                maxZoom: 13,
                attribution: "Kaart: <a href='https://www.pdok.nl/'>PDOK</a> | <a href='https://www.kadaster.nl/'>Kadaster</a>, <a href='https://creativecommons.org/licenses/by/3.0/nl/'>CC BY 3.0 NL</a>",
                continuousWorld: true
            })],
            center: new L.LatLng(51.974, 5.6694),
            zoom: 9
        }),
        // Custom icon met label, m.b.v. plugin leaflet.label 
        myIcon = L.icon({
            iconUrl: "/styles/vendor-css/leaflet-0.7.3/images/marker-icon.png",
            iconAnchor: [12, 41],
            labelAnchor: [4, -22]
        }),
        // Layer voor JSON data, value moet bereikbaar zijn voor meerdere functies
        winkelsLayer,
        // Startpositie-button in kaart
        NewButton = L.Control.extend({
            options: {
                position: "bottomleft"
            },
            onAdd: function() {
                // create the control container with a particular class name
                var container = L.DomUtil.create("div", "button-startpositie"),
                    // ... initialize other DOM elements, add listeners, etc.
                    a = container.appendChild(document.createElement("a"));

                a.innerHTML = "Kaart terug naar startpositie";
                return container;
            }
        }),
        req = new XMLHttpRequest();

    // Verwijder Leaflet attributie
    map.attributionControl.setPrefix("");
    //Startpositie-button in kaart    
    map.addControl(new NewButton());

    //Functie om kaart en startpositie-button terug te zetten in startpositie
    function toStartPosition() {
        var startButton = document.getElementsByClassName("button-startpositie")[0];
        map.setView([51.974, 5.6694], 9);
        L.DomUtil.addClass(startButton, "disabled");
        startButton.removeEventListener("click", toStartPosition);
        map.addEventListener("move zoomstart", function() {
            L.DomUtil.removeClass(startButton, "disabled");
            startButton.addEventListener("click", toStartPosition);
        });
    }

    // Functie om data aan layer te koppelen en aan tekstdiv onder kaart
    function tekenJsonData(data) {

        var json = JSON.parse(data),
            selectmenu = document.getElementById("optionset-kaart-1");

        //Functie om tekst toe te voegen onder de kaart
        function addText(d, i) {
            var tekstdiv = document.getElementById("tekst-kaart-1").appendChild(document.createElement("div")),
                tekst = tekstdiv.appendChild(document.createElement("p"));

            tekstdiv.setAttribute("class", "tekstdiv");

            tekst.setAttribute("class", "p_winkels");
            tekst.innerHTML = (i + 1) + ". " + "<strong>" + d.properties.NAAM + "</strong>" + "<br />" + d.properties.ADRES + "<br />";

            var linkNaarKaart = tekst.appendChild(document.createElement("a"));
            linkNaarKaart.setAttribute("href", window.location.href.split('#')[0] + "#map-buttons");
            linkNaarKaart.innerHTML = "Toon op kaart";
            linkNaarKaart.addEventListener("click", function() {
                map.setView([d.geometry.coordinates[1], d.geometry.coordinates[0]], 11); /* x-coordinaat = d.geometry.coordinates[0]) en y-coördinaat = d.geometry.coordinates[1]) */
                winkelsLayer.getLayers()[i].openPopup();
            });
        }

        //Functie om indien van toepassing vorige tekst te verwijderen
        function removeText() {
            var myNode = document.getElementById("tekst-kaart-1");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
        }

        //start tekenen symbolen na selectie van winkelsoort
        selectmenu.onchange = function() {
            var selectedData = json.features.filter(function(d) {
                    if (d.properties.SOORT === selectmenu.value) {
                        return d;
                    }
                }),
                counter = 0;

            toStartPosition();

            if (winkelsLayer !== undefined) {
                map.removeLayer(winkelsLayer);
            }

            winkelsLayer = L.geoJson(selectedData, {
                pointToLayer: function(feature, latlng) {
                    counter += 1;
                    return L.marker(latlng, {
                            icon: myIcon
                        })
                        .bindPopup("<strong>" + feature.properties.NAAM + "</strong>" + "<br />" + feature.properties.ADRES)
                        .bindLabel(String(counter), {
                            noHide: true
                        });
                }
            }).addTo(map);

            //voeg tekst toe onder de kaart
            removeText();
            selectedData.forEach(function(d, i) {
                addText(d, i);
            });
        }; // Einde selectmenu.onchange  
    } // Einde tekenJsonData()

    // Haal JSON (Niet IE8) 
    req.open("GET", "/apps/locaties-op-de-kaart/locaties-op-de-kaart.geojson", true); //URL naar JSON
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            if (req.status === 200) {
                tekenJsonData(req.responseText); //HIER START TEKENEN JSON
            }
        }
    };
    req.send(null);

    toStartPosition();

} // Einde draw()

/////////////Google maps//////////////////

function draw_2() {
    "use strict";

    var myLatLing = new google.maps.LatLng(51.974, 5.6694),
        mapOptions = {
            center: myLatLing,
            zoom: 14,
            panControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            scaleControl: true
        },
        map = new google.maps.Map(document.getElementById("kaart-1"), mapOptions), //MAAK DE KAART
        controlDiv = document.createElement("div"), //div maken voor button'naar startpositie' in de kaart
        a = controlDiv.appendChild(document.createElement("a")),
        markersCollection, //waarde hiervan wordt bepaald in tekenJsonData() en moet bereikbaar zijn voor addText(),
        selectedData,
        infoWindow,
        req = new XMLHttpRequest();

    //Startpositie-button in kaart
    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(controlDiv);
    controlDiv.setAttribute("id", "button-startpositie-2");
    a.innerHTML = "Kaart terug naar startpositie";

    //Functie om kaart en startpositie-button terug in startpositie te zetten
    function toStartPosition() {
        map.setCenter(new google.maps.LatLng(51.974, 5.6694));
        map.setZoom(14);
        controlDiv.setAttribute("class", "disabled");
        controlDiv.removeEventListener("click", toStartPosition);

        google.maps.event.addListener(map, 'center_changed', function() {
            controlDiv.className = "";
            controlDiv.addEventListener("click", toStartPosition);
        });
        google.maps.event.addListener(map, 'zoom_changed', function() {
            controlDiv.className = "";
            controlDiv.addEventListener("click", toStartPosition);
        });
    }

    //Functie voor aan de slag met jsondata op basis van menukeuze
    function tekenJsonData(data) {
        var json = JSON.parse(data),
            selectmenu = document.getElementById("optionset-kaart-1");

        //voeg tekst toe onder de kaart, wordt aangeroepen in selectmenu.onchange
        function addText(d, i) {
            var tekstdiv = document.getElementById("tekst-kaart-1").appendChild(document.createElement("div")),
                tekst = tekstdiv.appendChild(document.createElement("p"));

            tekstdiv.setAttribute("class", "tekstdiv");

            tekst.setAttribute("class", "p_winkels");
            tekst.innerHTML = (i + 1) + ". " + "<strong>" + d.properties.NAAM + "</strong>" + "<br />" + d.properties.ADRES + "<br />";

            var linkNaarKaart = tekst.appendChild(document.createElement("a"));
            linkNaarKaart.setAttribute("href", window.location.href.split('#')[0] + "#map-buttons");
            linkNaarKaart.innerHTML = "Toon op kaart";
            linkNaarKaart.addEventListener("click", function() {
                map.setCenter(new google.maps.LatLng(d.geometry.coordinates[1], d.geometry.coordinates[0])); //x-coordinaat = d.geometry.coordinates[0]) en y-coördinaat = d.geometry.coordinates[1])
                map.setZoom(16);
                infoWindow.close();
                var infoWindowContent = "<div class='infowindow-htmldiv'><strong>" + selectedData[i].properties.NAAM + "</strong>" + "<br />" + selectedData[i].properties.ADRES +
                    "</div>";
                infoWindow = new google.maps.InfoWindow({
                    content: infoWindowContent
                });
                infoWindow.open(map, markersCollection[i]);
            });
        }

        //verwijder indien van toepassing vorige tekst, wordt aangeroepen in selectmenu.onchange
        function removeText() {
            var myNode = document.getElementById("tekst-kaart-1");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
        }

        selectmenu.onchange = function() {

            selectedData = json.features.filter(function(d) {
                if (d.properties.SOORT === selectmenu.value) {
                    return d;
                }
            });

            infoWindow = new google.maps.InfoWindow({
                content: ""
            });

            toStartPosition();

            //verwijder bestaande markers      
            if (markersCollection !== undefined) {
                while (markersCollection.length > 0) {
                    markersCollection[markersCollection.length - 1].setMap(null); //verwijderen markers van de kaart: markerobject.setMap(null)
                    markersCollection.pop(); //verwijderen uit markersCollection
                }
            }

            //teken de nieuwe markers
            markersCollection = selectedData.map(function(feature, i) {
                var myLatlng = new google.maps.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
                return new MarkerWithLabel({
                    position: myLatlng,
                    map: map,
                    labelContent: String(i + 1),
                    labelAnchor: new google.maps.Point(-9, 40),
                    labelClass: "labels" // the CSS class for the label
                });
            });

            //voeg eventlisterers toe aan markers
            markersCollection.forEach(function(marker, i) {
                google.maps.event.addListener(marker, 'click', function() {
                    infoWindow.close();
                    infoWindow = new google.maps.InfoWindow({
                        content: "<div class='infowindow-htmldiv'><strong>" + selectedData[i].properties.NAAM + "</strong>" + "<br />" +
                        selectedData[i].properties.ADRES + "</div>"
                    });
                    infoWindow.open(map, marker);
                });
            });

            //voeg tekst toe onder de kaart
            removeText();
            selectedData.forEach(function(d, i) {
                addText(d, i);
            });
        }; // einde selectmenu.onchange

    } //einde tekenJsonData()

    // Haal JSON
    req.open("GET", "/apps/locaties-op-de-kaart/locaties-op-de-kaart.geojson", true); //URL naar JSON
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            if (req.status === 200) {
                tekenJsonData(req.responseText); //HIER START TEKENEN JSON
            }
        }
    };
    req.send(null);

    toStartPosition();

} //einde draw_2()

////////////////////////////////////////

// Switchen tussen Google Maps en Leaflet kaart
function refreshKaartDiv() {
    "use strict";
    var kaartDiv = document.getElementById("kaart-1"),
        kaartDivParent = kaartDiv.parentNode,
        myNode = document.getElementById("tekst-kaart-1");

    kaartDivParent.removeChild(kaartDiv);
    kaartDiv = kaartDivParent.appendChild(document.createElement("div"));
    kaartDiv.setAttribute("id", "kaart-1");
    document.getElementById("optionset-kaart-1").selectedIndex = 0;
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

window.onload = function() {
    "use strict";
    document.getElementById("optionset-kaart-1")[0].selected = true;
    draw();

    document.getElementById("button-leaflet").onclick = function() {
        refreshKaartDiv();
        draw();
        this.setAttribute("class", "");
        document.getElementById("button-google").setAttribute("class", "unselected");
    };

    document.getElementById("button-google").onclick = function() {
        refreshKaartDiv();
        draw_2();
        this.setAttribute("class", "");
        document.getElementById("button-leaflet").setAttribute("class", "unselected");
    };
};