import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Credits from "./pages/Credits";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/game" element={<Game />}></Route>
          <Route path="/credits" element={<Credits />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
