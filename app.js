const App = () => {
  const width = 960;
  const height = 500;
  const dateHistogramSize = 0.2;

  const [brushExtent, setBrushExtent] = React.useState(null);
  const worldAtlas = useWorldAtlas();
  const data = useData();

  const xValue = (d) => d['Reported Date'];

  // Always call hooks (don’t skip them)
  const filteredData = React.useMemo(() => {
    if (!data) return [];
    if (!brushExtent) return data;
    const [start, end] = brushExtent;
    return data.filter((d) => {
      const x = xValue(d);
      return x >= start && x <= end;
    });
  }, [data, brushExtent]);

  const histHeight = dateHistogramSize * height;
  const mapHeight = height - histHeight;

  // Instead of returning early, define isLoading and handle it in JSX
  const isLoading = !worldAtlas || !data;

  return (
    <>
      <Introduction data={data || null} />

      {isLoading ? (
        <div className="loading">Loading data…</div>
      ) : (
        <svg width={width} height={height}>
          <g>
            <WorldGraticule />
            <Countries worldAtlas={worldAtlas} />
            <Bubbles data={filteredData} />
          </g>

          <g transform={`translate(0, ${mapHeight})`}>
            <Histogram
              width={width}
              height={histHeight}
              data={data}
              setBrushExtent={setBrushExtent}
            />
          </g>
        </svg>
      )}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
