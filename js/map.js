
// Creating the Map
var map = L.map('map', { crs: L.CRS.Simple }).setView([-130, 123], 1);
L.tileLayer('/rpg-interactive-map/map/{z}/{x}/{y}.png', {
  continuousWorld: false,
  noWrap: true,
  minZoom: 3,
  maxZoom: 6,
  attribution: 'By <a href="https://github.com/TaylorHo" target="_blank">@TaylorHo</a>'
}).addTo(map);

// Boundaries Variables
var mapSW = [-210, 255], mapNE = [-55, 10];
map.setMaxBounds(new L.LatLngBounds(mapSW, mapNE));

// Coordinate Finder (use to easily get lat and long from the map)
// var marker = L.marker([-130, 123], { draggable: true }).addTo(map);
// marker.bindPopup('LatLng Marker').openPopup();
// marker.on('dragend', function (e) {
//   marker.getPopup().setContent(marker.getLatLng().toString()).openOn(map);
// });
