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
const businessData = "/api/melbournebusinessdata";

function markerSize(capacity) { return capacity / 22 };

var year2020 = new L.LayerGroup();
var year2019 = new L.LayerGroup();
var year2018 = new L.LayerGroup();
var year2017 = new L.LayerGroup();
var year2016 = new L.LayerGroup();
var year2015 = new L.LayerGroup();
var year2014 = new L.LayerGroup();
var year2013 = new L.LayerGroup();
var year2012 = new L.LayerGroup();
var year2011 = new L.LayerGroup();
var year2010 = new L.LayerGroup();
var year2009 = new L.LayerGroup();
var year2008 = new L.LayerGroup();
var year2007 = new L.LayerGroup();
var year2006 = new L.LayerGroup();
var year2005 = new L.LayerGroup();
var year2004 = new L.LayerGroup();
var year2003 = new L.LayerGroup();
var year2002 = new L.LayerGroup();
d3.json(businessData).then(function (data) {
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
        if (features[i].properties.census_year == 2020){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(year2020);
        }
        else if (features[i].properties.census_year == 2019){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(year2019);
        }
        else if (features[i].properties.census_year == 2018){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(year2018);
        }
        else if (features[i].properties.census_year == 2017){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(year2017);
        }
        else if (features[i].properties.census_year == 2016){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(year2016);
        }
        else if (features[i].properties.census_year == 2015){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(year2015);
        }
        else if (features[i].properties.census_year == 2014){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(year2014);
        }
        else if (features[i].properties.census_year == 2013){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(year2013);
        }
        else if (features[i].properties.census_year == 2012){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(year2012);
        }
        else if (features[i].properties.census_year == 2011){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(year2011);
        }
        else if (features[i].properties.census_year == 2010){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(year2010);
        }
        else if (features[i].properties.census_year == 2009){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(year2009);
        }
        else if (features[i].properties.census_year == 2008){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(year2008);
        }
        else if (features[i].properties.census_year == 2007){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(year2007);
        }
        else if (features[i].properties.census_year == 2006){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(year2006);
        }
        else if (features[i].properties.census_year == 2005){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(year2005);
        }
        else if (features[i].properties.census_year == 2004){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(year2004);
        }
        else if (features[i].properties.census_year == 2003){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(year2003);
        }
        else if (features[i].properties.census_year == 2002){
            L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
                fillOpacity: 1,
                color: "black",
                weight: 0.5,
                opacity: 0.5,
                fillColor: fillcolor,
                radius: markerSize(features[i].properties.number_of_seats)
            }).bindPopup("Trading Name: " + features[i].properties.trading_name + "<br> Seating Capacity: " +  features[i].properties.number_of_seats + "<br>Census Year: " + features[i].properties.census_year).addTo(year2002);
        }
    }
});

// create legend
var legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Seat Capacity</h4>";
    div.innerHTML += "<p style=\"background-color: #4d8000\"> > 1500</p>";
    div.innerHTML += "<p style=\"background-color: #7acc00\"> 1000 - 1500</p>";
    div.innerHTML += "<p style=\"background-color: #a3ff1a\"> 500 - 1000</p>";
    div.innerHTML += "<p style=\"background-color: #c2ff66\"> 0 - 500</p>"
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
    "2020": year2020,
    "2019": year2019,
    "2018": year2018,
    "2017": year2017,
    "2016": year2016,
    "2015": year2015,
    "2014": year2014,
    "2013": year2013,
    "2012": year2012,
    "2011": year2011,
    "2010": year2010,
    "2009": year2009,
    "2008": year2008,
    "2007": year2007,
    "2006": year2006,
    "2005": year2005,
    "2004": year2004,
    "2003": year2003,
    "2002": year2002,
};

L.control.layers(baseMaps, overlayMaps, { collapsed: true }).addTo(myMap);

year2020.addTo(myMap)
