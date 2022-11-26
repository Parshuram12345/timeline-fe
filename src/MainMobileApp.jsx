import React from 'react'
// import { Provider } from 'react-redux'
import MobileHeader from './components/HeroComponentMobile/headerMob/MobileHeader'
import MobileApp from './MobileApp'

function MainMobilApp() {
  return (
    <>
     <div className=''>
        <MobileHeader/>
        <MobileApp/>
    </div>
    </>
  )
}

export default MainMobilApp