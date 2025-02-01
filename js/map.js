L.AwesomeMarkers.Icon.prototype.options.prefix = 'fa';
let partyPosition = [];

let viewZoom = localStorage.getItem('mapZoom') ?? lowestZoom;
let viewCenter = JSON.parse(localStorage.getItem('mapCenter') ?? JSON.stringify(mapCenter));

// Creating the Map
var map = L.map('map', { crs: L.CRS.Simple }).setView(viewCenter, viewZoom);
L.tileLayer(`${mapFolder}/{z}/{x}/{y}.png`, {
  continuousWorld: false,
  noWrap: true,
  minZoom: lowestZoom,
  maxZoom: biggestZoom, // Max zoom level, higher than maxNativeZoom, so when we go higher than maxNativeZoom, we just scale up the images on the map (providing a higher zoom)
  maxNativeZoom: biggestMapFolderZoom, // Maximum zoom level for /map/ folders
  minNativeZoom: shortestMapFolderZoom, // Minimum zoom level for /map/ folders
  attribution: 'By <a href="https://github.com/TaylorHo" target="_blank">@TaylorHo</a> | <a href="https://github.com/TaylorHo/rpg-interactive-map" target="_blank">GitHub</a>'
}).addTo(map);

// Boundaries Variables
if (mapSouthWest && mapNorthEast && mapSouthWest.length > 0 && mapNorthEast.length > 0) {
  map.setMaxBounds(new L.LatLngBounds(mapSouthWest, mapNorthEast));
}

// Coordinate Finder (use to easily get lat and long from the map)
if (showLocationFinderMarker) {
  var coordinateFinderMarker = L.marker(mapCenter, {
    draggable: true, icon: L.AwesomeMarkers.icon({
      icon: "location-crosshairs",
      markerColor: "blue",
    }),
  }).addTo(map);
  coordinateFinderMarker.bindPopup('Lat Lng Marker');
  coordinateFinderMarker.on('dragend', function (e) {
    const { lat, lng } = coordinateFinderMarker.getLatLng();
    markerPos = [lat.toFixed(1), lng.toFixed(1)];
    coordinateFinderMarker.getPopup().setContent(markerPos.join(', ')).openOn(map);
  });
}

// Party position (saved to loalStorage for persistence)
if (showPartyMarker) {
  const initialPartyPosition = JSON.parse(localStorage.getItem('partyPosition') ?? JSON.stringify(initialPartyPositionOnMap));
  var partyMarker = L.marker(initialPartyPosition, {
    draggable: true, icon: L.AwesomeMarkers.icon({
      icon: "circle",
      markerColor: "lightgreen",
    }),
  }).addTo(map);
  partyMarker.bindPopup("You're here!");
  partyMarker.on('dragend', function (e) {
    partyCoordinates = partyMarker.getLatLng();
    partyPosition = [partyCoordinates.lat, partyCoordinates.lng];
    localStorage.setItem('partyPosition', JSON.stringify(partyPosition));
  });
}