import React from 'react';
import "./additem.css";

function AddItem() {
  return (
    <div>
       <div className="main-modal-wrapper-mobile">
          <div className="modal-wrapper-mobile position-relative">
            <div className="content">
              <p className="notice-text-mobile">Write the Timeline name</p>
              <img
                className="position-absolute close-icon-mobile"
                src={"/Images/akar-icons_cross.svg"}
                alt="cross-icon"
              />
              <input
                type="text"
                className="border-df bg-color-fa padding-5 border-radius-4 width-100"
                placeholder="Timeline name"
              />
            </div>
            <div className="actions">
              <div className="ui button submit-btn-mobile">submit</div>
            </div>
          </div>
        </div>
     
    </div>
  )
}

export default AddItem