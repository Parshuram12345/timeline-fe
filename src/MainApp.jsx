import React from 'react'
import App from './App'
import SideNavbar from './components/common/SideNavbar/sideNavbar'
// import TopNavbar from './components/common/TopNavbar/topNavbar';
import HeaderWeb from './components/common/NewHeaderAndNavbar/HeaderWeb';
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import AllProjectListPanel from './components/common/SideNavPanel/AllProjectListPanel';

function MainApp() {
    return (
        <Provider store={store}>
        <div>
            <HeaderWeb/>
            <div className='d-flex'>
                {/* <SideNavbar /> */}
                <AllProjectListPanel />
                <div className='rightside-section'>
                    <App />
                </div>
            </div>
        </div>
        </Provider>
    )
}

export default MainApp