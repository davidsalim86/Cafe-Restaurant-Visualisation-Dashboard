const businessData = "/api/seats_per_area/";
var tbody = d3.select("tbody");
var button = d3.select("#button");
var form = d3.select("#form");

// table
d3.json(businessData + 2020 + "/" + 2019 ).then(function (data) {
    console.log(data)
    console.log(data[0])
    d3.select("tbody")
    .selectAll("tr")
    .data(data)
    .enter()
    .append("tr")
    .html(function(d) {
    return `<td>${d.clue_small_area}</td><td>${d.number_of_seats}</td><td>${d.number_of_seats2}</td><td>${d.change}</td><td>${d.percent_change}</td>`;});
    }
);

// Create event handlers 
button.on("click", runFilter);

function runFilter() {
    tbody.html("");
    d3.event.preventDefault();
    var filterInput1 = d3.select("#datetime1").property("value");
    var filterInput2 = d3.select("#datetime2").property("value");
    d3.json(businessData + filterInput1 + "/" + filterInput2).then(function (data){
        console.log(data)
        d3.select("tbody")
        .selectAll("tr")
        .data(data)
        .enter()
        .append("tr")
        .html(function(d) {
        return `<td>${d.clue_small_area}</td><td>${d.number_of_seats}</td><td>${d.number_of_seats2}</td><td>${d.change}</td><td>${d.percent_change}</td>`;});
    document.getElementById("year 1").innerHTML = `Seating No <br> ${filterInput1}`;
    document.getElementById("year 2").innerHTML = `Seating No <br> ${filterInput2}`;
    })
}


function buildline(){
    const businessData2 = "/api/seats_by_year";
    d3.json(businessData2).then(function (data){
        console.log(data)
        var year = []
        var Seats = []

        console.log(year)
        console.log(Seats)

        for (i = 0; i < data.length; i++) {
            year.push(data[i].census_year);
            Seats.push(data[i].number_of_seats);
            }
        var lineData = [{
            x: year,
            y: Seats }];
            
        var lineLayout = {
            // title: `Seat Counts by Year`,
            yaxis: { title: "Seat Count" },
            // yaxis: { title: "Industry" },
            margin: {l: 100, r:20}}
    Plotly.newPlot('line', lineData, lineLayout)
    });
}

buildline()
