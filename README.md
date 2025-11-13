# Missing Migrants – Interactive Map & Timeline (React + D3)

This project is an interactive data visualization tool that maps global missing migrant incidents and displays how these incidents change over time. It combines a world map with a time-based histogram, allowing users to explore migration-related tragedies both **geographically** and **temporally**.

This project was collaboratively developed by **Umi**, **Sabaoon**, and **Anfal**.

---

##  Overview

The visualization highlights incidents involving missing migrants around the world. Each incident is plotted on a global map as a bubble whose size corresponds to the number of people reported dead or missing. Below the map, a histogram shows how these incidents are distributed over time.

Users can interact with the histogram by selecting a specific time range using a brushing tool. When a time range is selected, the map updates dynamically to show only incidents that occurred within that period. This interaction creates a strong link between **time-based trends** and **geographical patterns**, allowing deeper investigation into global migration crises.

The overall purpose of this project is to provide a meaningful, data-driven, and visually intuitive representation of the Missing Migrants dataset.

---

##  Key Features

### 1. World Map Visualization
- Displays a global map using TopoJSON geometry.
- Plots each missing migrant incident as a bubble.
- Bubble size represents the **Total Dead and Missing** count.
- Positions are accurate based on geographic coordinates from the dataset.

### 2. Time Histogram
- Aggregates incidents by their **Reported Date**.
- Groups data using D3’s time binning.
- Shows how incidents vary month-to-month or year-to-year.

### 3. Interactive Brush Tool
- Users can drag on the histogram to select a time range.
- The map updates instantly to reflect the selected dates.
- Enables detailed comparisons of different time periods.

### 4. React + D3 Integration
- React handles state management, rendering, and structure.
- D3 is responsible for:
  - Scales and axes  
  - Time formatting  
  - Histogram binning  
  - Brush interaction  
  - Geographic projection  
- Performance optimizations using `useMemo`.

---

##  Technology Stack

- **React** (components, hooks, rendering logic)
- **D3.js** (binning, axes, scales, brushing, projections)
- **TopoJSON** (lightweight world map geometry)
- **SVG** (rendering all graphical elements)
- JavaScript (ES6+) and functional component architecture

---

##  Data Sources

### 1. World Atlas (TopoJSON)
URL:  
`https://unpkg.com/world-atlas@2.0.2/countries-50m.json`

Used to render:
- Land masses  
- Country borders  

### 2. Missing Migrants Dataset (CSV)
URL:  
`https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv`

Important fields:
- **Location Coordinates** → transformed into `[longitude, latitude]`
- **Total Dead and Missing** → converted into numeric values
- **Reported Date** → parsed as JavaScript `Date` objects

---

##  Core Components

### `App` (Main Component)
- Loads data via custom hooks.
- Manages the selected date range via `brushExtent`.
- Filters data according to the selected dates.
- Renders:
  - World map components  
  - Bubble markers  
  - Histogram with brushing  

### `useWorldAtlas` Hook
- Fetches and processes the TopoJSON world atlas.
- Converts topology to GeoJSON for rendering.

### `useData` Hook
- Fetches and parses the CSV dataset.
- Cleans and transforms each row:
  - Geographic coordinates  
  - Numeric totals  
  - Dates  

### `Bubbles`
- Maps each incident to a bubble on the world map.
- Uses D3’s geographic projection.
- Bubble size is computed using a square-root scale.

### `Histogram`
- Bins data over time using D3.
- Renders bars, axes, and labels.
- Implements brushing to select a time range.
- Communicates the selected range back to `App`.

---

## Purpose and Use Case

This visualization tool can support:

- Researchers studying migration trends  
- Humanitarian organizations monitoring crisis hotspots  
- Students learning about data visualization  
- Developers exploring React + D3 integration  
- Journalists analyzing patterns in migrant incidents  

By linking geography and timeline data, the tool helps reveal important insights about when and where the highest migration risks occur.

---

##  How to Run
python -m http.server 8000
