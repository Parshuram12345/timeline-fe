import React from "react";
import "./styles/index.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./views/Home/HomePage";
import InnerTimelinePage from "./views/InnerTimelinePage";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/innertimeline" element={<InnerTimelinePage />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
