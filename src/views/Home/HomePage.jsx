import React from 'react'
import SideNavbar from '../../components/common/SideNavbar/sideNavbar';
import MainSection from '../../components/HeroComponentsPC/mainSection/mainSection';
import TopNavbar from '../../components/common/TopNavbar/topNavbar';

function HomePage() {
  return (
    <>
    <TopNavbar/>
    <div className='d-flex'>
    <SideNavbar/>
    <div className='rightside-section'>
    <MainSection/>
    </div>
    </div>
    </>
  )
}

export default HomePage