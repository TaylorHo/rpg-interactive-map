const kilometerToMilesConstant = 0.6213712; // 1 km = 0.6213712 miles
const sizeChangeFactor = 0.4; // Use to make distances longer (increasing this value) or shorter (decresing this value). Usefull for different map sizes.

// Travel speeds from D&D (values in miles per hour)
const travelSpeed = {
  slow: 2,
  normal: 3,
  fast: 4,
};

const locationsCSVFile = '/locations.csv'; // Change to load the locations markers from a different file
const locationsTitlesCSVFile = '/location-titles.csv'; // Change to load the locations markers from a different file
const mapFolder = '/map'; // Load the map from a folder other han /map (remember to slice the map using maptiles)
const nameOfTheMapOrPage = 'RPG Map'; // Name to be used as the title of the HTML page

const biggestMapFolderZoom = 6; // Maximum folder level (eg. /map/6/)
const shortestMapFolderZoom = 3; // Minimum folder level (eg. /map/1/)
const biggestZoom = 7; // Maximum zoom level, if higher than biggestMapFolderZoom it will zoom in the image ignoring quality
const lowestZoom = 3; // Lowest possible zoom

const mapCenter = [-130, 123]; // Coordinates for the center of the map
const initialPartyPositionOnMap = [-140, 150];

const showPartyMarker = true; // Show the party marker, useful to get distances to other markers
const showLocationFinderMarker = false; // Used to get the lat and long from the map, visualy, so it's easy to add coordinates to the CSV file
const travelVelocityRulesLink = "https://roll20.net/compendium/dnd5e/Movement#content";

const mapSouthWest = [-210, 255]; // Leave empty to remove map bounds, or add the value of for your map (use the showLocationFinderMarker if needed)
const mapNorthEast = [-55, 10]; // Leave empty to remove map bounds, or add the value of for your map (use the showLocationFinderMarker if needed)
