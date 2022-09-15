const businessData = "/api/melbournebusinessdatatable/";
var tbody = d3.select("tbody");
var button = d3.select("#button");
var form = d3.select("#form");

// table
d3.json(businessData + 2020).then(function (data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        var row = tbody.append("tr");
        Object.entries(data[i]).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    }
});

// Create event handlers 
button.on("click", runFilter);
form.on("submit", runFilter);

function runFilter() {
    tbody.html("");
    d3.event.preventDefault();
    var filterInput = d3.select("#datetime").property("value");
    d3.json(businessData + filterInput).then(function (data){
        console.log(filterInput)
        for (var i = 0; i < data.length; i++) {
            var row = tbody.append("tr");
            Object.entries(data[i]).forEach(([key, value]) => {
                var cell = row.append("td");
                cell.text(value);
            });
        }
    })
}