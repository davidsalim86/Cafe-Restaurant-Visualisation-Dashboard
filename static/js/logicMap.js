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
    center: [-37.8141, 144.9635],
    zoom: 16,
    layers: [dark]
});

// create circle layers
const indoorData = "/api/melbournebusinessdatamapindoor";
const outdoorData = "/api/melbournebusinessdatamapoutdoor";

function markerSize(capacity) { return capacity / 22 };

var indoor2020 = new L.LayerGroup();
var indoor2019 = new L.LayerGroup();
var indoor2018 = new L.LayerGroup();
var indoor2017 = new L.LayerGroup();
var outdoor2020 = new L.LayerGroup();
var outdoor2019 = new L.LayerGroup();
var outdoor2018 = new L.LayerGroup();
var outdoor2017 = new L.LayerGroup();

d3.json(indoorData).then(function (data) {
    var features = data.features;
    var properties = features[0].properties
    console.log(properties)
    for (var i = 0; i < features.length; i++) {
        var fillcolor = "";
        switch (true) {
            case (features[i].properties.number_of_seats > 1500):
                fillcolor = "#4d8000";
                break;
            case (features[i].properties.number_of_seats > 1000):
                fillcolor = "#7acc00";
                break;
            case (features[i].properties.number_of_seats > 500):
                fillcolor = "#a3ff1a";
                break;
            default:
                fillcolor = "#c2ff66";
        }
        if (features[i].properties.census_year == 2020) {
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " + features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(indoor2020);
        }
        else if (features[i].properties.census_year == 2019) {
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " + features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(indoor2019);
        }
        else if (features[i].properties.census_year == 2018) {
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " + features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(indoor2018);
        }
        else if (features[i].properties.census_year == 2017) {
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " + features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(indoor2017);
        }
    }
});

d3.json(outdoorData).then(function (data) {
    var features = data.features;
    var properties = features[0].properties
    console.log(properties)
    for (var i = 0; i < features.length; i++) {
        var fillcolor = "";
        switch (true) {
            case (features[i].properties.number_of_seats > 1500):
                fillcolor = "#4d8000";
                break;
            case (features[i].properties.number_of_seats > 1000):
                fillcolor = "#7acc00";
                break;
            case (features[i].properties.number_of_seats > 500):
                fillcolor = "#a3ff1a";
                break;
            default:
                fillcolor = "#c2ff66";
        }
        if (features[i].properties.census_year == 2020) {
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " + features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(outdoor2020);
        }
        else if (features[i].properties.census_year == 2019) {
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " + features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(outdoor2019);
        }
        else if (features[i].properties.census_year == 2018) {
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " + features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(outdoor2018);
        }
        else if (features[i].properties.census_year == 2017) {
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " + features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(outdoor2017);
        }
    }
});

// create legend
var legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Seat Capacity</h4>";
    div.innerHTML += "<p style=\"background-color: #4d8000\"> 1500</p>";
    div.innerHTML += "<p style=\"background-color: #7acc00\"> 1000 - 1500</p>";
    div.innerHTML += "<p style=\"background-color: #a3ff1a\"> 500 - 1000</p>";
    div.innerHTML += "<p style=\"background-color: #c2ff66\"> 0 - 500</p>"
    return div;
};
legend.addTo(myMap);
document.querySelector(".legend").style.background = "#f2f2f2";
document.querySelector(".legend").style.padding = "0px 10px 0px 10px";

// create layer control
var baseTree = {
    label: 'Layer type',
    children: [
        {
            label: 'Tile Layer',
            children: [
                { label: 'light', layer: light },
                { label: 'dark', layer: dark },
                { label: 'Satellite', layer: satellite },
            ]
        },
    ]
};

var overlaysTree = {
    label: 'Seat type',
    children: [
        {
            label: 'Indoor',
            children: [
                {
                    label: 'Year',
                    children: [
                        { label: '2020', layer: indoor2020 },
                        { label: '2019', layer: indoor2019 },
                        { label: '2018', layer: indoor2018 },
                        { label: '2017', layer: indoor2017 },
                    ]
                },
            ]
        }, {
            label: 'Outdoor',
            children: [
                {
                    label: 'Year',
                    children: [
                        { label: '2020', layer: outdoor2020 },
                        { label: '2019', layer: outdoor2019 },
                        { label: '2018', layer: outdoor2018 },
                        { label: '2017', layer: outdoor2017 },
                    ]
                },
            ]
        }
    ]
}


L.control.layers.tree(baseTree, overlaysTree, { collapsed: true }).addTo(myMap);

// L.Control.Layers.Tree.js is a custom js library used to create a tree structure for the layers layout in leaflet
// https://github.com/jjimenezshaw/Leaflet.Control.Layers.Tree

outdoor2020.addTo(myMap)