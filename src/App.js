import React from "react";
import "./styles/index.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./views/Home/HomePage";
import InnerTimelinePage from "./views/InnerTimelinePage";
import SharedTimeline from "./components/HeroComponentsPC/innerSharedTimeline/SharedTimeline";


function App() {
  return (
    <>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/innertimeline/:timelineId" element={<InnerTimelinePage />} />
          <Route path="/sharedtimeline/:timelineId" element={<SharedTimeline />} />
        </Routes>
    </>
  );
}

export default App;
