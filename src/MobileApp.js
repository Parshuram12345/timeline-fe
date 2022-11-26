import React from 'react'
import HomePageMobile from './mobile/Home/HomePageMobile';
import {Route,Routes} from "react-router-dom";
import "./styles/Mobile.css";
import InnerTimelinePageMobile from './mobile/InnerTimelinePageMobile/index';
import { Provider } from 'react-redux';
import { store } from "./Redux/store";
import SharedItem from "./components/HeroComponentMobile/Shared/SharedItem"

function MobileApp() {
  return (
    <div>
      <Provider store={store}>
      <Routes>
        <Route exact path="/" element={ <HomePageMobile/>} />
        <Route exact path="/innertimeline/:timelineId" element={ <InnerTimelinePageMobile/>} />
        <Route exact path="/sharedtimeline/:timelineId" element={<SharedItem/>} />
      </Routes>
      </Provider>
    </div>
  )
}
export default MobileApp;