// create tilelayers
var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
});

var dark = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/dark-v10",
    accessToken: API_KEY
});

var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY
});

// create map
var myMap = L.map("map", {
    center: [-37.8136, 144.9431],
    zoom: 14,
    layers: [dark]
});

// create circle layers
const businessData = "/api/melbournebusinessdata2";

function markerSize(capacity) { return capacity / 20 };

var seatIndoor2020 = new L.LayerGroup();
var seatOutdoor2020 = new L.LayerGroup();
var seatIndoor2019 = new L.LayerGroup();
var seatOutdoor2019 = new L.LayerGroup();
var seatIndoor2018 = new L.LayerGroup();
var seatOutdoor2018 = new L.LayerGroup();
d3.json(businessData).then(function (data) {
    var features = data.features;
    var properties = features[0].properties
    console.log(properties)
    for (var i = 0; i < features.length; i++) {
        var fillcolor = "";
        switch (true) {
            case (features[i].properties.number_of_seats > 1500):
                fillcolor = "#80ff80";
                break;
            case (features[i].properties.number_of_seats > 1000):
                fillcolor = "#66ff66";
                break;
            case (features[i].properties.number_of_seats > 500):
                fillcolor = "#00cc00";
                break;
            default:
                fillcolor = "#009933";
        }
        if (features[i].properties.census_year == 2020 && features[i].properties.seating_type == "Seats - Indoor"){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year +"<br> Seating Type: " + features[i].properties.seating_type).addTo(seatIndoor2020);
        }
        else if (features[i].properties.census_year == 2020 && features[i].properties.seating_type == "Seats - Outdoor"){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year +"<br> Seating Type: " + features[i].properties.seating_type).addTo(seatOutdoor2020);
        }
        else if (features[i].properties.census_year == 2019 && features[i].properties.seating_type == "Seats - Indoor"){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year +"<br> Seating Type: " + features[i].properties.seating_type).addTo(seatIndoor2019);
        }
        else if (features[i].properties.census_year == 2019 && features[i].properties.seating_type == "Seats - Outdoor"){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year +"<br> Seating Type: " + features[i].properties.seating_type).addTo(seatOutdoor2019);
        }
        else if (features[i].properties.census_year == 2018 && features[i].properties.seating_type == "Seats - Indoor"){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year +"<br> Seating Type: " + features[i].properties.seating_type).addTo(seatIndoor2018);
        }
        else if (features[i].properties.census_year == 2018 && features[i].properties.seating_type == "Seats - Outdoor"){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year +"<br> Seating Type: " + features[i].properties.seating_type).addTo(seatOutdoor2018);
        }
    }
});

// create legend
var legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Seat Capacity</h4>";
    div.innerHTML += "<p style=\"background-color: #80ff80\"> > 1500</p>";
    div.innerHTML += "<p style=\"background-color: #66ff66\"> 1000 - 1500</p>";
    div.innerHTML += "<p style=\"background-color: #00cc00\"> 500 - 1000</p>";
    div.innerHTML += "<p style=\"background-color: #009933\"> 0 - 500</p>"
    return div;
};
legend.addTo(myMap);
document.querySelector(".legend").style.background = "#f2f2f2";
document.querySelector(".legend").style.padding = "0px 10px 0px 10px";

// create layer control
var baseMaps = {
    Light: light,
    Dark: dark,
    Satellite: satellite
};

var overlayMaps = {
    "2020 Seating Indoor": seatIndoor2020,
    "2020 Seating Outdoor": seatOutdoor2020,
    "2019 Seating Indoor": seatIndoor2019,
    "2019 Seating Outdoor": seatOutdoor2019,
    "2018 Seating Indoor": seatIndoor2018,
    "2018 Seating Outdoor": seatOutdoor2018,
};

L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(myMap);

seatIndoor2020.addTo(myMap)
