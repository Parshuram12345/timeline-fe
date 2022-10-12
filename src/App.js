import React from 'react';
import "./styles/index.css";
import {Route,Routes} from "react-router-dom"
import HomePage from './views/Home/HomePage';
import InnerTimelinePage from './views/InnerTimelinePage';

function App() {
  return (
    <>
    <Routes>
      <Route exact path="/" element={ <HomePage/>} />
      <Route  path="/innertimeline" element={ <InnerTimelinePage/>} />
    </Routes>
       
    </>
  )
}

export default App