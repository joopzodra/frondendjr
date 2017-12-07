/////////////////////////////////////////////
function draw() {

    /*zet de svg op */

    var w = 599,
        h = 350,
        center = [5.6995, 51.90825], // center = [8.4, 51.6],
        scale = 90000, //scale = 3500,
        margin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        duration_style = 2000,
        duration_shape = 2500,
        geul,
        path_geul_smal,
        path_geul_breed;


    var xym = d3.geo.mercator()
        .center(center)
        .scale(scale);
    path = d3.geo.path().projection(xym);

    var svg = d3.select("#dataviz").append("svg")
        .attr("viewBox", "0 0 " + w + " " + h)
        /*.attr("preserveAspectRatio", "xMinYMin meet")*/
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .append("g").attr("id", "kaart");

    /////////////////////////////////////////////////////
    /*haal data en start met kaart tekenen als die geladen is */

    var json1, json2, json3, json4, json5, json6, json7, json8, json9;
    var remaining = 3;

    d3.json("/apps/uiterwaarden/data/geulen-smal.geojson", function(error, json) {
        json1 = json;
        if (!--remaining) start();
    });

    d3.json("/apps/uiterwaarden/data/geulen-breed.geojson", function(error, json) {
        json2 = json;
        if (!--remaining) start();
    });

    d3.json("/apps/uiterwaarden/data/uiterwaarden.json", function(error, json) {
        json3 = topojson.feature(json, json.objects["buitendijks-en-water"]);
        json4 = topojson.feature(json, json.objects.hoogwater);
        json5 = topojson.feature(json, json.objects["wegen-spoor"]);
        json6 = topojson.feature(json, json.objects.plaatsnamen);
        json7 = topojson.feature(json, json.objects["rivieren-WatercrsL"]);
        json8 = topojson.feature(json, json.objects.NL);
        json9 = topojson.feature(json, json.objects.schaal);

        if (!--remaining) start();

    });

    function start() {

        var path_huis = path(json3.features.filter(function(fObj) {
                return fObj.properties.OMSCHRIJVI === "huis";
            })[0]),
            path_bos = path(json3.features.filter(function(fObj) {
                return fObj.properties.OMSCHRIJVI === "bos";
            })[0]),
            path_wei = path(json3.features.filter(function(fObj) {
                return fObj.properties.OMSCHRIJVI === "wei";
            })[0]),
            path_water = path(json3.features.filter(function(fObj) {
                return fObj.properties.OMSCHRIJVI === "water";
            })[0]),
            path_rivier = path(json3.features.filter(function(fObj) {
                return fObj.properties.OMSCHRIJVI === "rivier";
            })[0]);

        var path_hoogwater = path(json4);

        path_geul_smal = path(json1);
        path_geul_breed = path(json2);

        var path_spoor = path(json5.features.filter(function(fObj) {
                return fObj.properties.OMSCHRIJVI === "spoor";
            })[0]),
            path_snelweg = path(json5.features.filter(function(fObj) {
                return fObj.properties.OMSCHRIJVI === "snelweg";
            })[0]),
            path_regioweg = path(json5.features.filter(function(fObj) {
                return fObj.properties.OMSCHRIJVI === "regioweg";
            })[0]),
            path_doorgaande_weg = path(json5.features.filter(function(fObj) {
                return fObj.properties.OMSCHRIJVI === "doorgaande-weg";
            })[0]);

        var plaatsnamen_features = json6.features.filter(function(fObj) {
            return fObj.properties.type === "show";
        });

        var path_rivierenNL = path(json7);

        var path_NL = path(json8);

        var path_schaal = path(json9);

        var NL = svg.append("path")
            .attr("d", path_NL)
            .style("fill", "#ccc")
            .style("stroke", "none")
            .style("stroke-width", 0);

        var rivierenNL = svg.append("path")
            .attr("d", path_rivierenNL)
            .style("fill", "none")
            .style("stroke", "rgb(0,0,0)")
            .style("stroke-width", 5);

        var hoogwater = svg.append("path")
            .attr("d", path_hoogwater)
            .style("fill", "rgb(223,240,193)") //zelfde kleur als wei
            .style("stroke", "rgb(223,240,193)")
            .style("stroke-width", 1);

        geul = svg.append("path")
            .attr("d", path_geul_smal)
            .style("fill", "rgb(124,181,218)")
            .style("fill-opacity", 0.5)
            .style("stroke", "#000")
            .style("stroke-width", 0);

        var wei = svg.append("path")
            .attr("d", path_wei)
            .style("fill", "rgb(223,240,193)")
            .style("stroke", "none")
            .style("stroke-width", 0);

        var water = svg.append("path")
            .attr("d", path_water)
            .style("fill", "rgb(124,181,218)")
            .style("stroke", "#000")
            .style("stroke-width", 0);

        var huis = svg.append("path")
            .attr("d", path_huis)
            .style("fill", "rgb(189,120,93)")
            .style("stroke", "#000")
            .style("stroke-width", 0);

        var bos = svg.append("path")
            .attr("d", path_bos)
            .style("fill", "rgb(101,184,68)")
            .style("stroke", "#000")
            .style("stroke-width", 0);

        var rivier = svg.append("path")
            .attr("d", path_rivier)
            .style("fill", "rgb(124,181,218)")
            .style("stroke", "#000")
            .style("stroke-width", 0);

        var spoor1 = svg.append("path")
            .attr("d", path_spoor)
            .style("fill", "none")
            .style("stroke", "#000")
            .style("stroke-width", 2);

        var spoor2 = svg.append("path")
            .attr("d", path_spoor)
            .style("fill", "none")
            .style("stroke", "#fff")
            .style("stroke-width", 1.3)
            .style("stroke-dasharray", "7, 5");

        var snelweg = svg.append("path")
            .attr("d", path_snelweg)
            .style("fill", "none")
            .style("stroke", "rgb(168,168,168)")
            .style("stroke-width", 2.5);

        var regioweg = svg.append("path")
            .attr("d", path_regioweg)
            .style("fill", "none")
            .style("stroke", "rgb(168,168,168)")
            .style("stroke-width", 1.5);

        var doorgaande_weg = svg.append("path")
            .attr("d", path_doorgaande_weg)
            .style("fill", "none")
            .style("stroke", "rgb(168,168,168)")
            .style("stroke-width", 0.5);

        var plaatsnamen1 = svg.selectAll(".plaatsnamen-onder")
            .data(plaatsnamen_features)
            .enter().append("text")
            .attr("class", "plaatsnamen-onder")
            .attr("x", function(d) {
                return path.centroid(d)[0];
            })
            .attr("y", function(d) {
                return path.centroid(d)[1];
            })
            .text(function(d) {
                return d.properties.name.toUpperCase();
            });

        var plaatsnamen2 = svg.selectAll(".plaatsnamen-boven")
            .data(plaatsnamen_features)
            .enter().append("text")
            .attr("class", "plaatsnamen-boven")
            .attr("x", function(d) {
                return path.centroid(d)[0];
            })
            .attr("y", function(d) {
                return path.centroid(d)[1];
            })
            .text(function(d) {
                return d.properties.name.toUpperCase();
            });

        var schaalBB = svg.append("path")
            .attr("d", path_schaal)
            .node().getBBox();

        var schaalrect = svg.append("rect")
            .attr("x", schaalBB.x - 30)
            .attr("y", schaalBB.y - 11)
            .attr("width", schaalBB.width + 37)
            .attr("height", schaalBB.height + 16)
            .style("fill", "rgba(256,256,256,0.8)")
            .style("stroke", "none");

        var schaal = svg.append("g")
            .attr("id", "schaal-g")
            .attr("transform", "translate(" + 0 + "," + schaalBB.y + ")");

        var schaal_d3scale = d3.scale.linear()
            .domain([0, 2])
            .range([schaalBB.x, schaalBB.x + schaalBB.width]);

        var schaal_axis = d3.svg.axis()
            .scale(schaal_d3scale)
            .orient("top")
            .ticks(0)
            .tickSize(4);

        schaal.call(schaal_axis);

        schaal.append("text")
            .attr("x", schaalBB.x - 26)
            .attr("y", 1)
            .text("2 km");

        var riviernamen = svg.append("g")
            .attr("class", "riviernamen");

        riviernamen.append("text")
            .attr("x", 469)
            .attr("y", 128)
            .attr("transform", "rotate(-11 469 128)")
            .text("Nederrijn");

        riviernamen.append("text")
            .attr("x", 483)
            .attr("y", 301)
            .attr("transform", "rotate(22 483 301)")
            .text("Waal");
    }

    /////////////////////////////////////////////////////////
    /* waterbuttons en hoog-laag functies */

    var waterbut = d3.select("#hooglaagbuttons");
    waterbut.append("a")
        .attr({
            id: "hoogwater"
        })
        .on("click", function() {
            if (!d3.select(this).classed("disabled") && !d3.select(this).classed("zooming")) {
                hoog();
                return false;
            }
        })
        .attr("class", "")
        .html("laat het<br>water stijgen");
    waterbut.append("a")
        .attr({
            id: "laagwater"
        })
        .on("click", function() {
            if (!d3.select(this).classed("disabled") && !d3.select(this).classed("zooming")) {
                laag();
                return false;
            }
        })
        .attr("class", "disabled")
        .html("laat het<br>water zakken");

    function hoog() {

        d3.selectAll("#hoogwater,#zoom").classed("disabled", true);

        geul
            .transition()
            .duration(duration_shape)
            .ease("linear")
            .attr("d", path_geul_breed)
            .transition()
            .duration(duration_style)
            .ease("linear")
            .style("fill-opacity", 1)
            .each("end", function() {
                d3.selectAll("#laagwater,#zoom").classed("disabled", false);
            });

        d3.selectAll(".riviernamen text")
            .transition()
            .duration(duration_shape)
            .transition()
            .duration(duration_style)
            .style("fill", "rgb(82,144,228)");

        d3.selectAll(".riviernamen")
            .transition()
            .duration(duration_shape)
            .transition()
            .duration(duration_style)
            .attr("transform", "translate(0,-5)");
    }

    function laag() {

        d3.selectAll("#laagwater,#zoom").classed("disabled", true);

        geul
            .transition()
            .duration(duration_style)
            .ease("linear")
            .style("fill-opacity", 0.5)
            .transition()
            .duration(duration_shape)
            .ease("linear")
            .attr("d", path_geul_smal)
            .each("end", function() {
                d3.selectAll("#hoogwater,#zoom").classed("disabled", false);
            });

        d3.selectAll(".riviernamen text")
            .transition()
            .duration(duration_style)
            .style("fill", "rgb(124,181,218)");

        d3.selectAll(".riviernamen")
            .transition()
            .duration(duration_style)
            .attr("transform", "translate(0,0)");

    }

    ///////////////////////////////////////////////////////////////
    /* zoom in, zoom uit */

    var zoom = d3.behavior.zoom();

    var kaart_g = d3.select("#kaart");
    var waterbuttons = d3.selectAll("#hoogwater,#laagwater");

    var zoombut = d3.select("#zoombutton")
        .append("a")
        .attr({
            /*href: "",*/
            id: "zoom"
        })
        .on("click", function() {

/*            if (d3.select(waterbuttons[0][0]).classed("disabled") && d3.select(waterbuttons[0][1]).classed("disabled")) {
                console.log("mag NIET zoomen");
            } else {
                console.log("mag WEL zoomen");
            }*/

            var newZoom, newX, newY;
            var zoombut_a = d3.select(this);
            if (zoombut_a.classed("in")) {
                newZoom = 0.045;
                newX = 290;
                newY = 200;
                zoombut_a.attr("class", "uit")
                    .html("zoom in<br>op gebied");

            } else if (zoombut_a.classed("uit")) {
                newZoom = 1;
                newX = 0;
                newY = 0;
                zoombut_a.attr("class", "in")
                    .html("waar ligt<br>dit gebied?");

            }
            zoom.scale(newZoom).translate([newX, newY]);
            kaart_g
                .transition()
                .duration(duration_style)
                .attr("transform", "translate(" + zoom.translate() + ")scale(" + zoom.scale() + ")")
                .call(function() {
                    if (newZoom !== 1) {
                        waterbuttons.classed("zooming", true);
                    }
                })
                .each("end", function() {
                    if (newZoom === 1) {
                        waterbuttons.classed("zooming", false);
                    }
                });
            return false;
        })
        .attr("class", "in")
        .html("waar ligt<br>dit gebied?");

} //end function draw()

draw();