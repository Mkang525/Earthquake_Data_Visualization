<img src="https://github.com/Mkang525/Earthquake_Data_Visualization/blob/main/Images/map.JPG?raw=true">
<ul>
  <li>Using data from the <a href="https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php" target="_blank"> USGS GeoJSON Feed</a>, I chose a dataset from the past 7 days that included all magnitudes of earthquakes recorded. I pulled in the data from the URL of this JSON for the visualization.</li><br>
  <li>Each earthquake is indicated by a circle with a radius equivalent to the magnitude of the earthquake. The location of each circle was taken from the latitude, longitude coordinates given in the GEOjson file</li><br>
  <li>When a circle is clicked on, a pop-up appears with information about the magnitude of the earthquake, the location, as well as a link to the USGS site that provides the user more specific information about that particular earthquake </li><br>
  <li>Multiple layers created to provide different views of the data, and I also created a legend to provided context for the map data</li>
