(function () {
    var locale = d3.formatLocale({
        decimal: ',',
        thousands: '.',
        grouping: [3],
        currency: ['€', '']
    });
    var format = locale.format(',');
    var viz = d3.select('#viz');
    // Buttons
    var buttons = viz.append('div')
        .attr('id', 'buttons');
    buttons.append('button')
        .attr('id', 'abs-button')
        .attr('class', 'w3-button w3-margin active')
        .text('Totaal aantal')
        .on('click', toggleData);
    buttons.append('button')
        .attr('id', 'rel-button')
        .attr('class', 'w3-button w3-margin')
        .text('Per 10.000 inwoners')
        .on('click', toggleData);
    function toggleData() {
        var thisButton = d3.select(this);
        var otherButton = this.id === 'abs-button' ? d3.select('#rel-button') : d3.select('#abs-button');
        if (!thisButton.classed('active')) {
            thisButton.classed('active', true);
            otherButton.classed('active', false);
            if (this.id === 'abs-button') {
                d3.selectAll('.abs').style('visibility', 'visible');
                d3.selectAll('.rel').style('visibility', 'hidden');
            }
            else {
                d3.selectAll('.abs').style('visibility', 'hidden');
                d3.selectAll('.rel').style('visibility', 'visible');
            }
        }
    }
    // Legend
    var legend = viz.append('div')
        .attr('id', 'legend')
        .append('svg')
        .attr('viewBox', '0 0 320 120');
    // colors from w3 flat ui colors
    var palette = [
        { description: 'Dagopname', color: '#f1c40f' },
        { description: 'Klinisch', color: '#c0392b' },
        { description: 'Dagopname, specifiek (laparoscopisch of secundair)', color: '#f39c12' },
        { description: 'Klinisch, specifiek (laparoscopisch of secundair)', color: '#e74c3c' } // alizarin
    ];
    function addLegend(x, y, paletteItem) {
        legend.append('rect')
            .attr('x', x)
            .attr('y', y)
            .attr('width', 17)
            .attr('height', 17)
            .style('fill', paletteItem.color);
        legend.append('text')
            .attr('x', x + 20)
            .attr('y', y + 12)
            .style('font-size', '1.2em')
            .text(paletteItem.description);
    }
    addLegend(4, 20, palette[0]);
    addLegend(4, 45, palette[1]);
    addLegend(4, 70, palette[2]);
    addLegend(4, 95, palette[3]);
    // Chart-containers
    var bigTotalChartContainer = viz.append('div')
        .attr('id', 'big-total-chart-container');
    var chartContainer = viz.append('div')
        .attr('id', 'chart-container');
    // Big chart with the total
    var marginTotal = { top: 10, right: 20, bottom: 20, left: 66 };
    var widthTotal = 650 - marginTotal.right - marginTotal.left;
    var heightTotal = 150 - marginTotal.top - marginTotal.bottom;
    var xTotal = d3.scaleTime().domain([new Date(1995, 0, 1), new Date(2010, 0, 1)]).range([0, widthTotal]);
    var xAxisTotal = d3.axisBottom(xTotal).tickSizeInner(6).tickSizeOuter(0);
    var yTotal = d3.scaleLinear().range([heightTotal, 0]);
    var yTotalAxis = d3.axisLeft(yTotal).ticks(4).tickFormat(format);
    // Regular charts 
    var margin = { top: 10, right: 20, bottom: 20, left: 60 };
    var width = 310 - margin.right - margin.left;
    var height = 100 - margin.top - margin.bottom;
    var x = d3.scaleTime().domain([new Date(1995, 0, 1), new Date(2010, 0, 1)]).range([0, width]);
    var xAxis = d3.axisBottom(x).tickSizeInner(6).tickSizeOuter(0);
    var y = d3.scaleLinear().range([height, 0]);
    var yAxis = d3.axisLeft(y).ticks(3).tickSizeOuter(0).tickFormat(format);
    // Chart 'Staaroperatie'
    var heightLarge = 3 * height;
    var yLarge = d3.scaleLinear().range([heightLarge, 0]);
    var yLargeAxis = d3.axisLeft(yLarge).ticks(3).tickSizeOuter(0).tickFormat(format);
    d3.csv('operaties-1995-2010.csv', function (err, csv) {
        var dataRaw = d3.nest()
            .key(function (d) { return d.operatie; })
            .entries(csv);
        dataRaw.unshift({ key: dataRaw[0].key, values: dataRaw[0].values }); // Add copy of the first data object 'Alle operatieve verrichtingen' for big total chart
        dataRaw[0].key = 'Alle operatieve verrichtingen BIG TOTAL';
        var years = d3.keys(csv[0]).slice(0, 16); //this slicing cuts off the elements 'aantal_of_per10000', 'operatie' and 'wijze'. So we only keep the year-elements
        var dataAbsolute = dataRaw.map(function (operation) { return ({ key: operation.key, values: operation.values.filter(function (d) { return d.aantal_of_per10000 === 'klinisch aantal' || d.aantal_of_per10000 === 'dagopname aantal'; }) }); });
        var dataRelative = dataRaw.map(function (operation) { return ({ key: operation.key, values: operation.values.filter(function (d) { return d.aantal_of_per10000 === 'klinisch per 10000 inw' || d.aantal_of_per10000 === 'dagopname per 10000 inw'; }) }); });
        var dataAbsoluteByYear = dataAbsolute.map(function (d) { return operationWithValuesByYear(d, years); });
        var dataRelativeByYear = dataRelative.map(function (d) { return operationWithValuesByYear(d, years); });
        var chartsAbs = dataAbsoluteByYear;
        var chartsRel = dataRelativeByYear;
        function chart(data, absOrRel) {
            var yMax;
            var chartHeight;
            var chartX = x;
            var chartXAxis = xAxis;
            var chartY;
            var chartYAxis;
            switch (data.key) {
                case 'Alle operatieve verrichtingen BIG TOTAL':
                    yMax = absOrRel === 'abs' ? 1500000 : 1000;
                    yTotal.domain([0, yMax]);
                    chartHeight = heightTotal;
                    chartX = xTotal;
                    chartXAxis = xAxisTotal;
                    chartY = yTotal;
                    chartYAxis = yTotalAxis;
                    break;
                case 'Alle operatieve verrichtingen':
                    yMax = absOrRel === 'abs' ? 1500000 : 1000;
                    y.domain([0, yMax]);
                    chartHeight = height;
                    chartY = y;
                    chartYAxis = yAxis;
                    break;
                case 'Staaroperatie':
                    yMax = absOrRel === 'abs' ? 150000 : 90;
                    yLarge.domain([0, yMax]);
                    chartHeight = heightLarge;
                    chartY = yLarge;
                    chartYAxis = yLargeAxis;
                    break;
                default:
                    yMax = absOrRel === 'abs' ? 50000 : 30;
                    y.domain([0, yMax]);
                    chartHeight = height;
                    chartY = y;
                    chartYAxis = yAxis;
                    break;
            }
            var keysForStack = d3.keys(data.values[0]).filter(function (key) { return key !== 'year'; });
            var stack = d3.stack()
                .keys(keysForStack);
            var area = d3.area()
                .x(function (d) { return chartX(new Date(+d.data.year, 0, 0)); })
                .y1(function (d) { return chartY(d[1]); })
                .y0(function (d) { return chartY(d[0]); });
            var svg = d3.select('#' + data.key.toLowerCase().replace(/[\s/,\.]/g, '')).select('svg').select('g');
            svg.append('g')
                .attr('class', absOrRel)
                .selectAll('path')
                .data(function () { return stack(data.values); })
                .enter()
                .append('path')
                .attr('d', function (d) { return area(d); })
                .attr('fill', function (d) { return areaFill(d.key); });
            svg.append('g')
                .attr('class', 'y axis ' + absOrRel)
                .call(chartYAxis);
            // x-axis and text are identical for abs and rel data, so only add them once
            if (absOrRel === 'abs') {
                svg.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', "translate(0, " + chartHeight + ")")
                    .call(chartXAxis);
                svg.append('text')
                    .attr('x', 6)
                    .attr('y', 8)
                    .attr('class', 'chart-label')
                    .text(data.key === 'Alle operatieve verrichtingen BIG TOTAL' ? 'Alle operatieve verrichtingen' : data.key);
            }
            svg.append('rect')
                .attr('class', absOrRel)
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', chartX(new Date(+years[years.length - 1], 0, 1)))
                .attr('height', chartY(0))
                .attr('opacity', '0.0001')
                .on('click', function () { return showTable(data, absOrRel); });
        }
        // Create a container for each operation
        chartsAbs.forEach(function (operation) {
            var viewBoxHeight = height;
            var viewBoxWidth = width;
            var viewBoxMargin = margin;
            var classed = 'regular-chart';
            var container = chartContainer;
            switch (operation.key) {
                case 'Alle operatieve verrichtingen BIG TOTAL':
                    viewBoxHeight = heightTotal;
                    viewBoxWidth = widthTotal;
                    viewBoxMargin = marginTotal;
                    classed = 'total-chart';
                    container = bigTotalChartContainer;
                    break;
                case 'Staaroperatie':
                    viewBoxHeight = heightLarge;
                    classed = 'large-chart';
                    break;
            }
            container.append('div')
                .attr('id', operation.key.toLowerCase().replace(/[\s/,\.]/g, ''))
                .attr('class', 'chart ' + classed)
                .append('svg')
                .attr('viewBox', "0 0 " + (viewBoxWidth + viewBoxMargin.left + viewBoxMargin.right) + " " + (viewBoxHeight + viewBoxMargin.top + viewBoxMargin.bottom))
                .append('g')
                .attr('transform', "translate(" + viewBoxMargin.left + ", " + viewBoxMargin.top + ")");
        });
        // Create the charts for each operation
        chartsAbs.forEach(function (operation) { return chart(operation, 'abs'); });
        chartsRel.forEach(function (operation) { return chart(operation, 'rel'); });
        // On init hide the relative data
        d3.selectAll('.rel').style('visibility', 'hidden');
    });
    /*  The two functions below are for wrangling the data to the form the stack function needs. The form we need is:
    var data = [
      {month: new Date(2015, 0, 1), apples: 3840, bananas: 1920, cherries: 960, dates: 400},
      {month: new Date(2015, 1, 1), apples: 1600, bananas: 1440, cherries: 960, dates: 400},
      ...
    ];
    See https://github.com/d3/d3-shape/blob/master/README.md#stacks
    So we need data like:
    [
      {year: "1995", 'dagopname aantal&enkel': 367908, 'klinisch aantal&enkel': 678796},
      {year: "1996", 'dagopname aantal&enkel': 389024, 'klinisch aantal&enkel': 666644},
      ...
    ]
    Or:
    [
      {year: "1995", 'dagopname aantal&laparoscopisch': 0, 'dagopname aantal&overig': 0, 'klinisch aantal&laparoscopisch': 40, 'klinisch aantal&overig': 10599},
      {year: "1996", 'dagopname aantal&laparoscopisch': 0, 'dagopname aantal&overig': 0, 'klinisch aantal&laparoscopisch': 37, 'klinisch aantal&overig': 11120},
      ...      ]
    And we need such an array for every operation, and for both absolute data and relative data.
    */
    function byYear(operationValuesObj, year) {
        var label = operationValuesObj.aantal_of_per10000 + '&' + operationValuesObj.wijze;
        var value = +operationValuesObj[year];
        return { label: label, value: value };
    }
    function operationWithValuesByYear(operation, years) {
        var operationValues = operation.values;
        var ArrayOfYearValuesObjects = years.map(function (year) {
            var yearValuesObject = {};
            yearValuesObject.year = year;
            operationValues.forEach(function (operationValuesObj) { return yearValuesObject[byYear(operationValuesObj, year).label] = +byYear(operationValuesObj, year).value; });
            // Format of yearValuesObject: {year: "1996", klinisch aantal&enkel: 10128, dagopname aantal&enkel: 8562}.
            // It has a year key-value pair and can have two data key-values pairs – like this one – or four data key-value pairs. 
            return yearValuesObject;
        });
        return ({
            key: operation.key,
            values: ArrayOfYearValuesObjects
        });
    }
    function areaFill(key) {
        var firstPart = key.split(' ')[0];
        var lastPart = key.split('&')[1];
        if (firstPart === 'dagopname') {
            if (lastPart === 'enkel' || lastPart === 'overig' || lastPart === 'open') {
                return palette[0].color;
            }
            else {
                return palette[2].color;
            }
        }
        else {
            if (lastPart === 'enkel' || lastPart === 'overig') {
                return palette[1].color;
            }
            else {
                return palette[3].color;
            }
        }
    }
    function showTable(data, absOrRel) {
        var modal = viz.append('div')
            .attr('class', 'w3-modal')
            .style('display', 'block');
        var modalContent = modal.append('div')
            .attr('class', 'w3-modal-content');
        var header = modalContent.append('div')
            .attr('class', 'w3-container modal-header');
        header.append('h5')
            .text(data.key === 'Alle operatieve verrichtingen BIG TOTAL' ? 'Alle operatieve verrichtingen' : data.key);
        header.append('p')
            .text(absOrRel === 'abs' ? '(totaal aantal)' : '(per 10.000 inwoners)');
        header.append('span')
            .attr('class', 'w3-button w3-display-topright')
            .on('click', function () { return modal.style('display', 'none'); })
            .html('&times;');
        var table = modalContent.append('div')
            .attr('class', 'w3-container')
            .append('table')
            .attr('class', 'w3-table-all w3-small w3-margin-top w3-margin-bottom');
        var rowNames = d3.keys(data.values[0]);
        var rowLabels = rowNames.map(function (row) {
            return row.replace(/aantal&|per 10000 inw&/, '')
                .replace(/year|enkel/, '')
                .replace('laparoscopisch', 'laparo&shy;scopisch')
                .replace('transurethraal', 'trans&shy;urethraal');
        });
        var thRow = table.append('tr');
        rowLabels.forEach(function (label) {
            thRow.append('th')
                .html(label);
        });
        var row = table.selectAll('tr')
            .data(data.values)
            .enter()
            .append('tr')
            .selectAll('td')
            .data(function (d) { return d3.values(d); })
            .enter()
            .append('td')
            .text(function (d, i) { return i > 0 ? format(+d) : d; }); // Don't format the first row with the year
    }
})();
