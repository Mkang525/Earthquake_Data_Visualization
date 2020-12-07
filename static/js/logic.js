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

//Create circles 

  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {
    var earthquakeData = (data.features);
    console.log(earthquakeData);
   

    for (var i = 0; i < earthquakeData.length; i++) {
        var magnitude = earthquakeData[i].properties.mag;

        var color = "";
        if (magnitude > 4.5) {
            color = "#dc143c";
        }
        else if (magnitude > 4.0) {
            color = "#ec5038"
        }
        else if (magnitude > 3.5) {
            color = "#f47136"
        }
        else if (magnitude > 3.0) {
            color = "#fc8c34"
        }
        else if (magnitude > 2.5) {
            color = "#fab009";
        }
        else {
            color = "#ffcc00"
        }

        var lat = earthquakeData[i].geometry.coordinates[1];
        var long = earthquakeData[i].geometry.coordinates[0];
        
        var location = (`${lat}, ${long}`);
        console.log(location);
        var url = earthquakeData[i].properties.url;
        var urlLink = (`<a target='_blank' href="${url}"> Click for more Info</a>`)
        console.log(urlLink);
        
        L.circle([earthquakeData[i].geometry.coordinates[1], earthquakeData[i].geometry.coordinates[0]], {
            fillOpacity: 0.75,
            color: "white",
            stroke: true,
            weight: 1,
            fillColor: color,
            
            
            radius: magnitude * 20000
        }).bindPopup("<h1>Magnitude: " + magnitude + "</h1><hr><h3>Location: " + earthquakeData[i].properties.place + "<br>" + urlLink).addTo(myMap);
  
    };
});

// Create a legend

var legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<strong><h4>Magnitude</h4></strong>";
  div.innerHTML += '<i style="background: #dc143c"></i><span> > 4.5 </span><br>';
  div.innerHTML += '<i style="background: #ec5038"></i><span> 3.9 - 4.5 </span><br>';
  div.innerHTML += '<i style="background: #f47136"></i><span>  3.6 - 4.0  </span><br>';
  div.innerHTML += '<i style="background: #fc8c34"></i><span>  2.9 - 3.5 </span><br>';
  div.innerHTML += '<i style="background: #fab009"></i><span> 2.4 - 3.0 </span><br>';
  div.innerHTML += '<i style="background: #FFEDA0"></i><span> 0 - 2.5 </span><br>';
  
  return div;
};

legend.addTo(myMap);
