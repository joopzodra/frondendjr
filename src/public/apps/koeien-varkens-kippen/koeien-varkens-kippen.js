function draw() {
    var colors = {
        varkens: '#ff0097',
        koeien: '#2d89ef',
        schapen: '#00a300',
        kippen: '#ffc40d',
        mensen: '#da532c'
    };
    var countriesAbbrevations = {
        'Nederland': 'NL',
        'België': 'BE',
        'Denemarken': 'DK',
        'Duitsland': 'DE',
        'Frankrijk': 'FR',
        'Italië': 'IT',
        'Spanje': 'ES',
        'Verenigd Koninkrijk': 'GB'
    };
    var viz = d3.select('#viz');
    viz.selectAll('div').remove();
    var timer;
    var playAnimation;
    var duration = 3000;
    // Button
    var button = viz.append('div')
        .attr('id', 'button-container')
        .append('button')
        .attr('class', 'w3-button w3-round')
        .text('stop animatie')
        .on('click', function () {
        var button = d3.select(this);
        if (button.text() === 'stop animatie') {
            timer.stop();
            button.text('start animatie');
        }
        else {
            playAnimation();
            timer = d3.interval(playAnimation, 6000);
            button.text('stop animatie');
        }
        ;
    });
    // Calculating the sizes for svg and charts. We give different number of rows and chart per row, depending on screen size.
    var flexSizes;
    if (window.matchMedia('(max-width: 400px)').matches) {
        flexSizes = {
            height: 1100,
            animalChartsPerRow: 1,
            countryChartsPerRow: 2,
            maxBars: 'country',
            scale: 2,
            legendTranslate: -450
        };
    }
    else if (window.matchMedia('(max-width: 600px)').matches) {
        flexSizes = {
            height: 825,
            animalChartsPerRow: 2,
            countryChartsPerRow: 3,
            maxBars: 'animal',
            scale: 1.5,
            legendTranslate: -300
        };
    }
    else if (window.matchMedia('(max-width: 800px)').matches) {
        flexSizes = {
            height: 550,
            animalChartsPerRow: 2,
            countryChartsPerRow: 4,
            maxBars: 'country',
            scale: 1.2,
            legendTranslate: -150
        };
    }
    else {
        flexSizes = {
            height: 550,
            animalChartsPerRow: 3,
            countryChartsPerRow: 4,
            maxBars: 'animal',
            scale: 1,
            legendTranslate: -20
        };
    }
    var animalChartsPerRow = flexSizes.animalChartsPerRow;
    var animalChartsPerColumn = Math.ceil((5 / animalChartsPerRow));
    var countryChartsPerRow = flexSizes.countryChartsPerRow;
    var countryChartsPerColumn = Math.ceil(8 / countryChartsPerRow);
    // The overal svg margin
    var margin = {
        top: 0,
        right: 10,
        bottom: 6,
        left: 0
    };
    //The charts within the svg
    var chartMargin = {
        top: 120,
        right: 40,
        bottom: 18,
        left: 20
    };
    var width = 895 - margin.left - margin.right;
    var height = flexSizes.height - margin.top - margin.bottom;
    // Set value for the width of the bars: depending on which type of chart have maximum number of bars in a row. This is indicated by flexSizes.maxBars. When we know barWidth, we can calculate the width of the show-per-animal-charts, since barWidth will be constant. (outcommented is the alternative: with maximum number of bars with the show-per-animal-charts)
    var countryChartWidthPlusMargins;
    var animalChartWidthPlusMargins;
    var barWidth;
    if (flexSizes.maxBars === 'country') {
        countryChartWidthPlusMargins = (width / countryChartsPerRow);
        barWidth = Math.floor((countryChartWidthPlusMargins - chartMargin.left - chartMargin.right) / 5);
        animalChartWidthPlusMargins = (8 * barWidth) + chartMargin.left + chartMargin.right;
    }
    else {
        animalChartWidthPlusMargins = (width / animalChartsPerRow);
        barWidth = Math.floor((animalChartWidthPlusMargins - chartMargin.left - chartMargin.right) / 8);
        countryChartWidthPlusMargins = (5 * barWidth) + chartMargin.left + chartMargin.right;
    }
    // Animal charts and country charts both will be in animalChartsPerColumn-number of rows. But upper row contains the extreme large NL kippen bar. Therefore upperrow gets twice the height of the bottom row. So we add 1 for an extra row. Then we get the total height of all rows. We double this value for the upper row. 
    var chartHeightPlusMargins = (height / (animalChartsPerColumn + 1));
    // But because of 'NL kippen' bar (which we keep in upper row) we make chartBottom in lower rows extra low, hence 2 + Math.floor(...) and not 1 + Math.floor(...)
    var animalChartLeftSides = d3.range(6).map(function (n) { return Math.floor((n % animalChartsPerRow) * animalChartWidthPlusMargins); }); // there are 6 animal charts
    var animalChartBottoms = d3.range(6).map(function (n) { return (2 + Math.floor((n / animalChartsPerRow))) * chartHeightPlusMargins; });
    var animalChartBottomLeftCorners = d3.zip(animalChartLeftSides, animalChartBottoms);
    var countryChartLeftSides = d3.range(8).map(function (n) { return Math.floor((n % countryChartsPerRow) * countryChartWidthPlusMargins); }); // and 8 country charts
    var countryChartBottoms = d3.range(8).map(function (n) { return (2 + Math.floor((n / countryChartsPerRow))) * chartHeightPlusMargins; });
    var countryChartBottomLeftCorners = d3.zip(countryChartLeftSides, countryChartBottoms);
    // End of calculating sizes
    // The svg (one svg will contain all the charts)
    var svgContainer = viz.append('div')
        .attr('id', 'svg-container')
        .style('padding-bottom', 100 * (height + margin.top + margin.bottom) / (width + margin.left + margin.right) + '%');
    var svg = svgContainer.append('svg')
        .attr('viewBox', "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
        .append('g')
        .attr('transform', "translate(" + margin.left + ", " + margin.top + ")");
    svg.append('g')
        .attr('id', 'header')
        .append('text')
        .attr('transform', "scale(" + flexSizes.scale + ") translate(" + (370 + (flexSizes.legendTranslate / 1.5)) + ",12)")
        .text('Aantal dieren en mensen per km2')
        .style('text-transform', 'uppercase');
    d3.csv('apps/koeien-varkens-kippen/koeien-varkens-kippen.csv', function (error, csv) {
        if (error) {
            d3.select('#svg-container').remove();
            viz.append('p')
                .text('Er is een probleem met het laden van de data. Misschien lukt het wel als je de pagina ververst.')
                .attr('class', 'w3-container w3-win-metro-red');
            throw error;
        }
        var data = d3.map(csv, function (d) { return d.country; });
        var countries = data.keys();
        var countryObjectKeys = Object.keys(data.get(countries[0]));
        // We change the order of the animals so that the large 'NL kippen' bar will stay in the upper row of charts:
        var animalsFromData = countryObjectKeys.filter(function (d) { return d !== 'country' && d !== 'surface'; });
        var animals = d3.permute(animalsFromData, [3, 4, 2, 1, 0]);
        var legendContainter = svg.append('g')
            .attr('id', 'legend-container')
            .attr('transform', "scale(" + flexSizes.scale + ") translate(" + flexSizes.legendTranslate + ",0)");
        var legend = legendContainter
            .selectAll('.legend')
            .data(animals)
            .enter().append('g')
            .attr('class', 'legend')
            .attr('transform', function (d, i) { return "translate(0, " + i * 22 + ")"; });
        legend.append('rect')
            .attr('x', width - 38)
            .attr('width', 18)
            .attr('height', 18)
            .style('fill', function (d) { return colors[d]; });
        legend.append('text')
            .attr('x', width - 44)
            .attr('y', 9)
            .attr('dy', '.35em')
            .style('text-anchor', 'end')
            .style('font-size', '80%')
            .text(function (d) { return d; });
        var animalChartOrigins = animals.reduce(function (origins, animal, i) {
            origins[animal] = {
                x: animalChartBottomLeftCorners[i][0] + chartMargin.left,
                y: animalChartBottomLeftCorners[i][1] - chartMargin.bottom
            };
            return origins;
        }, {});
        var countryChartOrigins = countries.reduce(function (origins, country, i) {
            origins[country] = {
                x: countryChartBottomLeftCorners[i][0] + chartMargin.left,
                y: countryChartBottomLeftCorners[i][1] - chartMargin.bottom
            };
            return origins;
        }, {});
        var xAnimals = d3.scaleBand()
            .domain(countries.map(function (country) { return countriesAbbrevations[country]; }))
            .rangeRound([0, (animalChartWidthPlusMargins - chartMargin.left - chartMargin.right)])
            .paddingInner(0.5);
        var xAxisAnimals = d3.axisBottom(xAnimals);
        var xCountries = d3.scaleBand()
            .domain(animals)
            .rangeRound([0, (countryChartWidthPlusMargins - chartMargin.left - chartMargin.right)])
            .paddingInner(0.4);
        var xAxisCountries = d3.axisBottom(xCountries);
        var y = d3.scaleLinear()
            .domain([0, 1500])
            .clamp(true)
            .rangeRound([0, -(2 * chartHeightPlusMargins - chartMargin.top - chartMargin.bottom)]); // 2 * the height: see explanation above for the value of chartHeightPlusMargins
        // For 'by animal' charts we use an axis to place labels with country abbrevations
        // Foy 'by country' charts we manually place one label with the full country name at the bottom of the charts
        var animalAxisContainers = svg.append('g')
            .attr('id', 'animal-axes-container')
            .selectAll('.animal-axis')
            .data(animals)
            .enter()
            .append('g')
            .attr('class', 'animal-axis')
            .attr('transform', function (d) { return "translate(" + (animalChartOrigins[d].x + (flexSizes.scale * 6)) + ", " + animalChartOrigins[d].y + ")"; })
            .call(xAxisAnimals)
            .style('font-size', (flexSizes.scale * 9.8) + 'px');
        var chartLabelContainer = svg.append('g')
            .attr('id', 'chartlabel-container');
        d3.keys(countryChartOrigins).forEach(function (key) {
            var origin = countryChartOrigins[key];
            var anchorPoint = origin.x + 0.5 * (countryChartWidthPlusMargins - chartMargin.left - chartMargin.right);
            chartLabelContainer.append('text')
                .attr('class', 'chart-label')
                .attr('text-anchor', 'middle')
                .attr('x', anchorPoint)
                .attr('y', origin.y + (16 * flexSizes.scale))
                .style('font-size', (flexSizes.scale * 12) + 'px')
                .text(key);
        });
        var barsContainers = svg.selectAll('.bars-container')
            .data(data.entries())
            .enter()
            .append('g')
            .attr('class', 'bars-container');
        var bars = barsContainers.selectAll('g')
            .data(function (d) {
            //d is for example:
            //{ key: 'Nederland', value: {country: 'Nederland', schapen: '1088490', koeien: '38853350', ...., surface: 33893} }
            var mappedData = d3.map(d.value);
            var data = mappedData.keys()
                .filter(function (key) { return key !== 'country'; })
                .map(function (key) { return ({ key: key, value: +mappedData.get(key) / +mappedData.get('surface') }); })
                .filter(function (d) { return d.key !== 'surface'; });
            // data is for example: [{key: 'schapen', value: 128}, {key: 'koeien', value: 41}, ...., {key: 'mensen', value: 261}]  
            return data;
        })
            .enter()
            .append('g')
            .datum(function (d) {
            return {
                country: d3.select((this.parentNode)).datum().key,
                animal: d.key,
                value: Math.round(d.value)
            };
        })
            .attr('class', function (d) { return countriesAbbrevations[d.country].toLowerCase() + " " + d.animal; });
        var barsRect = bars.append('rect')
            .attr('width', barWidth)
            .attr('y', function (d) { return y(+d.value); })
            .attr('height', function (d) { return -y(+d.value); })
            .style('fill', function (d) { return colors[d.animal]; });
        var chickenNLOverflow = d3.select('.nl.kippen').append('rect')
            .attr('width', barWidth + 2)
            .attr('height', -y(1360))
            .attr('y', y(1360) - 80)
            .style('fill', colors.kippen)
            .style('stroke', '#fff')
            .style('stroke-width', 3);
        var barsText = bars.append('text')
            .attr('text-anchor', 'middle')
            .attr('y', function (d) { return y(+d.value) - 8; })
            .style('font-size', (flexSizes.scale * 70) + '%')
            .text(function (d) { return d.value !== 0 ? d.value : '?'; });
        d3.select('.nl.kippen text')
            .attr('dy', -55)
            .attr('dx', -10);
        var showByAnimal = function (duration) {
            barsRect.transition()
                .duration(duration)
                .attr('x', function (d) { return xAnimals(countriesAbbrevations[d.country]); })
                .attr('transform', function (d) { return "translate(" + animalChartOrigins[d.animal].x + ", " + animalChartOrigins[d.animal].y + ")"; });
            chickenNLOverflow.transition()
                .duration(duration)
                .attr('x', xAnimals('NL') - 12)
                .attr('transform', "translate(" + animalChartOrigins['kippen'].x + ", " + animalChartOrigins['kippen'].y + ")");
            barsText.transition()
                .duration(duration)
                .attr('x', function (d) { return xAnimals(countriesAbbrevations[d.country]) + barWidth / 2; })
                .attr('transform', function (d) { return "translate(" + animalChartOrigins[d.animal].x + ", " + animalChartOrigins[d.animal].y + ")"; });
            animalAxisContainers.transition()
                .delay(0.5 * duration)
                .duration(0.5 * duration)
                .style('opacity', 1);
            chartLabelContainer
                .transition()
                .duration(0.5 * duration)
                .style('opacity', 0);
        };
        var showByCountry = function (duration) {
            barsRect.transition()
                .duration(duration)
                .attr('x', function (d) { return xCountries(d.animal); })
                .attr('transform', function (d) { return "translate(" + countryChartOrigins[d.country].x + ", " + countryChartOrigins[d.country].y + ")"; });
            chickenNLOverflow.transition()
                .duration(duration)
                .attr('x', xCountries('kippen') - 12)
                .attr('transform', "translate(" + countryChartOrigins['Nederland'].x + ", " + countryChartOrigins['Nederland'].y + ")");
            barsText.transition()
                .duration(duration)
                .attr('x', function (d) { return xCountries(d.animal) + (barWidth / 2); })
                .attr('transform', function (d) { return "translate(" + countryChartOrigins[d.country].x + ", " + countryChartOrigins[d.country].y + ")"; });
            animalAxisContainers.transition()
                .duration(0.5 * duration)
                .style('opacity', 0);
            chartLabelContainer
                .transition()
                .delay(0.5 * duration)
                .duration(0.5 * duration)
                .style('opacity', 1);
        };
        showByCountry(0);
        showByAnimal(duration);
        var current = 'byAnimal';
        playAnimation = function () {
            if (current === 'byCountry') {
                showByAnimal(duration);
                current = 'byAnimal';
            }
            else {
                showByCountry(duration);
                current = 'byCountry';
            }
        };
        timer = d3.interval(playAnimation, 6000);
    });
}
;
var cachedInnerWidth;
window.onload = function () {
    draw();
    cachedInnerWidth = window.innerWidth;
};
// resize throttler, to prevent continuous calling of draw() during resizing
// also: store window.innerWidth, because mobile devices resize window vertically when scrolling (showing and hiding the browser tabs), but then draw() should NOT called
(function () {
    window.addEventListener('resize', resizeThrottler, false);
    var resizeTimeout;
    function resizeThrottler() {
        var newInnerWidth = window.innerWidth;
        // ignore resize events as long as an actualResizeHandler execution is in the queue
        if (!resizeTimeout && newInnerWidth !== cachedInnerWidth) {
            resizeTimeout = setTimeout(function () {
                resizeTimeout = null;
                cachedInnerWidth = window.innerWidth;
                actualResizeHandler();
                // The actualResizeHandler will execute at a rate of 4fps
            }, 250);
        }
    }
    function actualResizeHandler() {
        draw();
    }
    window.addEventListener('orientationchange', function () {
        cachedInnerWidth = window.innerWidth;
        draw();
    });
}());
