// function called when the slider's value is changed
function sliderChange() {
    var sliderValue = mySlider.getValue();
    console.log(sliderValue);
    // call build chart function, passing the slider's selected year
    buildPlot(sliderValue);
}

// rslider.min.js is a custom js library used to create the year selection slider
// https://slawomir-zaziablo.github.io/range-slider/
var mySlider = new rSlider({
    target: '#sampleSlider',
    values: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
    range: false,
    tooltip: true,
    scale: true,
    labels: true,
    set: [2020],
    onChange: sliderChange
});

function buildCountText(yearSelection) {
    // HTML objects
    var tEstablishments = document.getElementById('tEstablishments');
    var tOutdoor = document.getElementById('tOutdoor');
    var tIndoor = document.getElementById('tIndoor');

    // UPDATE TOTAL VALUES
    // total establishment count
    d3.json("/api/total_esta/" + yearSelection).then(function (totalData) {
        tEstablishments.innerHTML = totalData;
    });
    // total outdoor seat
    d3.json("/api/total_outdoor/" + yearSelection).then(function (totalData) {
        tOutdoor.innerHTML = totalData;
    });
    // total indoor seat
    d3.json("/api/total_indoor/" + yearSelection).then(function (totalData) {
        tIndoor.innerHTML = totalData;
    });
}

function buildBarchart(yearSelection) {
    // Area Seat Count Chart
    d3.json("/api/seats_per_area/" + yearSelection).then(function (data) {
        var bchartIndustry = []
        var bchartSeats = []
        for (i = 0; i < data.length; i++) {
            bchartIndustry.push(data[i].clue_small_area);
            bchartSeats.push(data[i].number_of_seats);
        }
        var hozBarData = [{
            y: bchartIndustry,
            x: bchartSeats,
            // text: bchartIndustry,
            type: "bar",
            orientation: "h",
        }];
        var hozBarLayout = {
            title: `Seat Counts by Area in Year ` + yearSelection,
            xaxis: { title: "Seat Count"},
            // yaxis: { title: "Area" },
            margin: {l: 185, r: 15}
        };
        Plotly.newPlot('bar', hozBarData, hozBarLayout)
    });
};

function buildBarchart2(yearSelection) {
    // Area Establishment Count Chart
    d3.json("/api/est_per_area/" + yearSelection).then(function (data) {
        var bchartIndustry = []
        var bchartEst = []
        for (i = 0; i < data.length; i++) {
            bchartIndustry.push(data[i].clue_small_area);
            bchartEst.push(data[i].trading_name);
        }
        var hozBarData = [{
            y: bchartIndustry,
            x: bchartEst,
            // text: bchartIndustry,
            type: "bar",
            orientation: "h",
        }];
        var hozBarLayout = {
            title: `Establishment Counts by Area in Year ` + yearSelection,
            xaxis: { title: "Establishment Count" },
            // yaxis: { title: "Area" },
            margin: {l: 185, r: 15}
        };
        Plotly.newPlot('bar2', hozBarData, hozBarLayout)
    });
};

function buildBarchart3(yearSelection) {
    // Industry Seat Count Chart
    d3.json("/api/seats_per_industry/" + yearSelection).then(function (data) {
        var bchartIndustry = []
        var bchartSeats = []
        for (i = 0; i < data.length; i++) {
            bchartIndustry.push(data[i].industry_anzsic4_description);
            bchartSeats.push(data[i].number_of_seats);
        }
        var hozBarData = [{
            y: bchartIndustry,
            x: bchartSeats,
            // text: bchartIndustry,
            type: "bar",
            orientation: "h",
        }];
        var hozBarLayout = {
            title: `Seat Counts by Industry in Year ` + yearSelection,
            xaxis: { title: "Seat Count" },
            // yaxis: { title: "Industry" },
            margin: {l: 290, r:15}
        };
        Plotly.newPlot('bar3', hozBarData, hozBarLayout)
    });
}

function buildPlot(yearSelection) {
        buildBarchart(yearSelection);
        buildCountText(yearSelection);
        buildBarchart2(yearSelection);
        buildBarchart3(yearSelection)
};

buildPlot();