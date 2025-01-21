
const mapCenter = [-130, 123];
let partyPosition = mapCenter;

// Creating the Map
var map = L.map('map', { crs: L.CRS.Simple }).setView(mapCenter, 1);
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
// var coordinateFinderMarker = L.marker(mapCenter, { draggable: true }).addTo(map);
// coordinateFinderMarker.bindPopup('LatLng Marker').openPopup();
// coordinateFinderMarker.on('dragend', function (e) {
//   coordinateFinderMarker.getPopup().setContent(coordinateFinderMarker.getLatLng().toString()).openOn(map);
// });


// Party position (saved to loalStorage for persistence)
const initialPartyPosition = JSON.parse(localStorage.getItem('partyPosition') ?? JSON.stringify(mapCenter));
var partyMarker = L.marker(initialPartyPosition, { draggable: true }).addTo(map);
partyMarker.bindPopup("You're here").openPopup();
partyMarker.on('dragend', function (e) {
  partyCoordinates = partyMarker.getLatLng();
  partyPosition = [partyCoordinates.lat, partyCoordinates.lng];
  localStorage.setItem('partyPosition', JSON.stringify(partyPosition));
});
