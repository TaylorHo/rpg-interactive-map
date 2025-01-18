# RPG Interactive Map

An interactive map for tabletop RPGs and fantasy worlds! This project leverages [Leaflet.js](https://leafletjs.com/) and the [leaflet-sidebar](https://github.com/Turbo87/leaflet-sidebar) plugin to create an engaging and dynamic map experience. 

Users can load a fantasy map, add custom markers using a CSV file, and view detailed information about locations through a sidebar.

## Features

- **Interactive Map:** Pan, zoom, and explore fantasy maps rendered with Leaflet.js.
- **Custom Markers:** Define different types of markers via a CSV file for easy customization and management.
- **Sidebar Information:** Click on a marker to open a sidebar with detailed information about the selected location.
- **Flexible Map Integration:** Create maps using popular tools and split them for use in Leaflet.

## Getting Started

### 1. Prepare Your Map

To use a custom fantasy map:
1. Create your map using tools like [Inkarnate](https://inkarnate.com/) or [Azgaar's Fantasy Map Generator](https://azgaar.github.io/Fantasy-Map-Generator/).
2. Split the map into tiles for Leaflet compatibility using the [maptiles](https://github.com/jahed/maptiles) tool:
   ```bash
   ./maptiles my-map.jpeg ./output-folder --square
   ```

### 2. Add Markers

Markers are loaded dynamically from a CSV file. Take a look at the [`locations.csv`](./locations.csv) file

## Usage

1. Clone this repository:
   ```bash
   git clone https://github.com/TaylorHo/rpg-interactive-map.git
   cd rpg-interactive-map
   ```

2. Place your converted/splitted map into `map/` folder.

3. Add your marker data to the CSV file `locations.csv`

4. Host your map into GitHub Pages, Vercel, S3 or Cloudflare Pages (or any other static pages hosting service).
    - For running locally, you can use a tool like `serve` (install with `npm i -g serve`), running in the root folder the command `serve .`.

## Acknowledgments

This project is based on the work by [Brzam](https://github.com/Brzam/leafletjs-dnd-map/). Enhancements include:
- Dynamic loading of markers from a CSV file.
- Added sidebar functionality for location details.

The map used in this project is the one from Brzam's example.

## Contributing

Contributions are welcome! Feel free to:
- Report issues by opening a GitHub Issue.
- Submit improvements through a Pull Request.
- Fork this repository for your own projects.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
