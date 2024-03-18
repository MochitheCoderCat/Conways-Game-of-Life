import React from "react";
import Navbar from "../components/Navbar";

function Credits() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Credits</h1>
        <ul>
          <li className="names">
            <span>Qianyun Wang: </span>
            <a href="https://github.com/MochitheCoderCat/Conways-Game-of-Life.git">
              Github
            </a>
          </li>
          <li className="names">
            <span>Shanshan Wu: </span>
            <a href="https://github.com/Shan533/Shanshan-Wu-Qianyun-Wang-assignment2.git">
              Github
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Credits;
