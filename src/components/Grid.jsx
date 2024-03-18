import React, { useState, useEffect } from "react";
import Cell from "./Cell";

function initializeGridAndHeatmap(width, height) {
  const grid = [];
  const heatmap = []; // This array will start with the same structure and values as the grid

  for (let i = 0; i < height; i++) {
    let gridRow = [];
    let heatmapRow = [];

    for (let j = 0; j < width; j++) {
      const cellState = Math.random() < 0.05 ? 1 : 0; // 5% chance of being alive
      gridRow.push(cellState);
      heatmapRow.push(cellState ? 1 : 0); // Initialize heatmap with 0 or cellState if you want them identical
    }

    grid.push(gridRow);
    heatmap.push(heatmapRow);
  }
  // console.log(grid, heatmap);
  return { grid, heatmap };
}

const Grid = ({ width, height }) => {
  const { grid: initialGrid, heatmap: initialHeatmap } =
    initializeGridAndHeatmap(width, height);
  const [grid, setGrid] = useState(initialGrid);
  const [heatmap, setHeatmap] = useState(initialHeatmap);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [livingCellsCount, setLivingCellsCount] = useState(
    () => initialGrid.flat().filter((cell) => cell === 1).length
  );

  // State for autoplay
  const [isAutoplaying, setIsAutoplaying] = useState(false);
  const [autoplayInterval, setAutoplayInterval] = useState(null);

  // Regenerate the grid when width or height changes
  useEffect(() => {
    // setGrid(createInitialGrid());
    const { grid: newGrid, heatmap: newHeatmap } = initializeGridAndHeatmap(
      width,
      height
    );
    setGrid(newGrid);
    setHeatmap(newHeatmap);
  }, [width, height]); // Dependence on width and height

  const toggleCellState = (rowIndex, colIndex) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row, i) =>
        row.map((cell, j) =>
          rowIndex === i && colIndex === j ? 1 - cell : cell
        )
      );
      // Update living cells count based on the new grid state
      setLivingCellsCount(newGrid.flat().filter((cell) => cell === 1).length);
      return newGrid;
    });
    setHeatmap((prevHeatmap) => {
      const newHeatmap = prevHeatmap.map((row, i) =>
        row.map((value, j) => {
          // If the cell state is toggled, reset or adjust its heatmap value
          // This example resets the heatmap value for the toggled cell
          // Adjust the logic here based on how you want to handle heatmap updates
          if (rowIndex === i && colIndex === j) {
            return value === 1 ? 0 : 1; // if value less than 1, toggle to 1, else toggle to 0
          } else {
            return value;
          }
        })
      );
      return newHeatmap;
    });
  };

  const resetGrid = () => {
    const { grid: newGrid, heatmap: newHeatmap } = initializeGridAndHeatmap(
      width,
      height
    ); // Correctly get both newGrid and newHeatmap
    setGrid(newGrid);
    setHeatmap(newHeatmap);
    setLivingCellsCount(newGrid.flat().filter((cell) => cell === 1).length);
  };

  const updateLivingCellCount = (grid) => {
    let count = 0;
    for (let row of grid) {
      for (let cell of row) {
        if (cell === 1) {
          // Assuming 1 represents a living cell
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
    const [newGrid, newHeatmap] = calculateNextGridState(grid, heatmap);

    setGrid(newGrid);
    setHeatmap(newHeatmap);
    const newLivingCellsCount = newGrid
      .flat()
      .filter((cell) => cell === 1).length; // Assuming living cells are marked with 1
    setLivingCellsCount(newLivingCellsCount);
  };

  function calculateNextGridState(grid, heatmap) {
    const height = grid.length;
    const width = grid[0].length;
    const newGrid = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => 0)
    );
    const newHeatmap = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => 0)
    );

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const aliveNeighbors = getAliveNeighbors(grid, i, j, height, width);
        const isAlive = grid[i][j] === 1;

        // Game of Life rules
        if (isAlive && (aliveNeighbors === 2 || aliveNeighbors === 3)) {
          newGrid[i][j] = 1; // Cell stays alive
          newHeatmap[i][j] = 1; // Reset heatmap for living cell
        } else if (!isAlive && aliveNeighbors === 3) {
          newGrid[i][j] = 1; // Cell becomes alive
          newHeatmap[i][j] = 1; // Reset heatmap for new living cell
        } else {
          newGrid[i][j] = 0; // Cell dies or remains dead
          newHeatmap[i][j] = Math.max(heatmap[i][j] - 0.1, 0); // Update heatmap based on cell's previous state
        }
      }
    }

    return [newGrid, newHeatmap];
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

  const toggleAutoplay = () => {
    if (isAutoplaying) {
      clearInterval(autoplayInterval);
      setIsAutoplaying(false);
    } else {
      const intervalId = setInterval(() => {
        advanceSimulation();
      }, 100);
      setAutoplayInterval(intervalId);
      setIsAutoplaying(true);
    }
  };

  return (
    <div>
      <div
        className="App"
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${height}, 20px)`,
          gridTemplateColumns: `repeat(${width}, 20px)`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            //Extract heatmapValue for the current cell using rowIndex and colIndex
            const heatmapValue = heatmap[rowIndex][colIndex];

            return (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                isAlive={cell === 1}
                heatmapValue={heatmapValue}
                showHeatmap={showHeatmap}
                toggleCellState={() => toggleCellState(rowIndex, colIndex)}
              />
            );
          })
        )}
      </div>
      <div className="flex justify-center">
        <div className="flex btn">
          <button onClick={resetGrid}>Reset Grid</button>
          <button onClick={advanceSimulation}>Next Frame</button>
          <button onClick={toggleAutoplay}>
            {isAutoplaying ? "Stop Autoplay" : "Start Autoplay"}
          </button>
          <button onClick={() => setShowHeatmap(!showHeatmap)}>
            {showHeatmap ? "Show Black & White" : "Show Heatmap"}
          </button>
        </div>

        <div className="mt-5">
          <p>Living Cells: {livingCellsCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Grid;
