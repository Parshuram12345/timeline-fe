import React, { useState } from "react";
import "./InnerTimeline.css";
// import { HiOutlineShare, HiOutlineMinusCircle } from "react-icons/hi";
import { AiOutlineDelete, AiFillCaretDown } from "react-icons/ai";
import { FiChevronRight, FiEdit2 } from "react-icons/fi";
import { HiOutlineMinusCircle} from "react-icons/hi";
import { Dropdown } from "react-bootstrap";
import { data } from "../../../utils";
import { imageslist } from './../../../utils/images';

function InnerTimelineMobile() {
  const [itemflag, setItemflag] = useState(false);
  const [ghanttflag, setGhanttflag] = useState(false);
  const [openaddItem, setOpenaddItem] = useState(false);
  const { statusList } = data;
  const {colorTimeline,downFillArrow,crossCloseIcon,timelinePlus,Ellipse_bg,doubleVector,hash}=imageslist
  const handleItemsDocs = () => {
    setItemflag(false);
    setGhanttflag(true);
  };
  const handleGhanttDocs = () => {
    setItemflag(true);
    setGhanttflag(false);
  };
  const openAddItemModal = (value) => {
    setOpenaddItem(value);
  };
  const dummyarr = Array.from({length:5})
  return (
    <div>
      <div className="main-wrapper-mobile">
        <div className="d-flex align-center justify-between width-fit-content divider-margin">
          <div className="small-font-10 color-text-888888">
            Ashok rathi residence
          </div>
          <span className="d-flex align-center color-text-888888 small-font-12">
            <FiChevronRight />
          </span>
          <div className="color-text-888888 font-weight-500 small-font-10 cursor-pointer">
            Timeline
          </div>
          <span className="d-flex align-center color-text-888888 small-font-12">
            <FiChevronRight />
          </span>
          <div className="primary-color-text font-weight-500 small-font-10 cursor-pointer">
            Living room timeline
          </div>
        </div>
        <div className="d-flex justify-between align-center divider-margin">
          <div className="d-flex justify-between align-center width-70">
            <div className="doublevector-icon">
              <img src={doubleVector} alt="vector" />
            </div>
            <div className="divider-bar">|</div>
            <div className="timeline-head font-weight-500">
              Living Room Timeline
            </div>
          </div>
        </div>
        <div className="ui divider"></div>
        <div className="d-flex justify-between align-center">
          <div className="d-flex width-40 justify-between">
            <div
              className={`font-weight-500 ${
                !itemflag ? "items-tab" : "ghantt-tab"
              }`}
              onClick={() => handleItemsDocs()}
            >
              Items
            </div>
            <div
              className={`font-weight-500 ${
                itemflag ? "items-tab" : "ghantt-tab"
              }`}
              onClick={() => handleGhanttDocs()}
            >
              Ghantt Chart
            </div>
          </div>
          <div className="d-flex justify-between align-center width-35">
            <div className="color-text-888888"> view :</div>
            <select className="border-none">
              <option>Detailed</option>
              <option>Normal</option>
            </select>
          </div>
        </div>
        <div style={{ marginTop: "0%" }} className="ui divider"></div>

        {/* show empty add notice */}
        {/* <div
          className="timeline-area d-flex-col align-center justify-center 
      font-weight-500 m-auto border-df border-radius-4"
        >
          <div className="position-relative">
            <img
              className="circle-icon-mobile"
              src={Ellipse_bg}
              alt="circle-icon"
            />
            <img
              className="timeline-icon-mobile position-absolute"
              src={colorTimeline}
              alt="timeline-icon"
            />
          </div>
          <div className="color-text-888888 font-weight-500 font-size-14 text-align-center">
            you haven't added any items yet!
          </div>
          <div
            className="primary-color-text font-weight-500 font-size-14 margin-left-4"
            onClick={() => openAddItemModal(true)}
          >
            Add item
          </div>
        </div> */}
        <div className="d-flex justify-flex-start">
          <div className="width-15"></div>
          <div className="width-30">Item</div>
          <div className="width-45">Start Date</div>
          <div className="width-10"></div>
        </div>
        <div className="height-60">
        { dummyarr.map (()=>{
          return <div className="d-flex justify-flex-start border-df padding-5 divider-margin">
          <div className="width-15">
            <img src={hash} alt="hash-icon" />
          </div>
          <div className="width-30">Item1</div>
          <div className="width-45">nil</div>
          <div className="width-10">
          <HiOutlineMinusCircle style={{ color: "red" }} />
          </div>
        </div>
        })
      }
        </div>
        <div>
          <div className="d-flex align-center justify-between">
        <button
          className="save-draft-btn border-radius-4"
        //   onClick={() => handleSaveDraftData()}
        >
          Save as Draft
        </button>
        <button
          className="submitbtn bg-color border-radius-4"
        //   onClick={() => handleSubmitData()}
          >
          Share
        </button>
          </div>
          </div>

        {/* ///-----open add item modal----/// */}
        {openaddItem && (
          <div className="main-modal-add-item-mobile">
            <div className="modal-wrapper-add-item-mobile position-relative">
              <div
                className="close-icon-addItem position-absolute"
                onClick={() => openAddItemModal(false)}
              >
                <img src={crossCloseIcon} alt="close-icon" />
              </div>
              <div className="font-weight-500 font-size-16 add-item-container color-text-000000">
                Add Item
              </div>
              <div
                style={{ marginTop: "1%", marginBottom: "0" }}
                className="ui divider"
              ></div>
              <div className="content main-content d-flex-col justify-around">
                <div>
                  <label className="margin-bottom-5">Item name</label>
                  <input
                    type="text"
                    className="border-df bg-color-fa padding-8 border-radius-4 width-100"
                    placeholder="Write the name"
                  />
                </div>
                <div>
                  <label className="margin-bottom-5">Select start date</label>
                  <input
                    type="date"
                    className="border-df padding-8 border-radius-4 width-100"
                    placeholder="Select Date"
                  />
                </div>
                <div>
                  <label className="margin-bottom-5">Days</label>
                  <input
                    type="text"
                    className="border-df bg-color-fa padding-8 border-radius-4 width-100"
                    placeholder="No. of days"
                  />
                </div>
                <div>
                  <label className="margin-bottom-5">Select end date</label>
                  <input
                    type="date"
                    className="border-df padding-8 border-radius-4 width-100"
                    placeholder="Select Date"
                  />
                </div>
                <div className="position-relative">
                  <label className="margin-bottom-5">Select Status</label>
                  <select className="border-df bg-color-fa padding-8 border-radius-4 width-100">
                    <option value="">Yet to Start</option>
                    {statusList &&
                      statusList.map((status) => {
                        return <option value={status}>{status}</option>;
                      })}
                  </select>
                  <div className="">
                    <img className="position-absolute down-arrow"
                      src={downFillArrow}
                      alt="down-arrow-fill"
                    />
                  </div>
                </div>
                <div>
                  <label className="margin-bottom-5">Write a remark</label>
                  <textarea
                    className="border-df bg-color-fa padding-5 border-radius-4 width-100 padding-8"
                    rows="6"
                    cols="40"
                    placeholder="write a remark"
                  ></textarea>
                </div>
              </div>
              <div style={{ marginTop: "10%",margin:"0 10px" }} className="actions">
                <div className="ui button submit-btn-additem">
                  submit
                </div>
              </div>
            </div>
          </div>
        )}

        {/* <div className="timeline-height-62">
        <div className="padding-3 border-df border-radius-4">
          <div className="d-flex justify-between align-center divider-margin-5">
            <div className="font-weight-500 color-text-000000">Lighting</div>
            <div className="yet-to-start">Yet to start</div>
          </div>
          <div className="d-flex margin-top-15">
          <div className="color-text-888888">Start Date : </div>
          <div className="font-weight-500"> 28 Sept 2022</div>
          </div>
          <div className="d-flex divider-margin-5">
          <div className="color-text-888888">End Date : </div>
          <div className="font-weight-500"> 28 Nov 2022</div>
          </div>
        <div className="color-text-888888 margin-top-15">Reason</div>
        <div className="divider-margin-5 font-weight-500 color-text-000000">
          It is a long established fact that a reader will be directed, it is a
          long established fact that a reder will be distracted by the readable
          content of a page when looking at its layout, the point of using lorem
          ipsum"
        </div>
        </div>
      </div>
      <div style={{marginTop:"0"}} className="ui divider"></div>
      <div className="d-flex align-center justify-between">
        <button
          className="save-draft-btn border-radius-4"
        //   onClick={() => handleSaveDraftData()}
        >
          Save as Draft
        </button>
        <button
          className="submitbtn bg-color border-radius-4"
        //   onClick={() => handleSubmitData()}
          >
          Share
        </button>
          </div>
        */}
      </div>
    </div>
  );
}

export default InnerTimelineMobile;
