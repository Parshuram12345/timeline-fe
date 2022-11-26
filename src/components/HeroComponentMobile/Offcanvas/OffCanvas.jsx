import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { offConvasImg } from './images';
import styles from "./offconvas.module.css"

function OffCanvasBar({show,handleClose}) {
    const {files,update,mom,timeline}=offConvasImg;
    const navigate=useNavigate();
  return (
    <>
     <Offcanvas show={show} onHide={handleClose} style={{ width: "200px" }}>
        <Offcanvas.Body>
          <div className="d-flex-col">
            <div className={styles.unactiveState}>
              <img src={update} alt="update-img" className={styles.sideimg} />
              Update
            </div>
            <div className={styles.unactiveState} onClick={() => navigate("/files-and-media")}>
              <img src={files} className={styles.sideimg} alt="side-img" />
              Files
            </div>
            <div className={styles.activeState} 
            // onClick={() => window.location.assign(`https://pro.idesign.market/mom/${selectedProject._id}`)}
            >
              <img style={{color:"#3B5998"}} src={mom} className={styles.sideimg} alt="mom-img" />
              MOM
            </div>
            <div className={styles.unactiveState}>
              <img src={timeline} className={styles.sideimg} alt="timeline-img" />
              Timeline
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default OffCanvasBar