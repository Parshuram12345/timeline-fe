import React from 'react'
import SideNavbar from '../../components/common/SideNavbar/sideNavbar'
import TopNavbar from '../../components/common/TopNavbar/topNavbar'
import InnerTimeline from '../../components/HeroComponentsPC/InnerTimeline/InnerTimeline'

function InnerTimelinePage() {
  return (
    <div>
        <TopNavbar/>
        <div className='d-flex'>
            <SideNavbar/>
            <InnerTimeline/>
        </div>

    </div>
  )
}

export default InnerTimelinePage