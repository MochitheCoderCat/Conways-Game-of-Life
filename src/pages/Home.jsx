import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          Welcome to Conway's Game of Life
        </h1>
        <p className="text-lg">
          Conway's Game of Life is a cellular automaton devised by the British
          mathematician John Horton Conway in 1970. It's a zero-player game,
          meaning that its evolution is determined by its initial state,
          requiring no further input.
        </p>
        <h2 className="text-3xl font-bold mt-4">Rules of the Game</h2>
        <ul className="list-disc ml-5 mt-2">
          <li>
            Any live cell with fewer than two live neighbours dies, as if by
            underpopulation.
          </li>
          <li>
            Any live cell with two or three live neighbours lives on to the next
            generation.
          </li>
          <li>
            Any live cell with more than three live neighbours dies, as if by
            overpopulation.
          </li>
          <li>
            Any dead cell with exactly three live neighbours becomes a live
            cell, as if by reproduction.
          </li>
        </ul>
        <Link to="/game">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Start Game
          </button>
        </Link>
      </div>
    </>
  );
}

export default Home;
