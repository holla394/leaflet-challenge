let newYorkCoords = [0, 0];
let mapZoomLevel = 3;
const earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// function convert(integer) {
//   var str = Number(integer).toString(16);
//   return str.length == 1 ? "0" + str : str;
// };

// function to_rgb(r, g, b) { return "#" + convert(r) + convert(g) + convert(b); };
let color_list = ['#fff7ec',
'#fdd49e',
'#fc8d59',
'#d7301f',
'#7f0000'];

function color_function(depth) {
  if(depth<10)
    return '#fff7ec';
  else if(depth<30)
    return '#fdd49e';
  else if(depth<50)
    return '#fc8d59';
  else if(depth<70)
    return '#d7301f';
  else
    return '#7f0000';

};

// Create the createMap function.
function createMap(locations) {
  let myMap = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel
  });
  // Create the tile layer that will be the background of our map.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  locations.forEach(location => 
    L.circleMarker(latlng = [location.geometry.coordinates[0], location.geometry.coordinates[1]], 
      {"radius":location.properties.mag*10,
        "color":color_function(location.geometry.coordinates[2]),
        "fillcolor":color_function(location.geometry.coordinates[2])}).addTo(myMap)
      .bindPopup(`<h1>Location: ${location.properties.place}</h1>
        <h3>Magnitude: ${location.properties.mag}</h3>
        <h3>Depth: ${location.geometry.coordinates[2]}</h3>
        <h5>Lat: ${location.geometry.coordinates[0]}, Lng: ${location.geometry.coordinates[1]}</h5>`)
    );

    let legend = L.control({position: 'bottomright'});

    legend.onAdd = function () {

        var div = L.DomUtil.create('div', 'info legend'),
            depth = [10,30,50,70,90];
            labels = color_list;

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < depth.length; i++) {
            div.innerHTML +=
                '<i style="background:' + labels[i] + '"></i> ' +
                depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(myMap);
  return myMap;
};

d3.json(earthquake_url).then(data => {
  
  // let locations = data.features;
  // console.log(locations);
  // locations.forEach(location => {
  //   console.log(location.properties.mag)
  // });
  map = createMap(data.features);
  // let control = L.Control();
  // map.addControl(control);
  // L.control.layers(map, markers).addTo(map);
});