function viz() {
    var that = {};
    d3.formatDefaultLocale({
        decimal: ',',
        thousands: '.',
        grouping: [3],
        currency: ['€', '']
    });
    // Mapping some values
    var parties = {
        // Landelijk
        'VVD': {
            fullName: 'VVD',
            color: '#455493'
        },
        'PVDA': {
            fullName: 'PvdA',
            color: '#9A0D1B'
        },
        'PVV': {
            fullName: 'PVV',
            color: '#1fbbfb'
        },
        'SP': {
            fullName: 'SP',
            color: '#C73D77'
        },
        'D66': {
            fullName: 'D66',
            color: '#4AAB2D'
        },
        'CDA': {
            fullName: 'CDA',
            color: '#00894B'
        },
        'GROENLINKS': {
            fullName: 'GroenLinks',
            color: '#006B39'
        },
        'CU': {
            fullName: 'ChristenUnie',
            color: '#032863'
        },
        'PVDD': {
            fullName: 'Partij vd Dieren',
            color: '#eac134'
        },
        'OVERIGE': {
            fullName: 'Overige partijen',
            color: '#bebebf'
        },
        'BLANCO_ONG': {
            fullName: 'Blanco en ongeldige stemmen',
            color: '#ccc'
        },
        // Amsterdam
        'PVDO': {
            fullName: 'Partij van de Ouderen',
            color: '#4D9ED6'
        },
        // Den Haag            
        'HSP': {
            fullName: 'Haagse Stadspartij',
            color: '#CDC52A'
        },
        'GDM_OP': {
            fullName: 'Groep de Mos, Ouderenpartij',
            color: '#157F3D'
        },
        'CU_SGP': {
            fullName: 'ChristenUnie, SGP',
            color: '#032863'
        },
        'ID': {
            fullName: 'Islam Democraten',
            color: '#7BBD30'
        },
        'PVDE': {
            fullName: 'Partij van de Eenheid',
            color: '#19803D'
        },
        // Rotterdam
        'LEEFBAAR': {
            fullName: 'Leefbaar Rotterdam',
            color: '#359C32'
        },
        'NIDA': {
            fullName: 'Nida Rotterdam',
            color: '#65AC20'
        },
        // Utrecht            
        'SBU': {
            fullName: 'Stadsbelang Utrecht',
            color: '#D70015'
        },
        'S_S': {
            fullName: 'Student & Starter',
            color: '#31B5CE'
        }
    };
    var cities = {
        amsterdam: {
            fullName: 'Amsterdam',
            center: [4.975, 52.354],
            scale: 110000
        },
        rotterdam: {
            fullName: 'Rotterdam',
            center: [4.478, 51.91],
            scale: 83400
        },
        denhaag: {
            fullName: 'Den Haag',
            center: [4.364, 52.071],
            scale: 150000
        },
        utrecht: {
            fullName: 'Utrecht',
            center: [5.141, 52.081],
            scale: 140000
        }
    };
    var absOrPercMap = {
        'abs': 'Aantal',
        'perc': 'Percentage'
    };
    // 'viz-wide' variables
    var viz = d3.select('#viz');
    var legendBarWidth = 450; // smaller than the svg size: the legend doesn't need to be as wide as the whole svg (the svg is as wide as the map svg)
    var legendBarHeight = 25;
    var cityDistricts;
    var party;
    var absOrPerc = 'abs';
    var cityParties;
    var totalCityVotes;
    var partiesVotesMax;
    // Add the select elements
    var selectsContainer = viz.append('div')
        .attr('id', 'selects-container')
        .attr('class', 'w3-row-padding');
    var selectCity = selectsContainer.append('div')
        .attr('id', 'select-city')
        .append('select')
        .on('change', function () {
        that.getData(this.value);
        d3.select('#select-abs-perc select').property('value', absOrPerc);
        districtStartText();
    });
    selectCity.selectAll('option')
        .data(d3.entries(cities))
        .enter()
        .append('option')
        .attr('value', function (d) { return d.key; })
        .text(function (d) { return d.value.fullName; });
    var selectParty = selectsContainer.append('div')
        .attr('id', 'select-party')
        .append('select')
        .on('change', function () {
        party = this.value;
        that.color(party);
        districtStartText();
    }); // the options are added in the drawCity functions, because each city has different parties
    var selectAbsOrPerc = selectsContainer.append('div')
        .attr('id', 'select-abs-perc')
        .append('select')
        .on('change', function () {
        absOrPerc = (this.value);
        that.color(party);
        districtStartText();
    });
    selectAbsOrPerc.selectAll('option')
        .data(d3.entries(absOrPercMap))
        .enter()
        .append('option')
        .attr('value', function (d) { return d.key; })
        .text(function (d) { return d.value; });
    d3.selectAll('#selects-container div')
        .attr('class', 'w3-third')
        .selectAll('select')
        .attr('class', 'w3-select');
    // Add the legend (with canvas colorbar and svg axis)
    var marginLegend = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 14
    }, widthLegend = 670 - marginLegend.left - marginLegend.right, //giving the legend svg the same width as the map svg 
    heightLegend = 50 - marginLegend.top - marginLegend.bottom;
    var legendContainer = viz.append('div')
        .attr('id', 'legend-container')
        .style('padding-bottom', 100 * (heightLegend + marginLegend.top + marginLegend.bottom) / (widthLegend + marginLegend.left + marginLegend.right) + '%');
    var canvasHeight = function () { return (legendBarHeight / legendBarWidth) * d3.select('canvas').property('clientWidth') + 'px'; }; // function to make canvas height responsive
    var legendColorBar = legendContainer.append('canvas')
        .attr('width', legendBarWidth + marginLegend.left)
        .attr('height', 1) // here is some magic: in renderColorBar we create a canvas with 1 pixels height and so 1 row of pixels; hereafter we change the height by style rule which results repeating the first row, so the whole canvas is colored
        .style('width', ((legendBarWidth + marginLegend.left) / widthLegend * 100) + '%')
        .style('height', canvasHeight());
    window.onresize = function () { return legendColorBar.style('height', canvasHeight()); };
    var renderColorBar = function (selection, color, party) {
        var context = selection.node().getContext('2d');
        var image = context.createImageData(legendBarWidth + marginLegend.left, 1);
        for (var i = 0, j = -1, c = void 0; i < legendBarWidth; ++i) {
            c = d3.rgb(color(i * partiesVotesMax[party][absOrPerc] / legendBarWidth));
            image.data[++j] = c.r;
            image.data[++j] = c.g;
            image.data[++j] = c.b;
            image.data[++j] = 255;
        }
        context.putImageData(image, marginLegend.left, 0);
    };
    var legendSvg = legendContainer.append('svg')
        .attr('viewBox', "0 0 " + (widthLegend + marginLegend.left + marginLegend.right) + " " + (heightLegend + marginLegend.top + marginLegend.bottom))
        .append('g')
        .attr('transform', "translate(" + marginLegend.left + ", " + marginLegend.top + ")");
    var legendBarX = d3.scaleLinear().domain([0, legendBarWidth]).range([0, legendBarWidth]);
    var legendAxisX = d3.scaleLinear().range([0, legendBarWidth - 1]); // the domain is added dynamically, depending on city, party and absOrPerc; rangevalue legendBarWidth - 1 is to keep a right outer tick aligned with the bar
    var legendAxis = d3.axisBottom(legendAxisX).tickSize(-legendBarHeight).tickPadding(8).ticks(6);
    var legendAxisContainer = legendSvg.append('g')
        .attr('id', 'legend-axis')
        .attr('transform', "translate(0, " + legendBarHeight + ")");
    // Add svg for city map
    var marginCity = {
        top: 0,
        right: 10,
        bottom: 0,
        left: 10
    }, widthCity = 670 - marginCity.left - marginCity.right, heightCity = 500 - marginCity.top - marginCity.bottom;
    var mapContainer = viz.append('div')
        .attr('id', 'map-container')
        .style('padding-bottom', 100 * (heightCity + marginCity.top + marginCity.bottom) / (widthCity + marginCity.left + marginCity.right) + '%');
    var mapSvg = mapContainer.append('svg')
        .attr('viewBox', "0 0 " + (widthCity + marginCity.left + marginCity.right) + " " + (heightCity + marginCity.top + marginCity.bottom))
        .append('g')
        .attr('transform', "translate(" + marginCity.left + ", " + marginCity.top + ")");
    // Add p element for district name and voting amount
    var districtTextContainer = viz.append('div')
        .attr('id', 'district-textinfo-container')
        .attr('class', 'w3-container w3-pale-yellow')
        .append('p');
    var districtStartText = function () { return districtTextContainer.text('Wil je de precieze uitslag van een buurt? Klik op de kaart.'); };
    districtStartText();
    // Add table element
    var tableContainer = viz.append('div')
        .attr('id', 'table-container')
        .attr('class', 'w3-container');
    var tableTitle = tableContainer.append('h5');
    var table = tableContainer.append('table')
        .attr('class', 'w3-table w3-border w3-bordered');
    table.append('tr')
        .attr('class', 'w3-light-grey')
        .selectAll('th')
        .data(['', 'aantal stemmen', 'per&shy;centage'])
        .enter()
        .append('th')
        .html(function (d) { return d; });
    /////////////////////////Get and process data //////////////////////
    // Get the data and call that.processData and that.drawCity
    that.getData = function (city) {
        d3.selectAll('select').property('disabled', true);
        var url = 'data/' + city + '-topo.json';
        d3.json(url, function (error, json) {
            if (error) {
                d3.select('#map-svg-container').remove();
                viz.append('p')
                    .text('Er is een probleem met het laden van de data. Misschien lukt het wel als je de pagina ververst.')
                    .attr('class', 'w3-container w3-win-metro-red');
                throw error;
            }
            var featureCollection = topojson.feature(json, json.objects.stad);
            that.processCityData(featureCollection);
            that.drawCity(city, featureCollection);
            that.writeTable(city);
            d3.selectAll('select').property('disabled', false);
        });
    };
    // Process the data to set some 'vize-wide' variables
    that.processCityData = function (featureCollection) {
        // Get the parties in this city
        var notPartyFeatureProperties = ['BU_CODE', 'BU_NAAM', 'KIESGER', 'STEMMEN'];
        cityParties = d3.keys(featureCollection.features[0].properties)
            .filter(function (key) { return notPartyFeatureProperties.indexOf(key) === -1; });
        cityParties.push(cityParties.shift());
        // Calculate for each party the highest number and the highest percentage of votes over all districts; we need this to set the domain of the legend axis and district fills
        // To use in the table: calculate to total number of votes in the city for each party and the total number of voters in the city 
        var partiesVotes = {};
        var partiesPercentages = {};
        totalCityVotes = { voters: 0 };
        cityParties.forEach(function (party) {
            partiesVotes[party] = [];
            partiesPercentages[party] = [];
            totalCityVotes[party] = 0;
        });
        featureCollection.features
            .filter(function (feature) { return feature.properties['STEMMEN'] !== -1; }) // -1 means that this district did not have a polling station
            .forEach(function (feature) {
            var totalDistrictVoters = feature.properties['STEMMEN'];
            totalCityVotes.voters += totalDistrictVoters;
            cityParties.forEach(function (party) {
                var partyVotes = feature.properties[party];
                partiesVotes[party].push(partyVotes);
                partiesPercentages[party].push(partyVotes / totalDistrictVoters);
                totalCityVotes[party] += partyVotes;
            });
        });
        partiesVotesMax = {};
        cityParties.forEach(function (party) {
            partiesVotesMax[party] = {
                abs: d3.max(partiesVotes[party]),
                perc: d3.max(partiesPercentages[party])
            };
        });
        return {
            cityParties: cityParties,
            totalCityVotes: totalCityVotes,
            partiesVotesMax: partiesVotesMax
        };
    };
    // Draw the city map
    that.drawCity = function (city, featureCollection) {
        selectParty.selectAll('option').remove();
        selectParty.selectAll('option')
            .data(cityParties)
            .enter()
            .append('option')
            .attr('value', function (d) { return d; })
            .text(function (d) { return parties[d].fullName; });
        var projection = d3.geoMercator()
            .center(cities[city].center)
            .scale(cities[city].scale);
        var path = d3.geoPath().projection(projection);
        d3.select('#city-districts').remove();
        cityDistricts = mapSvg.append('g')
            .attr('id', 'city-districts')
            .selectAll('path')
            .data(featureCollection.features)
            .enter()
            .append('path')
            .attr('d', path);
        // initial coloring
        party = cityParties[0]; // the data is ordered by party size and d3.keys(), with which cityParties is created, maintains this order
        that.color(party);
    };
    // Write the table with the overall city outcomes
    that.writeTable = function (city) {
        tableTitle.text("Totaal van alle buurten in " + city.replace(/\b\w/g, function (char) { return char.toUpperCase(); }));
        var data = d3.entries(totalCityVotes);
        data.push(data.shift()); // voters is first item; move it to the end
        var partyRows = table.selectAll('.party-row')
            .data(data);
        var partyCellsData = function (d) {
            var data = [];
            data.push(d.key === 'voters' ? 'Totaal' : parties[d.key].fullName);
            data.push(d3.format(',.0f')(d.value));
            data.push(d3.format('.1%')(d.value / totalCityVotes.voters));
            return data;
        };
        partyRows.selectAll('td')
            .data(partyCellsData)
            .text(function (d) { return d; });
        var updatedRows = partyRows.enter()
            .append('tr')
            .attr('class', 'party-row');
        var partyCells = updatedRows.selectAll('td')
            .data(partyCellsData)
            .enter()
            .append('td')
            .text(function (d) { return d; });
        partyRows.exit().remove();
    };
    // Add the coloring and colorbar axis; we bring the 'viz-wide' variable 'party' in as parameter so we can change it in the unit test
    that.color = function (party) {
        legendAxisX.domain([0, partiesVotesMax[party][absOrPerc]]);
        if (absOrPerc === 'abs') {
            legendAxis.tickFormat(d3.format(',.0f'));
        }
        else {
            legendAxis.tickFormat(d3.format('.0%'));
        }
        legendAxisContainer.call(legendAxis);
        var partyColor = parties[party].color;
        var interpolator = d3.interpolateHcl('#fbfdda', partyColor);
        var color = d3.scaleSequential(interpolator).domain([0, partiesVotesMax[party][absOrPerc]]);
        legendColorBar.call(renderColorBar, color, party);
        var noPollingStation = function (d) { return districtTextContainer
            .text(d.properties['BU_NAAM'] + ": er was in deze buurt geen stembureau."); };
        if (absOrPerc === 'abs') {
            cityDistricts
                .style('fill', function (d) { return d.properties[party] !== -1 ? color(d.properties[party]) : '#fff'; }) // -1 means that this district did not have a polling station
                .on('click', function (d) {
                if (d.properties['STEMMEN'] === -1) {
                    noPollingStation(d);
                }
                else {
                    districtTextContainer
                        .text(parties[party].fullName + ", " + d.properties['BU_NAAM'] + ": " + d.properties[party] + " stemmen.");
                }
            });
        }
        else {
            cityDistricts
                .style('fill', function (d) { return d.properties[party] !== -1 ? color(d.properties[party] / d.properties['STEMMEN']) : '#fff'; }) // -1 means that this district did not have a polling station
                .on('click', function (d) {
                if (d.properties['STEMMEN'] === -1) {
                    noPollingStation(d);
                }
                else {
                    districtTextContainer
                        .text(parties[party].fullName + ", " + d.properties['BU_NAAM'] + " : " + d3.format('.1%')(d.properties[party] / d.properties['STEMMEN']) + ".");
                }
            });
        }
    };
    return that;
}
viz().getData('amsterdam'); 
