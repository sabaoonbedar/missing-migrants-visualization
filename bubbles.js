// --------------------------------------------------
// TODO 2.2
// --------------------------------------------------

// Accessor for bubble size (number of dead and missing)
const sizeValue = (d) => d['Total Dead and Missing'];

// defines the maximum radius of a bubble
const maxRadius = 15;

const Bubbles = ({ data }) => {
  // Guard against missing data
  const safeData = data || [];

  // TODO 4.2: Memoization for size scale
  // Use sqrt so bubble *area* is proportional to the data value
  const sizeScale = React.useMemo(() => {
    const maxVal = d3.max(safeData, sizeValue) || 0;
    return d3.scaleSqrt().domain([0, maxVal]).range([0, maxRadius]);
  }, [safeData]);

  // TODO 2.2: return the bubbles svg definition
  return (
    // Wrap in a group with className for styling
    <g className="bubbleMarks">
      {
        // Map each row to an SVG circle
        safeData.map((d, i) => {
          // Use the global projection to convert [lon, lat] -> [x, y]
          const projected = d.coords ? projection(d.coords) : null;
          if (!projected) return null;
          const [x, y] = projected;

          return (
            <circle
              key={i}
              className="bubble"
              cx={x}
              cy={y}
              r={sizeScale(sizeValue(d))}
              opacity={0.6}
            />
          );
        })
      }
    </g>
  );
};
