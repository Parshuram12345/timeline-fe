import React from "react"
import  ReactDOM  from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MobileApp from "./MobileApp";
import MainApp from "./MainApp.jsx";
const resolution = window.innerWidth;
const isMobile = resolution >= 320 && resolution <= 480;
ReactDOM.render(
    <Router>
    {isMobile ? <MobileApp /> : <MainApp />}
    </Router>
,document.getElementById("root"))