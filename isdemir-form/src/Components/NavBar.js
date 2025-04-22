import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">İSDEMİR</div>
      <ul className="navbar-links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/user">User Registration</a>
        </li>
        <li>
          <a href="/add">Add Report</a>
        </li>
        <li>
          <a href="/view">View Report</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
