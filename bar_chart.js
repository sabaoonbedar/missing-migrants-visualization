
// ========== AxisLeft ==========
const AxisLeft = ({ yScale, innerWidth, tickOffset = 8 }) => {
  const ticks = yScale.ticks();
  return (
    <g className="y-axis">
      {ticks.map((tickValue) => (
        <g
          className="tick"
          key={tickValue}
          transform={`translate(0, ${yScale(tickValue)})`}
        >
          {/* grid line across the chart */}
          <line x1={0} x2={innerWidth} />
          {/* tick label */}
          <text
            x={-tickOffset}
            dy="0.32em"
            style={{ textAnchor: "end" }}
          >
            {tickValue}
          </text>
        </g>
      ))}
    </g>
  );
};

// ========== AxisBottom ==========
const AxisBottom = ({ xScale, innerHeight, tickOffset = 10, timeFormatFn }) => {
  const ticks = xScale.ticks();
  return (
    <g className="x-axis" transform={`translate(0, ${innerHeight})`}>
      {ticks.map((tickValue) => (
        <g
          className="tick"
          key={+tickValue}
          transform={`translate(${xScale(tickValue)}, 0)`}
        >
          {/* vertical grid line */}
          <line y1={0} y2={-innerHeight} />
          {/* tick label */}
          <text
            y={tickOffset}
            dy="0.71em"
            style={{ textAnchor: "middle" }}
          >
            {timeFormatFn ? timeFormatFn(tickValue) : tickValue}
          </text>
        </g>
      ))}
    </g>
  );
};

// ========== Bars ==========
const Bars = ({ bins, xScale, yScale, innerHeight }) => {
  return (
    <g className="bars">
      {bins.map((bin, i) => {
        const x0 = xScale(bin.x0);
        const x1 = xScale(bin.x1);
        const barWidth = Math.max(0, x1 - x0 - 1);
        const barHeight = innerHeight - yScale(bin.y);
        return (
          <rect
            className="bar"
            key={i}
            x={x0}
            y={yScale(bin.y)}
            width={barWidth}
            height={barHeight}
          />
        );
      })}
    </g>
  );
};

// --------------------------------------------------
// TODO 3.1: y accessor and axis label (Completed)
// --------------------------------------------------
const yValue = (d) => d['Total Dead and Missing'];   // total dead & missing per row
const yAxisLabel = 'Total Dead & Missing';

// variables for the offset of the axis label
const yAxisLabelOffset = 30;

// margin (small gaps on the sides of the bar chart)
const margin = { top: 0, right: 30, bottom: 20, left: 45 };

// TODO 3.2: Define a time format using d3.timeFormat
const timeFormat = d3.timeFormat('%b %Y'); // e.g., "Jan 2019"

// --------------------------------------------------
// TODO 4.1: brush extent setter as parameter (implemented)
// --------------------------------------------------
const Histogram = ({ width, height, data, setBrushExtent }) => {
  // Guard
  const safeData = data || [];

  // --------------------------------------------------
  // TODO 3.1: inner chart size (Completed)
  // --------------------------------------------------
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // --------------------------------------------------
  // TODO 3.1: x accessor for dates (Completed)
  // --------------------------------------------------
  const xValue = (d) => d['Reported Date'];

  // --------------------------------------------------
  // TODO 3.1: xScale (time) + nice; TODO 4.2: memoize
  // --------------------------------------------------
  const xDomain = React.useMemo(
    () => d3.extent(safeData, xValue),
    [safeData]
  );

  const xScale = React.useMemo(() => {
    const scale = d3.scaleTime()
      .domain(xDomain)
      .range([0, innerWidth])
      .nice();
    return scale;
  }, [xDomain, innerWidth]);

  // Start/end from domain (if needed elsewhere)
  const [xStart, xEnd] = xScale.domain();

  // --------------------------------------------------
  // TODO 3.1: aggregate into time bins; TODO 4.2: memoize
  // Bin by time (e.g., monthly) and sum yValue within each bin.
  // --------------------------------------------------
  const bins = React.useMemo(() => {
    if (!xStart || !xEnd) return [];

    // Use scale ticks as thresholds for time bins
    const thresholds = xScale.ticks(30); // adjust bin count if desired

    const binner = d3.bin()
      .value(xValue)
      .domain([xStart, xEnd])
      .thresholds(thresholds);

    const rawBins = binner(safeData);

    // Attach the aggregated sum to each bin as .y
    rawBins.forEach((bin) => {
      bin.y = d3.sum(bin, yValue);
    });

    return rawBins;
  }, [safeData, xScale, xStart, xEnd]);

  // --------------------------------------------------
  // TODO 3.2: yScale (linear) based on binned sums; TODO 4.2: memoize
  // --------------------------------------------------
  const yMax = React.useMemo(() => d3.max(bins, (b) => b.y) || 0, [bins]);

  const yScale = React.useMemo(() => {
    return d3.scaleLinear()
      .domain([0, yMax])
      .range([innerHeight, 0])
      .nice();
  }, [yMax, innerHeight]);

  // --------------------------------------------------
  // TODO 4.1: Brush setup with useRef + useEffect
  // --------------------------------------------------
  const brushRef = React.useRef(null);

  React.useEffect(() => {
    if (!brushRef.current) return;

    // Horizontal brush over the plotting area
    const brush = d3.brushX()
      .extent([[0, 0], [innerWidth, innerHeight]]);

    const g = d3.select(brushRef.current);
    g.call(brush);

    // On brush end, set the extent (as Dates) or clear
    const onBrushEnd = (event) => {
      const sel = event.selection;
      if (sel) {
        const [x0, x1] = sel.map(xScale.invert);
        if (setBrushExtent) setBrushExtent([x0, x1]);
      } else {
        if (setBrushExtent) setBrushExtent(null);
      }
    };

    g.on('brush end', (event) => onBrushEnd(event));

    // Cleanup: remove listeners and brush
    return () => {
      g.on('.brush', null);
    };
  }, [innerWidth, innerHeight, xScale, setBrushExtent]);

  return (
    <>
      {/* Background */}
      <rect width={width} height={height} fill="white" />

      {/* Plot group with margins */}
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {/* Axes */}
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={8} />
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickOffset={10}
          timeFormatFn={timeFormat}
        />

        {/* Bars */}
        <Bars bins={bins} xScale={xScale} yScale={yScale} innerHeight={innerHeight} />

        {/* Y axis label */}
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>

        {/* Brush layer */}
        <g ref={brushRef} />
      </g>
    </>
  );
};
