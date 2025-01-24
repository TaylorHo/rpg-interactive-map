let partyPosition = mapCenter;

// Creating the Map
var map = L.map('map', { crs: L.CRS.Simple }).setView(mapCenter, lowestZoom);
L.tileLayer(`${mapFolder}/{z}/{x}/{y}.png`, {
  continuousWorld: false,
  noWrap: true,
  minZoom: lowestZoom,
  maxZoom: biggestZoom, // Max zoom level, higher than maxNativeZoom, so when we go higher than maxNativeZoom, we just scale up the images on the map (providing a higher zoom)
  maxNativeZoom: biggestMapFolderZoom, // Maximum zoom level for /map/ folders
  attribution: 'By <a href="https://github.com/TaylorHo" target="_blank">@TaylorHo</a>'
}).addTo(map);

// Boundaries Variables
if (mapSouthWest && mapNorthEast && mapSouthWest.length > 0 && mapNorthEast.length > 0) {
  map.setMaxBounds(new L.LatLngBounds(mapSouthWest, mapNorthEast));
}

// Coordinate Finder (use to easily get lat and long from the map)
if (showLocationFinderMarker) {
  var coordinateFinderMarker = L.marker(mapCenter, { draggable: true }).addTo(map);
  coordinateFinderMarker.bindPopup('Lat Lng Marker').openPopup();
  coordinateFinderMarker.on('dragend', function (e) {
    coordinateFinderMarker.getPopup().setContent(coordinateFinderMarker.getLatLng().toString()).openOn(map);
  });
}

// Party position (saved to loalStorage for persistence)
if (showPartyMarker) {
  const initialPartyPosition = JSON.parse(localStorage.getItem('partyPosition') ?? JSON.stringify(mapCenter));
  var partyMarker = L.marker(initialPartyPosition, { draggable: true }).addTo(map);
  partyMarker.bindPopup("You're here").openPopup();
  partyMarker.on('dragend', function (e) {
    partyCoordinates = partyMarker.getLatLng();
    partyPosition = [partyCoordinates.lat, partyCoordinates.lng];
    localStorage.setItem('partyPosition', JSON.stringify(partyPosition));
  });
}