
function createIcon(iconName) {
  return L.icon({
    iconUrl: `/icons/${iconName}.png`,
    iconRetinaUrl: `/icons/${iconName}.png`,
    shadowUrl: '/icons/shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });
}

const icons = {
  city: createIcon("city"),
  cityCapital: createIcon("cityCapital"),
  cityPort: createIcon("cityPort"),
  fort: createIcon("fort"),
  fortTower: createIcon("fortTower"),
  mageTower: createIcon("mageTower"),
  poi: createIcon("poi"),
  temple: createIcon("temple"),
  town: createIcon("town"),
  trade: createIcon("trade"),
}
