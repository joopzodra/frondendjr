(function () {
    var viz = d3.select('#viz');
    // Fixed position block with progress indicators and buttons
    var progressAndButtons = viz.append('div')
        .attr('id', 'progress-and-buttons');
    // Intro text with progress indicators
    var ol = progressAndButtons.append('ol')
        .attr('id', 'progress-indication');
    var indicator1 = ol.append('li')
        .text('herformuleren van informerende naar enthousiasmerende toon ')
        .append('span');
    var indicator2 = ol.append('li')
        .text('volgorde verbeteren en tussenkopjes maken ')
        .append('span');
    // Buttons
    var buttons = progressAndButtons.append('div')
        .attr('id', 'buttons');
    function buttonSvgFactory(id) {
        return buttons.append('button')
            .attr('id', id)
            .attr('class', 'w3-button w3-round w3-indigo')
            .append('svg')
            .attr('viewBox', '0 0 16 16')
            .attr('class', 'button-icon');
    }
    var backButtonPath = buttonSvgFactory('back')
        .append('path')
        .attr('d', 'M 9 2.5 v 5 l 5 -5 v 11 l -5 -5 v 5 l -5.5 -5.5 Z');
    var startstopButtonSvg = buttonSvgFactory('startstop');
    startstopButtonSvg.append('path')
        .attr('class', 'icon-start')
        .attr('d', 'M 3 2 l 10 6 l -10 6 Z');
    startstopButtonSvg.append('path')
        .attr('class', 'icon-playing')
        .attr('d', 'M 2 2 h 5 v 12 h -5 Z M 9 2 h 5 v 12 h -5 Z')
        .style('visibility', 'hidden');
    var forwardButtonPath = buttonSvgFactory('forward')
        .append('path')
        .attr('d', 'M 8 13.5 v -5 l -5 5 v -11 l 5 5 v -5 l 5.5 5.5 Z');
    var resetButtonPath = buttonSvgFactory('reset')
        .append('path')
        .attr('d', 'M 13.901 2.599 c -1.463 -1.597 -3.565 -2.599 -5.901 -2.599 c -4.418 0 -8 3.582 -8 8 h 1.5 c 0 -3.59 2.91 -6.5 6.5 -6.5 c 1.922 0 3.649 0.835 4.839 2.161 l -2.339 2.339 h 5.5 v -5.5 l -2.099 2.099 Z M 14.5 8 c 0 3.59 -2.91 6.5 -6.5 6.5 c -1.922 0 -3.649 -0.835 -4.839 -2.161 l 2.339 -2.339 h -5.5 v 5.5 l 2.099 -2.099 c 1.463 1.597 3.565 2.599 5.901 2.599 c 4.418 0 8 -3.582 8 -8 h -1.5 Z');
    d3.select('#reset')
        .property('disabled', true)
        .classed('disabled', true);
    // Constants and initial values
    var fontSize = 14, fontSizeH2 = Math.round(fontSize * 1.7), // Math.round() because Chrome replaces a dot in attribute string by a comma (due to its peculiar language settings)
    fontSizeH3 = fontSize * 1, time1 = 400, // time unit for text replacement
    time2 = 550; // time unit for text movement
    var counter1 = 0, // counter for text replacement
    counter2 = 0, // counter for text movement
    editing = false, playing = false;
    // Text divs, to be filled with the data
    var demo = viz.append('div')
        .attr('id', 'demo');
    demo.append('div')
        .attr('id', 'replaceable-text');
    demo.append('div')
        .attr('id', 'moved-text');
    var modal = viz.append('div')
        .attr('class', 'w3-modal')
        .style('display', 'none');
    var modalContent = modal.append('div')
        .attr('class', 'w3-modal-content');
    modalContent.append('span')
        .attr('class', 'w3-button w3-display-topright')
        .on('click', function () { return modal.style('display', 'none'); })
        .html('&times;');
    modalContent.append('div')
        .attr('id', 'original-text')
        .append('p')
        .text('OORSPONKELIJKE TEKST');
    modalContent.append('div')
        .attr('id', 'final-text')
        .append('p')
        .text('NA EINDREDACTIE');
    // Footer to show modal with an overview of both initial and final text
    var footer = viz.append('div')
        .attr('id', 'footer');
    footer.append('p')
        .text('Wil je direct de begintekst en het eindresultaat bij elkaar zien?')
        .append('button')
        .attr('class', 'w3-button w3-round w3-indigo')
        .text('Ja, toon beide')
        .on('click', function () {
        modal.style('display', 'block');
    });
    // Get the data and use it
    d3.csv('eindredacteur.csv', function (error, data) {
        var setStartText = function (selection) { return data.forEach(function (d, i) {
            d3.selectAll(selection)
                .append('div')
                .attr('class', "text-" + i + " " + d.html + " nw-pos-" + d.nwepositie)
                .style('font-size', d.html === 'h2' ? fontSizeH2 + 'px' : fontSize + 'px')
                .text(d.tekst);
            indicator1.text('0/18');
            indicator2.text('0/18');
        }); };
        setStartText('#replaceable-text, #original-text');
        var finalTextData = data.slice().sort(function (a, b) {
            return a.nwepositie - b.nwepositie;
        });
        finalTextData.forEach(function (d, i) {
            if (d.tskop) {
                d3.select('#final-text')
                    .append('div')
                    .attr('class', "text-" + i + "-h3 h3")
                    .text(d.tskop);
            }
            d3.select('#final-text')
                .append('div')
                .attr('class', "text-" + i + " " + d.nwehtml)
                .text(d.nwetekst);
        });
        function editText() {
            editing = true;
            setButtonStates();
            var fSize;
            var edittime1 = playing ? time1 : time1 / 3;
            var edittime2 = playing ? time2 : time2 / 3;
            if (counter1 <= 17) {
                d3.select('#replaceable-text .text-' + counter1)
                    .transition()
                    .duration(0.5 * edittime1)
                    .styleTween('font-size', function () {
                    fSize = this.style.fontSize.split('px')[0];
                    return d3.interpolate(fSize + "px", (+fSize * 1.4) + "px");
                })
                    .transition()
                    .delay(3 * edittime1)
                    .style('text-decoration', 'line-through')
                    .duration(3 * edittime1)
                    .styleTween('opacity', function () {
                    return d3.interpolate('1', '0.000001');
                })
                    .transition()
                    .delay(0.3 * edittime1)
                    .styleTween('opacity', function () {
                    return d3.interpolate('0.000001', '1');
                })
                    .style('text-decoration', 'none')
                    .text(data[counter1].nwetekst)
                    .transition()
                    .delay(3 * edittime1)
                    .duration(1 * edittime1)
                    .styleTween('font-size', function () {
                    return d3.interpolate((+fSize * 1.4) + 'px', fSize + 'px');
                })
                    .on('end', editEndHandler);
                counter1++;
                indicator1.text(counter1 + "/18");
            }
            else if (counter2 <= 17) {
                d3.select('#replaceable-text .nw-pos-' + finalTextData[counter2].nwepositie)
                    .transition()
                    .duration(0.25 * edittime2)
                    .styleTween('background-color', function () {
                    return d3.interpolate('#fff', '#d8dcf1');
                })
                    .transition()
                    .delay(edittime2 * 2)
                    .style('background-color', '#fff')
                    .text('');
                if (counter2 === 0) {
                    d3.select('#moved-text')
                        .append('div')
                        .attr('class', 'moved-text-0 moved-remark')
                        .text('BETERE VOLGORDE EN TUSSENKOPJES');
                }
                if (finalTextData[counter2].tskop) {
                    d3.select('#moved-text')
                        .append('div')
                        .attr('class', "moved-text-" + counter2 + " h3 pos-" + finalTextData[counter2].pos)
                        .text(finalTextData[counter2].tskop);
                }
                d3.select('#moved-text')
                    .append('div')
                    .attr('class', "moved-text-" + counter2 + " " + finalTextData[counter2].nwehtml)
                    .text(finalTextData[counter2].nwetekst)
                    .style('opacity', 0.0001)
                    .transition()
                    .delay(edittime2 * 2.25)
                    .style('opacity', 1)
                    .transition()
                    .duration(edittime2 * 2)
                    .styleTween('background-color', function () {
                    return d3.interpolate('#d8dcf1', '#fff');
                })
                    .on('end', editEndHandler);
                counter2++;
                indicator2.text(counter2 + "/18");
            }
        }
        function unEditText() {
            if (counter2 > 0) {
                counter2--;
                indicator2.text(counter2 + "/18");
                d3.selectAll('.moved-text-' + counter2)
                    .remove();
                d3.select('#replaceable-text .text-' + counter2)
                    .style('font-size', data[counter2].nwehtml === 'h2' ? fontSizeH2 + 'px' : fontSize + 'px')
                    .style('background-color', 'rgba(255,255,255,1)')
                    .text(data[counter2].nwetekst);
            }
            else if (counter1 > 0) {
                counter1--;
                indicator1.text(counter1 + "/18");
                d3.select('#replaceable-text .text-' + (counter1))
                    .text(data[counter1].tekst);
            }
            setButtonStates();
        }
        function editEndHandler() {
            if (playing && (counter2 < 18)) {
                // Continu editing (but with a break, otherwise next edit start immediately after the previous one)
                setTimeout(editText, 1200);
            }
            else if (counter2 === 18) {
                // End of playing
                playing = false;
            }
            editing = false;
            setButtonStates();
        }
        function setButtonStates() {
            var back = d3.select('#back');
            var startstop = d3.select('#startstop');
            var forward = d3.select('#forward');
            var reset = d3.select('#reset');
            back.property('disabled', false).classed('disabled', false);
            startstop.property('disabled', false).classed('disabled', false);
            forward.property('disabled', false).classed('disabled', false);
            reset.property('disabled', false).classed('disabled', false);
            if (counter1 === 0) {
                back.property('disabled', true).classed('disabled', true);
                reset.property('disabled', true).classed('disabled', true);
            }
            else if (counter2 === 18) {
                startstop.property('disabled', true).classed('disabled', true);
                forward.property('disabled', true).classed('disabled', true);
                toggleStartStopIconVisibility();
            }
            if (playing) {
                back.property('disabled', true).classed('disabled', true);
                forward.property('disabled', true).classed('disabled', true);
                reset.property('disabled', true).classed('disabled', true);
            }
            else if (editing) {
                back.property('disabled', true).classed('disabled', true);
                startstop.property('disabled', true).classed('disabled', true);
                forward.property('disabled', true).classed('disabled', true);
                reset.property('disabled', true).classed('disabled', true);
            }
        }
        function toggleStartStopIconVisibility() {
            d3.selectAll('#startstop .icon-start, #startstop .icon-playing')
                .each(function () {
                var selectedIcon = d3.select(this);
                var visibility = selectedIcon.style('visibility');
                if (visibility === 'hidden') {
                    selectedIcon.style('visibility', 'visible');
                }
                else {
                    selectedIcon.style('visibility', 'hidden');
                }
            });
        }
        d3.select('#forward').on('click', editText);
        d3.select('#back').on('click', unEditText);
        d3.select('#startstop').on('click', function () {
            if (!playing) {
                // Start playing
                playing = true;
                toggleStartStopIconVisibility();
                editText();
            }
            else {
                // Stop playing requested
                playing = false;
                d3.select('#startstop')
                    .property('disabled', true)
                    .classed('disabled', true); // disable startstop button after a stop, to prevent multiple stop-start-stop-starts
                toggleStartStopIconVisibility();
            }
        });
        d3.select('#reset').on('click', function () {
            d3.selectAll('#replaceable-text div, #moved-text div').remove();
            setStartText('#replaceable-text');
            counter1 = 0;
            counter2 = 0;
            indicator1.text('0/18');
            indicator2.text('0/18');
            setButtonStates();
        });
    });
})();
