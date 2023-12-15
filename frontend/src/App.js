// import logo from "./logo.svg";
import "./App.scss";
import React from "react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="sidenav-container"></div>
        <div className="app-content">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default App;
