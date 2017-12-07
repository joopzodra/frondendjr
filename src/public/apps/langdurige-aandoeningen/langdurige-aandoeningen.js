(function () {
    var viz = d3.select('#viz');
    var cats = [
        { id: 'totaal', label: 'alle leeftijden', color: '#1f77b4' },
        { id: 'tot45', label: '35-45 jaar', color: '#ff7f0e' },
        { id: 'tot55', label: '45-55 jaar', color: '#2ca02c' },
        { id: 'tot65', label: '55-65 jaar', color: '#d62728' },
        { id: 'tot75', label: '65-75 jaar', color: '#17becf' },
        { id: 'boven75', label: 'ouder dan 75 jaar', color: '#8c564b' }
    ];
    //checked checkboxes on init
    var checked = ['totaal', 'tot75', 'boven75'];
    viz.append('div')
        .attr('id', 'buttons')
        .selectAll('button')
        .data(cats)
        .enter()
        .append('button')
        .attr('id', function (d) { return d.id; })
        .attr('class', 'w3-button w3-border')
        .style('background-color', function (d) { return checked.indexOf(d.id) === -1 ? "#fff" : d.color; })
        .style('color', function (d) { return checked.indexOf(d.id) === -1 ? "#000" : "#fff"; })
        .html(function (d) { return d.label; });
    var totalWidth = 300;
    var totalHeight = 200;
    var margin = { top: 60, right: 20, bottom: 20, left: 40 };
    var width = totalWidth - margin.right - margin.left;
    var height = totalHeight - margin.top - margin.bottom;
    var heightLarge = 2 * totalHeight - margin.top - margin.bottom;
    var heightLargeTop = heightLarge - (0.5 / 0.25) * height; //ratio is given by y_small scale and y_large scale ratio
    var perc = d3.format('.0%');
    var years = d3.timeYears(new Date(2001, 0, 1), new Date(2010, 0, 1));
    var x = d3.scaleTime().domain([new Date(2000, 8, 1), new Date(2009, 3, 1)]).range([0, width]);
    var xAxis = d3.axisBottom(x).tickSizeInner(6).tickSizeOuter(0);
    var y_small = d3.scaleLinear().domain([0, 0.25]).range([height, 0]);
    var y_large = d3.scaleLinear().domain([0, 0.5]).range([heightLarge, heightLargeTop]);
    var yAxis_small = d3.axisLeft(y_small).ticks(5).tickFormat(perc);
    var yAxis_large = d3.axisLeft(y_large).ticks(10).tickFormat(perc);
    var line_small = d3.line().x(function (d, i) { return x(years[i]); }).y(function (d) { return y_small(+d / 100); });
    var line_large = d3.line().x(function (d, i) { return x(years[i]); }).y(function (d) { return y_large(+d / 100); });
    d3.csv('langdurige-aandoeningen.csv', function (err, csv) {
        var diseases = d3.nest()
            .key(function (d) { return d['Aandoening']; })
            .key(function (d) { return d['Leeftijd']; })
            .entries(csv);
        var large = ['Hoge bloeddruk', 'Gewrichtsslijtage'];
        var charts = viz.append('div')
            .attr('id', 'charts')
            .selectAll('.chart')
            .data(diseases)
            .enter()
            .append('div')
            .attr('class', 'chart')
            .append('svg')
            .attr('width', totalWidth)
            .attr('height', function (d) { return large.indexOf(d.key) === -1 ? totalHeight : 2 * totalHeight; })
            .append('g')
            .attr('id', function (d, i) { return 'disease' + i; })
            .attr('transform', "translate(" + margin.left + ", " + margin.top + ")");
        charts.append('g')
            .attr('class', 'x axis')
            .attr("transform", function (d) { return large.indexOf(d.key) === -1 ? "translate(0, " + height + ")" : "translate(0, " + heightLarge + ")"; })
            .call(xAxis);
        charts.append('g')
            .attr('class', 'y axis')
            .each(yAxis);
        function yAxis(selection) {
            return large.indexOf(selection.key) === -1 ? d3.select(this).call(yAxis_small) : d3.select(this).call(yAxis_large);
        }
        //adding header to charts
        charts.append("rect")
            .attr('x', 0)
            .attr('y', function (d) { return large.indexOf(d.key) === -1 ? -18 : heightLargeTop - 18; })
            .attr('width', width)
            .attr('height', 18)
            .attr('class', 'textrect');
        charts.append('text')
            .attr('class', 'headtext')
            .attr('transform', function (d) { return large.indexOf(d.key) === -1 ? "translate(5, -5)" : "translate(5, " + (heightLargeTop - 5) + ")"; })
            .text(function (d) { return d.key; });
        //containers for age groups
        var ageGroups = charts.append('g')
            .attr('class', 'lines')
            .selectAll('g')
            .data(function (d) { return d.values; })
            .enter()
            .append('g')
            .attr('class', function (d) { return d.key.toLowerCase(); })
            .classed('hidden', function (d) { return checked.indexOf(d.key.toLowerCase()) === -1; });
        ageGroups.append('path')
            .attr('d', dAttr)
            .attr('stroke', function (d, i) { return cats[i].color; });
        function dAttr(data) {
            var values = data.values[0];
            if (large.indexOf(values['Aandoening']) === -1) {
                return line_small(years.map(function (year) { return +values[year.getFullYear()]; }));
            }
            else {
                return line_large(years.map(function (year) { return +values[year.getFullYear()]; }));
            }
        }
        ageGroups.append('g')
            .attr('class', 'numbers')
            .selectAll('.number')
            .data(function (d) { return years.map(function (year) { return [d.values[0][year.getFullYear()], d.values[0]['Aandoening']]; }); }) //we need 'Aandoening' for attr y: y_small or y_large
            .enter()
            .append('text')
            .attr('class', function (d) { return 'number'; })
            .attr("x", function (d, i) { return x(years[i]); })
            .attr("y", function (d) { return large.indexOf(d[1]) === -1 ? y_small(+d[0] / 100) : y_large(+d[0] / 100); })
            .text(function (d) { return d[0].toString().replace(/\./g, ","); })
            .attr("text-anchor", "middle");
        //rectangle covering whole charts to catch mouse events
        charts.append('rect')
            .attr('x', 0)
            .attr('y', function (d) { return large.indexOf(d.key) === -1 ? 0 : heightLargeTop; })
            .attr('width', width)
            .attr('height', function (d) { return large.indexOf(d.key) === -1 ? height : (0.5 / 0.25) * height; })
            .style("fill-opacity", 0) //fill:hidden gives no mouse respond
            .style("stroke-width", 0)
            .on('mouseover', function (d, i) {
            d3.event.stopPropagation(); // to prevent triggering the listener on the body element
            d3.select('#disease' + i).selectAll('.numbers').classed('visible', true);
        })
            .on('mouseout', function (d, i) {
            d3.select('#disease' + i).selectAll('.numbers').classed('visible', false);
        });
        d3.select('#viz')
            .on('mouseover', function () { return d3.selectAll('.numbers').classed('visible', false); });
    });
    d3.selectAll('button')
        .on('click', function (d) {
        d3.event.stopPropagation();
        var ageGroup = d3.selectAll('.' + d.id);
        var button = d3.select(this);
        if (ageGroup.classed('hidden')) {
            ageGroup.classed('hidden', false);
            button.style('background-color', d.color, 'important')
                .style('color', '#fff', 'important');
        }
        else {
            ageGroup.classed('hidden', true);
            button.style('background-color', '#fff', 'important')
                .style('color', '#000', 'important');
        }
    });
})();
