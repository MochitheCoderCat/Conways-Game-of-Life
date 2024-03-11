import React from 'react';

const Cell = ({ isAlive, toggleCellState }) => {
  // Determine the cell's background color based on its alive/dead state
  const cellStyle = {
    width: '20px',
    height: '20px',
    border: '1px solid black',
    backgroundColor: isAlive ? 'black' : 'white',
    cursor: 'pointer' // Change cursor to indicate clickable
  };

  return (
    <div
      style={cellStyle}
      onClick={toggleCellState} // Toggle state on click
    />
  );
};

export default Cell;
