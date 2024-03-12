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

  // set Living Cells State
  const [livingCellsCount, setLivingCellsCount] = useState(0);

  const resetGrid = () => {
    // Functionality to reset the grid to its initial state
    // Update livingCellsCount as needed
    const newGrid = createInitialGrid(); // Assuming createInitialGrid() is your method for initializing the grid
    setGrid(newGrid);

    // const newHeatmap = createInitialHeatmap(); // Initialize or reset your heatmap here
    // setHeatmap(newHeatmap);

    const newLivingCellsCount = newGrid.flat().filter(cell => cell === 1).length; // Assuming living cells are marked with 1
    setLivingCellsCount(newLivingCellsCount);
  };

  const updateLivingCellCount = (grid) => {
    let count = 0;
    for (let row of grid) {
      for (let cell of row) {
        if (cell === 1) { // Assuming 1 represents a living cell
          count += 1;
        }
      }
    }
    setLivingCellsCount(count);
  };

  useEffect(() => {
    updateLivingCellCount(grid);
  }, [grid]); // Recalculate whenever the grid changes



  const advanceSimulation = () => {
    // Functionality to advance the simulation by one step
    // update the grid state and the heatmap state
    // update livingCellsCount based on the new grid state
    const newGrid = calculateNextGridState(grid);
  
    setGrid(newGrid);
    const newLivingCellsCount = newGrid.flat().filter(cell => cell === 1).length; // Assuming living cells are marked with 1
    setLivingCellsCount(newLivingCellsCount);
  };


  function calculateNextGridState(grid) {
    const height = grid.length;
    const width = grid[0].length;
    const newGrid = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
  
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const aliveNeighbors = getAliveNeighbors(grid, i, j, height, width);
        const isAlive = grid[i][j] === 1;
  
        // Game of Life rules
        if (isAlive && (aliveNeighbors === 2 || aliveNeighbors === 3)) {
          newGrid[i][j] = 1; // Cell stays alive
        } else if (!isAlive && aliveNeighbors === 3) {
          newGrid[i][j] = 1; // Cell becomes alive
        } else {
          newGrid[i][j] = 0; // Cell dies or remains dead
        }
      }
    }
  
    return newGrid;
  }
  
  // Helper function to count alive neighbors
  function getAliveNeighbors(grid, x, y, height, width) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue; // Skip the cell itself
        const nx = x + i;
        const ny = y + j;
        if (nx >= 0 && nx < height && ny >= 0 && ny < width) {
          count += grid[nx][ny];
        }
      }
    }
    return count;
  }

  
  


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
      {/* Render the grid here */}
      <div>
      <button onClick={resetGrid} >Reset Grid</button>
      <button onClick={advanceSimulation}>Next Step</button>
      <div class="box">Living Cells: {livingCellsCount}</div>
      </div>

    </div>
  );
};

export default Grid;
