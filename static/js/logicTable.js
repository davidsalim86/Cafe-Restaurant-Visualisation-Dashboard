const businessData = "/api/melbournebusinessdata";
var tbody = d3.select("tbody");
var button = d3.select("#button");
var form = d3.select("#form");

d3.json(businessData).then(function (data) {
    var features = data.features
    console.log(features);
    for (var i = 0; i < features.length; i++) {
        var row = tbody.append("tr");
        if (data.features[i].properties.census_year == 2020) {
            Object.entries(data.features[i].properties).forEach(([key, value]) => {
                var cell = row.append("td");
                cell.text(value);
            });
        }
    }
});

// Create event handlers 
button.on("click", runFilter);
form.on("submit", runFilter);

function runFilter() {
    tbody.html("");
    d3.event.preventDefault();
    d3.json(businessData).then(function (data){
        var features = data.features
        var filterInput = d3.select("#datetime").property("value");
        console.log(filterInput)
        
        for (var i = 0; i < features.length; i++) {
            var row = tbody.append("tr");
            if (data.features[i].properties.census_year == filterInput) {
                Object.entries(data.features[i].properties).forEach(([key, value]) => {
                    var cell = row.append("td");
                    cell.text(value);
                });
            }
        }
    })
}