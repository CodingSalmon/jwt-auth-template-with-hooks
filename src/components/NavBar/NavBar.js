import React from "react";
import './NavBar.css'

const NavBar = ({ user, handleLogout }) => {
  let nav = user ? 
    <>
      <nav className="nav-bar">
        <div className="nav-wrapper">
          <ul className="right">
            <li>
              <a href={`/user/${user._id}`}>Welcome, {user.name}</a>
            </li>
            <li>
              <a href=" " onClick={handleLogout}>Log Out</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
    :
    <>
      <nav className="nav-bar">
        <div className="nav-wrapper">
          <ul className="right">
            <li>
              <a href="/login">Log In</a>
            </li>
            <li>
              <a href="/signup">Sign Up</a>
            </li>
          </ul>
        </div>
      </nav>
    </>

  return (
    nav
  );
};

export default NavBar;