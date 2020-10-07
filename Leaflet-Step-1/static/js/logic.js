var myMap = L.map("map", {
    center: [45.52, -122.67],
    zoom: 5,
  });

  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/satellite-v9",
  accessToken: API_KEY
}).addTo(myMap);

var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "satellite-v9",
  accessToken: API_KEY
});

var baseMaps = {
    Satellite: satellite,
    Light: light,
  };
  
L.control.layers(baseMaps).addTo(myMap);



  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson", function(data) {
    var earthquakeData = (data.features);
    console.log(earthquakeData);
   


    for (var i = 0; i < earthquakeData.length; i++) {
        var magnitude = earthquakeData[i].properties.mag;
        console.log(magnitude);

        var color = "";
        if (magnitude > 4.5) {
            color = "red";
        }
        else if (magnitude > 2.5) {
            color = "yellow";
        }
        else {
            color = "green"
        }

        var lat = earthquakeData[i].geometry.coordinates[1];
        var long = earthquakeData[i].geometry.coordinates[0];
        
        var location = (`${lat}, ${long}`);
        console.log(location);
        
        L.circle([earthquakeData[i].geometry.coordinates[1], earthquakeData[i].geometry.coordinates[0]], {
            fillOpacity: 0.75,
            color: "white",
            fillColor: color,
            
            radius: magnitude * 15000
        }).bindPopup("<h1>Magnitude: " + magnitude + "</h1><hr><h3>Location: " + earthquakeData[i].properties.place + "</h3>").addTo(myMap);
  
    };

    



});
