// Locations and overlays
fetch(`/rpg-interactive-map${locationsCSVFile}`).then(response => response.text()).then(async data => {
  const rows = data.split('\n').slice(1);
  let overlays = getMarkersForOverlays(rows);
  let textTitles = await getTextsForOverlays();

  let newOverlay = getLayersGroupForOverlays(overlays, textTitles);

  if (Object.keys(newOverlay).length !== 0) {
    L.control.layers(null, newOverlay).addTo(map);
  }

  map.on('overlayadd', function (e) {
    toggleOverlayOnLocalStorage(e.name);
  });

  map.on('overlayremove', function (e) {
    toggleOverlayOnLocalStorage(e.name);
  });
});

function getLayersGroupForOverlays(overlays, textTitles) {
  let newOverlay = {};

  const activeOverlays = JSON.parse(localStorage.getItem('activeOverlays') ?? '[]');
  for (const key in overlays) {
    newOverlay[key] = L.layerGroup(overlays[key]);

    if (activeOverlays.includes(key)) {
      newOverlay[key].addTo(map);
    }
  }

  if (textTitles.length > 0) {
    newOverlay['Locations Titles'] = L.layerGroup(textTitles);
    if (activeOverlays.includes('Locations Titles')) {
      newOverlay['Locations Titles'].addTo(map);
    }
  }

  return newOverlay;
}

function getMarkersForOverlays(rows) {
  let overlays = {}

  for (const row of rows) {
    if (!row || row === '') continue;

    const items = row.split(',');
    const [category, overlayMarkerColor, lat, long, icon, text] = items;
    let description = row.split(',').slice(6).join(',');
    description = description.replace(/^"|"$/g, '');

    let iconToUse = L.AwesomeMarkers.icon({
      icon: icon || "circle",
      markerColor: overlayMarkerColor || "blue", // Available colors shown in js/plugins/awesome-markers/images/markers-soft@2x.png
    });

    const marker = L.marker([lat, long], { icon: iconToUse }).bindPopup(`<b>${text}</b>`);
    marker.on('click', (e) => {
      const distanceToParty = (L.CRS.Simple.distance(partyMarker.getLatLng(), marker.getLatLng()) * sizeChangeFactor).toFixed(1); // It's in meters, but depending on the map this can look small, so in the below message we say it's in "Km"
      const distanceInMiles = (distanceToParty * kilometerToMilesConstant).toFixed(1);

      const travelVelocityHtmlContent = travelVelocityRulesLink ? `| <a href="${travelVelocityRulesLink}" target="_blank">Rules</a>` : '';
      const distancesHtmlContent = showPartyMarker ? `
        <p>
          <strong>Distance: ${distanceToParty} km</strong> (${distanceInMiles} miles) ${travelVelocityHtmlContent}<br/>
        </p>
        <p style="font-size: 0.9em;">
          Traveling Fast: ${milesToHours(distanceInMiles, travelSpeed.fast)}<br/>
          Traveling Normal: ${milesToHours(distanceInMiles, travelSpeed.normal)}<br/>
          Traveling Slow: ${milesToHours(distanceInMiles, travelSpeed.slow)}
          </p>
        <br/>
        ` : '<br/>';

      sidebar.setContent(`
        <h1>${text}</h1>
        ${distancesHtmlContent}
        <strong>Description:</strong>
        <p>${description}</p>
      `);
      sidebar.show();
    });

    const styledOverlayMarkerColor = `<span class="marker ${overlayMarkerColor}">${category}</span>`;

    if (!overlays[styledOverlayMarkerColor]) {
      overlays[styledOverlayMarkerColor] = [marker];
    } else {
      overlays[styledOverlayMarkerColor].push(marker);
    }
  }

  return overlays;
}

async function getTextsForOverlays() {
  const locationNames = [];

  const rows = await fetch(`/rpg-interactive-map${locationsTitlesCSVFile}`).then(response => response.text()).then(data => {
    return data.split('\n').slice(1);
  });

  for (const row of rows) {
    if (!row || row === '') continue;

    const items = row.split(',');
    const [title, lat, long, size] = items;

    const fontSize = parseInt(size);
    const fontFamily = "IM Fell English SC";
    const textPadding = 10;

    // Measure text width using a canvas
    const textWidth = (() => {
      const canvas = document.createElement("canvas").getContext("2d");
      canvas.font = `${fontSize}px ${fontFamily}`;
      return canvas.measureText(title).width;
    })();

    // SVG dimensions
    const svgWidth = (textWidth + textPadding) * 2;
    const svgHeight = (fontSize + textPadding) * 2;

    // Create the SVG string
    const element = `
      <svg viewBox="0 0 ${svgWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="text-shadow">
            <feDropShadow dx="4" dy="4" stdDeviation="6" flood-color="black" />
          </filter>
        </defs>
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
              font-family="${fontFamily}" font-size="${fontSize}" fill="none" stroke="#212121" stroke-width="8">
          ${title}
        </text>
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
              font-family="${fontFamily}" font-size="${fontSize}" fill="#fff" filter="url(#text-shadow)">
          ${title}
        </text>
      </svg>
    `;

    const position = [parseFloat(lat), parseFloat(long)];
    const bounds = [[position[0] - (svgHeight / 50), position[1] - (svgWidth / 50)], [position[0] + (svgHeight / 50), position[1] + (svgWidth / 50)]];
    const svgOverlay = L.svgOverlay(
      new DOMParser().parseFromString(element, 'image/svg+xml').documentElement,
      bounds
    );

    locationNames.push(svgOverlay);
  }

  return locationNames;
}

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

  return `${hours}h ${minutes.toFixed(0)} min`;
}