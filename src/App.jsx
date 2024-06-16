import React from "react";
import { BrowserRouter, Link, Routes } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div>
          <nav
            data-testid="nav-bar"
            className="navbar navbar-expand-lg navbar-light  bg-custom"
          >
            <Link className="nav-link" style={{ fontFamily: "cursive" }} to="">
              BONSTAY
            </Link>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="">
                  Hotels
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="">
                  Bookings
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="">
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
          <Routes>{/*configure the Route's */}</Routes>
        </div>
      </BrowserRouter>
    
    </>
  );
};

export default App;
