let newYorkCoords = [0, 0];
let mapZoomLevel = 3;
const earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

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
  locations.forEach(location => L.marker([location.geometry.coordinates[0], location.geometry.coordinates[1]]).addTo(myMap));
  return myMap;
};

d3.json(earthquake_url).then(data => {
  // console.log(data.features)
  map = createMap(data.features);
  // let control = L.Control();
  // map.addControl(control);
  // L.control.layers(map, markers).addTo(map);
});