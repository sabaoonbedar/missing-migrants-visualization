// --------------------------------------------------
// TODO 1.2 and 1.4
// --------------------------------------------------

// Accept the data prop so we can show dynamic metrics
const Introduction = ({ data }) => {
  // Intro text (static)
  const introText =
    "This visualization explores incidents involving missing and deceased migrants around the world over time.";

  // Dynamic metrics (render only when data is available)
  let dataMetrics = "";
  if (data && data.length > 0) {
    const rows = data.length;
    const cols = Object.keys(data[0]).length;
    dataMetrics = " The dataset contains " + rows + " rows and " + cols + " columns.";
  }

  return (
    <>
      {/* Subtitle for the description */}
      <div className="introTitle">
        Description
        <br />
      </div>

      {/* Intro text and dynamic metrics */}
      <div className="intro">
        {introText + dataMetrics}
      </div>
    </>
  );
};


// --------------------------------------------------
// TODO 1.5 (World Sphere and Graticule)
// --------------------------------------------------

// Projection + path + graticule generators
const projection = d3.geoNaturalEarth1();                 // You can try geoEquirectangular / geoMercator later
const path = d3.geoPath(projection);
const graticule = d3.geoGraticule();

const WorldGraticule = ({ width, height }) => {
  // TODO 4.2: Memoization for sphere and graticules
  const spherePath = React.useMemo(() => path({ type: "Sphere" }), []);
  const graticulePath = React.useMemo(() => path(graticule()), []);

  // NOTE: width/height props are accepted but not required to draw sphere/graticule.
  // We keep them in case styling/positioning needs them later.

  return (
    // TODO 1.5: add className worldGraticule to style with information from css to the g tag
    <g className="worldGraticule">
      {/* TODO 1.5: draw a sphere under the projection */}
      <path className="sphere" d={spherePath} />

      {/* TODO 1.5: draw the graticule */}
      <path className="graticule" d={graticulePath} />
    </g>
  );
};


// --------------------------------------------------
// TODO 2.1 (Countries)
// --------------------------------------------------

// the data we work on is composed of land and interiors (use destructuring)
const Countries = ({ worldAtlas: { land, interiors } }) => {
  // TODO 4.2: Memoization for land and interiors path strings
  const landPaths = React.useMemo(() => {
    if (!land || !land.features) return [];
    return land.features.map((feature) => path(feature));
  }, [land]);

  const interiorsPath = React.useMemo(() => {
    if (!interiors) return null;
    return path(interiors);
  }, [interiors]);

  return (
    // TODO 2.1: create a group with class name countries for styling that wraps the following JS scope
    <g className="countries">
      <>
        {/* TODO 2.1: map the land features to path elements that draw the land masses */}
        {landPaths.map((dStr, i) => (
          <path key={i} className="land" d={dStr} />
        ))}

        {/* TODO 2.1: draw another path for the interiors */}
        {interiorsPath && <path className="interiors" d={interiorsPath} />}
      </>
    </g>
  );
};
