const businessData = "/api/seats_per_area/";
var tbody = d3.select("tbody");
var button = d3.select("#button");
var form = d3.select("#form");

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