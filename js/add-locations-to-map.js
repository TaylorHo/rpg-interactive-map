// Locations and overlays
fetch('/locations.csv').then(response => response.text()).then(data => {
  const rows = data.split('\n').slice(1);
  let overlays = {}

  for (const row of rows) {
    const items = row.split(',');
    const [category, lat, long, icon, text] = items;
    let description = row.split(',').slice(5).join(',');
    description = description.replace(/^"|"$/g, '');

    const marker = L.marker([lat, long], { icon: icons[icon] }).bindPopup(`<b>${text}</b>`);
    marker.on('click', (e) => {
      sidebar.setContent(`<h1>${category}</h1><p>${description}</p>`);
      sidebar.show();
    });

    if (!overlays[category]) {
      overlays[category] = [marker];
    } else {
      overlays[category].push(marker);
    }
  }

  let newOverlay = {};

  for (const key in overlays) {
    // Layers start hidden by default. You can add a ".addTo(map)" at the final of the below line to show them on the map load.
    newOverlay[key] = L.layerGroup(overlays[key]);
  }

  L.control.layers(null, newOverlay).addTo(map);
});