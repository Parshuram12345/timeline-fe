import React from "react"
import  ReactDOM  from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.js";
import MobileApp from "./MobileApp";
const resolution = window.innerWidth;
const isMobile = resolution >= 320 && resolution <= 480;
ReactDOM.render(
    <Router>
    {isMobile ? <MobileApp /> : <App />}
    </Router>
,document.getElementById("root"))