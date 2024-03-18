import React from "react";

const Cell = ({ isAlive, toggleCellState, heatmapValue, showHeatmap }) => {
  const getColorFromHeatmapValue = (value) => {
    // // Normalize the heatmap value to ensure it fits within the [0, 1] range
    // const normalizedValue = Math.min(Math.max(heatmapValue / 10, 0), 1);

    // Define the color spectrum based on normalized heatmap value
    const spectrum = {
      0: "white",
      0.1: "red",
      0.2: "orange",
      0.3: "yellow",
      0.4: "lightgreen",
      0.5: "darkgreen",
      0.6: "lightblue",
      0.7: "blue",
      0.8: "navy",
      0.9: "magenta",
      1: "purple",
    };

    // Direct mapping of value to spectrum without need for normalization here
    // Assuming value directly corresponds to the age/state of the cell
    const keys = Object.keys(spectrum)
      .map(Number)
      .sort((a, b) => a - b);
    const key = keys.reduce(
      (prevKey, currKey) => (currKey <= value ? currKey : prevKey),
      0
    );

    return spectrum[key];
  };

  // Determine the cell's background color based on its alive/dead state
  const cellStyle = {
    width: "20px",
    height: "20px",
    border: "1px solid #D5D8DC",
    backgroundColor: showHeatmap
      ? getColorFromHeatmapValue(heatmapValue)
      : isAlive
      ? "#2C3E50"
      : "#FBFCFC",
    // backgroundColor: getColor(),
    cursor: "pointer", // Change cursor to indicate clickable
  };

  return (
    <div
      style={cellStyle}
      onClick={toggleCellState} // Toggle state on click
    />
  );
};

export default Cell;
