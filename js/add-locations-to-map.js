const kilometerToMilesConstant = 0.6213712;
const sizeChangeFactor = 1; // Use to make distances longer (decresing this value) or shorter (increasing this value). Usefull for different map sizes.

// Travel speeds from D&D
const travelSpeed = {
  slow: 2,
  medium: 3,
  fast: 4,
};

// Locations and overlays
fetch('/rpg-interactive-map/locations.csv').then(response => response.text()).then(data => {
  const rows = data.split('\n').slice(1);
  let overlays = {}

  for (const row of rows) {
    const items = row.split(',');
    const [category, lat, long, icon, text] = items;
    let description = row.split(',').slice(5).join(',');
    description = description.replace(/^"|"$/g, '');

    const marker = L.marker([lat, long], { icon: icons[icon] }).bindPopup(`<b>${text}</b>`);
    marker.on('click', (e) => {
      const distanceToParty = (L.CRS.Simple.distance(partyMarker.getLatLng(), marker.getLatLng()) * sizeChangeFactor).toFixed(1); // It's in meters, but depending on the map this can look small, so in the below message we say it's in "Km"
      const distanceInMiles = (distanceToParty * kilometerToMilesConstant).toFixed(1);
      sidebar.setContent(`
        <h1>${category}</h1>
        <p>
          <strong>Distance: ${distanceToParty} km</strong> (${distanceInMiles} miles)<br/>
          Fast travel: ${milesToHours(distanceInMiles, travelSpeed.fast)} hours<br/>
          Medium travel: ${milesToHours(distanceInMiles, travelSpeed.medium)} hours<br/>
          Slow travel: ${milesToHours(distanceInMiles, travelSpeed.slow)} hours
        </p>
        <br/>
        <strong>Description:</strong>
        <p>${description}</p>
      `);
      sidebar.show();
    });

    if (!overlays[category]) {
      overlays[category] = [marker];
    } else {
      overlays[category].push(marker);
    }
  }

  let newOverlay = {};

  const activeOverlays = JSON.parse(localStorage.getItem('activeOverlays') ?? '[]');
  for (const key in overlays) {
    newOverlay[key] = L.layerGroup(overlays[key]);

    if (activeOverlays.includes(key)) {
      newOverlay[key].addTo(map);
    }
  }

  L.control.layers(null, newOverlay).addTo(map);

  map.on('overlayadd', function (e) {
    toggleOverlayOnLocalStorage(e.name);
  });

  map.on('overlayremove', function (e) {
    toggleOverlayOnLocalStorage(e.name);
  });
});

function toggleOverlayOnLocalStorage(overlay) {
  const activeOverlays = JSON.parse(localStorage.getItem('activeOverlays') ?? '[]');

  const overlayIndex = activeOverlays.indexOf(overlay);

  if (overlayIndex > -1) {
    activeOverlays.splice(overlayIndex, 1);
  } else {
    activeOverlays.push(overlay);
  }

  localStorage.setItem('activeOverlays', JSON.stringify(activeOverlays));
}

function milesToHours(distance, speed) {
  const hours = Math.floor(distance / speed);
  const minutes = (parseFloat((distance / speed).toFixed(2)) - hours) * 60;

  // return { hours, minutes };

  return `${hours}h ${minutes.toFixed(0)} min`;
}