

function sliderChange() {
    var sliderValue = mySlider.getValue();
    console.log(sliderValue);
}

var mySlider = new rSlider({
    target: '#sampleSlider',
    values: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015],
    range: false,
    tooltip: true,
    scale: true,
    labels: true,
    set: [2010],
    onChange: sliderChange
});




function buildBarchart(yearSelection) {

    // *************************
    // Industry Seat Count Chart
    // *************************
    d3.json("/api/seats_per_industry").then(function (data) {
        console.log(data)

        // varaibles

        var bchartIndustry = []
        var bchartSeats = []

        for (i = 0; i < data.length; i++) {
            bchartIndustry.push(data[i].industry_anzsic4_description);
            bchartSeats.push(data[i].number_of_seats);
        }

        var hozBarData = [{
            y: bchartIndustry,
            x: bchartSeats,
            text: bchartSeats,
            type: "bar",
            orientation: "h",
        }];

        var hozBarLayout = {
            title: `Total Seat Counts Per Industry in Year :XXX`,
            xaxis: { title: "Seat Count" },
            yaxis: { title: "Industry" },
            margin: {l: 180, r:0}
        };

        Plotly.newPlot('bar', hozBarData, hozBarLayout)

    });

}

function buildCountText(yearSelection) {
    // HTML objects

    var tEstablishments = document.getElementById('tEstablishments');
    var tOutdoor = document.getElementById('tOutdoor');
    var tIndoor = document.getElementById('tIndoor');

    // *************************
    // UPDATE TOTAL VALUES
    // *********************

    // call flask ruote which returns total establishment count
    d3.json("/api/total_esta").then(function (totalData) {
        tEstablishments.innerHTML = totalData;
    });

    // outdoor
    d3.json("/api/total_outdoor").then(function (totalData) {
        tOutdoor.innerHTML = totalData;
    });

    //indoor
    d3.json("/api/total_indoor").then(function (totalData) {
        tIndoor.innerHTML = totalData;
    });

}

function buildArea(yearSelection) {
    //load json data 

    // *************************
    // Industry Seat Count Chart
    // *************************
    d3.json("/api/seats_per_area").then(function (data) {
        console.log(data)

        // varaibles

        var bchartIndustry = []
        var bchartSeats = []

        for (i = 0; i < data.length; i++) {
            bchartIndustry.push(data[i].clue_small_area);
            bchartSeats.push(data[i].number_of_seats);
        }

        var hozBarData = [{
            y: bchartIndustry,
            x: bchartSeats,
            text: bchartSeats,
            type: "bar",
            orientation: "h",
        }];

        var hozBarLayout = {
            title: `Total Seat Counts Per Area in Year :XXX`,
            xaxis: { title: "Seat Count" },
            yaxis: { title: "Area" },
            margin: {l: 180, r: 10}
        };

        Plotly.newPlot('bar2', hozBarData, hozBarLayout)

    });
};

function buildPlot(yearSelection) {
    //load json data 

    d3.json("/api/businessyear").then(function (data) {
        var address = data[0].trading_name;
        console.log(address)
        buildBarchart(2002);
        buildArea(2002);
        buildCountText(2002);
    });
};

buildPlot(2019);
