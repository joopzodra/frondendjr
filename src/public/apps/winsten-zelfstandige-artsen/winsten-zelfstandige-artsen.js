function viz() {
    ///////////////////////// Initial setup //////////////////////
    var that = {}; // it's a design choice considering unit testing to create a that-object: it will be returned by viz() and has methods that can be used in unit tests
    d3.formatDefaultLocale({
        decimal: ',',
        thousands: '.',
        grouping: [3],
        currency: ['€', '']
    });
    var localeFormat = d3.format(',.1f');
    var colors = ['#C956CD', '#75D44B', '#CB472E', '#80B9CC', '#4E3C25', '#672F5C', '#71D39F', '#C48A3A', '#6F6FC7', '#557B3D', '#C897BE', '#C5BE9B', '#D1457F', '#CACC4F', '#AF5D58', '#435164'];
    var linesContainer = d3.select('#viz')
        .append('div')
        .attr('id', 'lines-container');
    var animationContainer = d3.select('#viz')
        .append('div')
        .attr('id', 'animation-container');
    /* Svg for line diagram */
    var linesMargin = {
        top: 10,
        right: 20,
        bottom: 30,
        left: 40
    };
    var linesWidth = 670 - linesMargin.left - linesMargin.right;
    var linesHeight = 320 - linesMargin.top - linesMargin.bottom;
    var lines = linesContainer.append('div')
        .attr('id', 'lines-svg-container')
        .style('padding-bottom', 100 * (linesHeight + linesMargin.top + linesMargin.bottom) / (linesWidth + linesMargin.left + linesMargin.right) + '%')
        .append('svg')
        .attr('viewBox', "0 0 " + (linesWidth + linesMargin.left + linesMargin.right) + " " + (linesHeight + linesMargin.top + linesMargin.bottom))
        .append('g')
        .attr('id', 'lines')
        .attr('transform', "translate(" + linesMargin.left + ", " + linesMargin.top + ")");
    /* Svg for animated bar chart */
    var animationMargin = {
        top: 0,
        right: 20,
        bottom: 87,
        left: 120
    };
    var animationWidth = 670 - animationMargin.left - animationMargin.right;
    var animationHeight = 367 - animationMargin.top - animationMargin.bottom;
    var animationSvgPaddingBottom = 100 * (animationHeight + animationMargin.top + animationMargin.bottom) / (animationWidth + animationMargin.left + animationMargin.right) + '%';
    var animation = animationContainer.append('div')
        .attr('id', 'animation-svg-container')
        .style('padding-bottom', animationSvgPaddingBottom)
        .append('svg')
        .attr('viewBox', "0 0 " + (animationWidth + animationMargin.left + animationMargin.right) + " " + (animationHeight + animationMargin.top + animationMargin.bottom))
        .append('g')
        .attr('id', 'animation')
        .attr('transform', "translate(" + animationMargin.left + ", " + animationMargin.top + ")");
    ///////////////////////// Lines diagram //////////////////////
    /* Checkboxes */
    var selectAllDiv = linesContainer.insert('div', '#lines-svg-container')
        .attr('id', 'select-deselect-all')
        .append('label')
        .text('selecteer/deselecteer alles')
        .append('input')
        .attr('class', 'w3-check')
        .attr('type', 'checkbox')
        .on('click', function () {
        var input = d3.select(this);
        if (!input.attr('checked')) {
            input.attr('checked', true);
            d3.selectAll('#checkboxes-container input')
                .attr('checked', true);
            d3.selectAll('#line-pathes path')
                .classed('colored', true)
                .style('stroke', function (d, i) { return colors[i]; })
                .style('stroke-width', 2);
            d3.selectAll('#numbers-container .numbers')
                .classed('visible', true);
        }
        else {
            input.attr('checked', null);
            d3.selectAll('#checkboxes-container input')
                .attr('checked', null);
            d3.selectAll('#line-pathes path')
                .classed('colored', false)
                .style('stroke', '#ddd')
                .style('stroke-width', 1);
            d3.selectAll('#numbers-container .numbers')
                .classed('visible', false);
        }
    });
    var checkboxes = linesContainer.insert('div', '#lines-svg-container')
        .attr('id', 'checkboxes-container')
        .append('ul');
    that.appendCheckboxes = function (data) {
        var checkboxLiElements = checkboxes.selectAll('li')
            .data(data)
            .enter()
            .append('li')
            .on('click', function (d) {
            that.updateLine(d['Specialisme']);
            var input = d3.select(this).select('input');
            input.attr('checked') ? input.attr('checked', null) : input.attr('checked', true);
        });
        checkboxLiElements.append('input')
            .attr('class', 'w3-check')
            .attr('type', 'checkbox')
            .attr('value', function (d) { return d['Specialisme']; })
            .style('pointer-events', 'none'); // because we let the li-element handle events, if input also reacts the checked-logic will be disturbed
        checkboxLiElements.append('div')
            .attr('class', function (d) { return "colorbox " + d['Specialisme'].toLowerCase(); })
            .style('background-color', function (d, i) { return colors[i]; });
        checkboxLiElements.append('label')
            .text(function (d) { return d['Specialisme']; });
    };
    var showHideNumbersDiv = linesContainer.insert('div', '#lines-svg-container')
        .attr('id', 'show-hide-numbers')
        .append('label')
        .text('toon/verberg cijfers')
        .append('input')
        .attr('class', 'w3-check')
        .attr('type', 'checkbox')
        .on('click', function () {
        var numbers = d3.select('#numbers-container');
        numbers.classed('hidden') ? numbers.classed('hidden', false) : numbers.classed('hidden', true);
    });
    /* Lines chart */
    that.enterLines = function (data, years) {
        var xLines = d3.scaleBand()
            .domain(years)
            .range([0, linesWidth]);
        var linesXAxis = d3.axisBottom(xLines).tickSizeInner(6).tickSizeOuter(0);
        var linesXAxisContainer = lines.append('g')
            .attr('class', 'x-axis')
            .attr('transform', "translate(0, " + linesHeight + ")")
            .call(linesXAxis);
        var yLines = d3.scaleLinear()
            .domain([0, 450]) // 450 is max value of data, rounded up to ..50
            .range([linesHeight, 0]);
        var linesYAxis = d3.axisLeft(yLines).tickSize(6);
        var linesYAxisContainer = lines.append('g')
            .attr('class', 'y-axis')
            .call(linesYAxis);
        var line = d3.line()
            .x(function (d) { return xLines(d.key) + xLines.bandwidth() / 2; })
            .y(function (d) { return yLines(d.value); });
        var linePathes = lines.append('g')
            .attr('id', 'line-pathes')
            .selectAll('.line')
            .data(data)
            .enter()
            .append('path')
            .attr('id', function (d) { return "line-" + d['Specialisme'].toLowerCase(); })
            .attr('class', 'line')
            .datum(function (d) { return d3.entries(d).filter(function (entry) { return entry.key !== 'Specialisme'; }); })
            .style('stroke', '#ddd')
            .style('fill', 'none')
            .attr('d', function (d) { return line(d); });
        var numbers = lines.append('g')
            .attr('id', 'numbers-container')
            .selectAll('.numbers')
            .data(data)
            .enter()
            .append('g')
            .attr('class', function (d) { return "numbers " + d['Specialisme'].toLowerCase(); })
            .selectAll('text')
            .data(function (d) { return d3.entries(d).filter(function (entry) { return entry.key !== 'Specialisme'; }); })
            .enter()
            .append('text')
            .attr('x', function (d) { return xLines(d.key) + xLines.bandwidth() / 2; })
            .attr('y', function (d) { return yLines(+d.value); })
            .attr('dy', -5)
            .style('text-anchor', 'middle')
            .text(function (d) { return localeFormat(+d.value); });
    };
    that.updateLine = function (specialty) {
        var color = d3.select(".colorbox." + specialty.toLowerCase()).style('background-color');
        var line = d3.select("#line-" + specialty.toLowerCase());
        var numbers = d3.select("#numbers-container ." + specialty.toLowerCase());
        if (!line.classed('colored')) {
            line.classed('colored', true)
                .style('stroke', color)
                .style('stroke-width', 2);
            numbers.classed('visible', true);
        }
        else {
            line.classed('colored', false)
                .style('stroke', '#ddd')
                .style('stroke-width', 1);
            numbers.classed('visible', false);
        }
    };
    ///////////////////////// Animation //////////////////////
    var startButton = animationContainer.insert('div', '#animation-svg-container')
        .attr('id', 'start-button')
        .append('button')
        .attr('class', 'w3-button w3-dark-gray')
        .text('Start animatie');
    var selectMenu = animationContainer.append('div')
        .attr('id', 'animation-select-menu')
        .append('select')
        .attr('class', 'w3-select')
        .on('change', function () { updateAll(this.value); });
    /* Slider conform Drag Slider on https://bl.ocks.org/mbostock/6452972 */
    var handle;
    var sliderScale;
    that.slider = function (years) {
        var sliderBottomPadding = 37;
        var sliderWidth = animationWidth; // extra width, added to animationWidth
        var sliderXTranslate = -60;
        var sliderDomain = years;
        sliderScale = d3.scaleBand()
            .domain(sliderDomain)
            .rangeRound([0, sliderWidth]);
        var slider = animation.append('g')
            .attr('id', 'slider')
            .attr('transform', "translate(" + sliderXTranslate + "," + (animationHeight + animationMargin.bottom - sliderBottomPadding) + ")");
        slider.append('line')
            .attr('class', 'track')
            .attr('x1', sliderScale.range()[0])
            .attr('x2', sliderScale.range()[1])
            .select(function () { return this.parentNode.appendChild(this.cloneNode(true)); })
            .attr('class', 'track-inset')
            .select(function () { return this.parentNode.appendChild(this.cloneNode(true)); })
            .attr('class', 'track-overlay')
            .call(d3.drag()
            .on('start.interrupt', function () { return slider.interrupt(); })
            .on('start drag', function () { sliderThrottler(d3.event.x); }));
        slider.insert('g', '.track-overlay')
            .attr('class', 'ticks')
            .attr('transform', 'translate(0,' + 33 + ')')
            .selectAll('text')
            .data(sliderScale.domain())
            .enter().append('text')
            .attr('x', function (d) { return sliderScale(d) + sliderScale.bandwidth() / 2; })
            .attr('text-anchor', 'middle')
            .text(function (d) { return d; });
        handle = slider.insert('circle', '.track-overlay')
            .attr('class', 'handle')
            .attr('r', 15)
            .attr('cx', sliderScale('2009') + sliderScale.bandwidth() / 2);
        var sliderTimeout;
        var currentYear = '2009'; // the initial slider value
        function sliderThrottler(x) {
            // ignore slider events as long as an actualResizeHandler execution is in the queue
            if (!sliderTimeout) {
                sliderTimeout = setTimeout(function () {
                    sliderTimeout = undefined;
                    actualSliderHandler(x);
                    // the actualResizeHandler will execute at a rate of 16fps
                }, 66);
            }
        }
        function actualSliderHandler(x) {
            var yearIndex = Math.floor(x / sliderScale.bandwidth());
            if (yearIndex < 0) {
                yearIndex = 0;
                handle.attr('cx', sliderScale.range()[0]);
            }
            else if (yearIndex > sliderDomain.length - 1) {
                yearIndex = sliderDomain.length - 1;
                handle.attr('cx', sliderScale.range()[1]);
            }
            else {
                handle.attr('cx', x);
            }
            var year = sliderDomain[yearIndex];
            if (year !== currentYear) {
                currentYear = year;
                updateAll(year);
            }
        }
    }; // end of that.slider()
    /* Set the options in select-menu */
    that.selectMenuOptions = function (years) {
        selectMenu.selectAll('option')
            .data(years)
            .enter()
            .append('option')
            .attr('value', function (d) { return d; })
            .text(function (d) { return d; });
    };
    /* Enter-bars and axes */
    // These variables are outside enterBars() because we need them 'globally' or because of the 'z-index' in the svg
    var maxLines = animation.append('g')
        .attr('id', 'animation-dotted-lines'); // We need to define maxLines before bars, for z-index
    var bars = animation.append('g')
        .attr('id', 'bars');
    var xBars = d3.scaleLinear()
        .domain([0, 450]) // 450 is max value of data, rounded up to ..50
        .range([0, animationWidth]);
    var barLabels;
    that.enterBars = function (data) {
        var specialties = data.map(function (specialty) { return specialty['Specialisme']; });
        var yBars = d3.scaleBand()
            .domain(specialties)
            .rangeRound([0, animationHeight])
            .paddingInner(0.3);
        var barsXAxis = d3.axisBottom(xBars).tickSize(6);
        var barsXAxisContainer = animation.append('g')
            .attr('class', 'x-axis')
            .attr('transform', "translate(0, " + animationHeight + ")")
            .call(barsXAxis);
        barsXAxisContainer.append('text')
            .attr('x', animationWidth)
            .attr('y', -4)
            .style('text-anchor', 'end')
            .text('winst x €1000');
        var barsYAxis = d3.axisLeft(yBars).tickSizeInner(6).tickSizeOuter(0);
        var barsYAxisContainer = animation.append('g')
            .attr('class', 'y-axis')
            .call(barsYAxis);
        maxLines.selectAll('line')
            .data(data)
            .enter()
            .append('line')
            .attr('x1', 0)
            .attr('y1', function (d) { return yBars(d['Specialisme']) + (yBars.bandwidth() / 2); })
            .attr('x2', function (d) { return xBars(+d['2009']); })
            .attr('y2', function (d) { return yBars(d['Specialisme']) + (yBars.bandwidth() / 2); });
        bars.selectAll('rect')
            .data(data)
            .enter().append('rect')
            .attr('x', 0)
            .attr('y', function (d) { return yBars(d['Specialisme']); })
            .attr('height', yBars.bandwidth())
            .attr('width', function (d) { return xBars(+d['2009']); });
        barLabels = bars.append('g')
            .attr('id', 'bar-labels')
            .selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .attr('y', function (d) { return yBars(d['Specialisme']) + 9; })
            .attr('x', function (d) { return xBars(+d['2009']); })
            .attr('dx', -6)
            .text(function (d) { return localeFormat(+d['2009']); });
        var maxCircles = animation.append('g')
            .attr('id', 'maximum-circles')
            .selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('r', 5)
            .attr('cx', function (d) { return xBars(+d['2009']); })
            .attr('cy', function (d) { return yBars(d['Specialisme']) + (yBars.bandwidth() / 2); });
    };
    /* Update bars, slider and select-menu */
    that.updateBars = function (year, duration) {
        if (duration === void 0) { duration = 0; }
        bars.selectAll('rect')
            .transition()
            .duration(duration)
            .attr('width', function (d) { return xBars(+d[year]); });
        barLabels
            .transition()
            .duration(duration)
            .attr('x', function (d) { return xBars(+d[year]); }) // no selectAll('text') because barLabels already is a d3-selection of text elements 
            .text(function (d) { return localeFormat(+d[year]); });
    };
    var updateSliderHandler = function (year) {
        handle.attr('cx', sliderScale(year) + sliderScale.bandwidth() / 2);
    };
    var updateSelectMenu = function (year) {
        selectMenu.property('value', year);
    };
    var updateAll = function (year) {
        that.updateBars(year, 500);
        updateSelectMenu(year);
        updateSliderHandler(year);
    };
    /* Animate */
    var i;
    var animate = function (years) {
        var lastYearIndex = years.length - 1;
        var yearToRunIndex = 0;
        updateAll(years[yearToRunIndex]);
        yearToRunIndex++;
        i = d3.interval(function () {
            updateAll(years[yearToRunIndex]);
            yearToRunIndex++;
            if (yearToRunIndex > lastYearIndex) {
                i.stop();
                d3.timeout(function () {
                    startButton.text('Start animatie');
                    startButton.classed('running', false);
                }, 1200);
            }
        }, 1000);
    };
    var stopAnimate = function () {
        i.stop();
    };
    ///////////////////////// Get and process data //////////////////////
    that.getData = function () {
        d3.csv('winsten-zelfstandige-artsen.csv', function (error, csv) {
            var years = d3.keys(csv[0]).filter(function (key) { return key !== 'Specialisme'; });
            //line svg
            that.appendCheckboxes(csv);
            var startSpecialties = ['Huisarts', 'Radioloog'];
            d3.selectAll('#checkboxes-container input')
                .filter('input[value="Huisarts"], input[value="Radioloog"]')
                .attr('checked', true);
            d3.select('#show-hide-numbers input').attr('checked', true);
            that.enterLines(csv, years);
            startSpecialties.forEach(function (specialty) { return that.updateLine(specialty); });
            // animation svg
            that.slider(years);
            that.selectMenuOptions(years);
            updateSelectMenu('2009');
            that.enterBars(csv);
            startButton.on('click', function () {
                if (!startButton.classed('running')) {
                    startButton.classed('running', true);
                    startButton.text('Stop animatie');
                    animate(years);
                }
                else {
                    startButton.classed('running', false);
                    startButton.text('Start animatie');
                    stopAnimate();
                }
            });
        });
    };
    return that;
}
viz().getData();
