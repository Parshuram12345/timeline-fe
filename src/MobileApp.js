import React from 'react'
import HomePageMobile from './mobile/Home/HomePageMobile';
import {Route,Routes} from "react-router-dom";
import "./styles/Mobile.css";
import InnerTimelinePageMobile from './mobile/InnerTimelinePageMobile/index';

function MobileApp() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={ <HomePageMobile/>} />
        <Route exact path="/innertimeline" element={ <InnerTimelinePageMobile/>} />
      </Routes>
    </div>
  )
}
export default MobileApp;