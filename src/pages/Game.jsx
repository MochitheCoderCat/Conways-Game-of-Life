import React, { useState } from "react";
import Grid from "../components/Grid";
import { message } from "antd";
import Navbar from "../components/Navbar";

const App = () => {
  // State for grid size
  const [gridSize, setGridSize] = useState({ width: 20, height: 20 });
  // console.log("first grid" + gridSize);

  // State for input fields
  const [inputWidth, setInputWidth] = useState(20);
  const [inputHeight, setInputHeight] = useState(20);

  const [isLongerLastingActive, setIsLongerLastingActive] = useState(false);

  // Handle change in input fields
  const handleWidthChange = (e) => {
    setInputWidth(e.target.value);
  };

  const handleHeightChange = (e) => {
    setInputHeight(e.target.value);
  };

  // Handle grid size change on form submission
  const handleGridSizeChange = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    const widthVal = parseInt(inputWidth, 10);
    const heightVal = parseInt(inputHeight, 10);

    if (widthVal >= 3 && widthVal <= 40 && heightVal >= 3 && heightVal <= 40) {
      setGridSize({ width: widthVal, height: heightVal });
    } else {
      message.error(
        "Please enter values between 3 and 40 for both width and height."
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="App">
        <h1>Conway's Game of Life</h1>
        <div className="App">
          <form onSubmit={handleGridSizeChange}>
            <label>
              Width:
              <input
                type="number"
                value={inputWidth}
                onChange={handleWidthChange}
                min="3"
                max="40"
                placeholder="Width"
              />
            </label>
            <label>
              Height:
              <input
                type="number"
                value={inputHeight}
                onChange={handleHeightChange}
                min="3"
                max="40"
                placeholder="Height"
              />
            </label>
            <label>
              <input
                type="checkbox"
                checked={isLongerLastingActive}
                onChange={(e) => setIsLongerLastingActive(e.target.checked)}
              />
              Longer Lasting
            </label>

            <button type="submit">Set Grid Size</button>
          </form>
        </div>
        <div className="App">
          <Grid width={gridSize.width} height={gridSize.height} />
        </div>
      </div>
    </>
  );
};

export default App;
