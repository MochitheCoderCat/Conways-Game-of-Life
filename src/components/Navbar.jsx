import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

const Navbar = () => {
  return (
    <div className="fixed top-10 left-0 right-0 z-10 bg-white shadow-md navbar">
      <Menu mode="horizontal">
        <Menu.Item key="home" className="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="game">
          <Link to="/game">Game</Link>
        </Menu.Item>
        <Menu.Item key="credits">
          <Link to="/credits">Credits</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
