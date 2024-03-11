import React, { useState, useEffect } from 'react';
import Cell from "./Cell";

const Grid = ({ width, height }) => {
  const createInitialGrid = () => {
    let initialGrid = [];
    for (let i = 0; i < height; i++) {
      let row = [];
      for (let j = 0; j < width; j++) {
        row.push(Math.random() < 0.05 ? 1 : 0); // 5% chance of being alive
      }
      initialGrid.push(row);
    }
    return initialGrid;
  };

  const [grid, setGrid] = useState(createInitialGrid);

  // Regenerate the grid when width or height changes
  useEffect(() => {
    setGrid(createInitialGrid());
  }, [width, height]); // Dependence on width and height

  const toggleCellState = (rowIndex, colIndex) => {
    const newGrid = grid.map((row, i) =>
      row.map((cell, j) =>
        rowIndex === i && colIndex === j ? 1 - cell : cell
      )
    );
    setGrid(newGrid);
  };

  return (
    <div style={{ display: 'grid', gridTemplateRows: `repeat(${height}, 20px)`, gridTemplateColumns: `repeat(${width}, 20px)` }}>
      {grid.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            isAlive={cell === 1}
            toggleCellState={() => toggleCellState(rowIndex, colIndex)}
          />
        ))
      ))}
    </div>
  );
};

export default Grid;
