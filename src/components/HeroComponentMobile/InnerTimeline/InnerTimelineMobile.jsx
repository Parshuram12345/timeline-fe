import React, { useState,useRef} from "react";
import "./InnerTimeline.css";
// import { HiOutlineShare, HiOutlineMinusCircle } from "react-icons/hi";
import { AiOutlineDelete, AiFillCaretDown } from "react-icons/ai";
import { FiChevronRight, FiEdit2 } from "react-icons/fi";
import { HiOutlineMinusCircle } from "react-icons/hi";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { data } from "../../../utils";
import { imageslist } from './../../../utils/images';

const Data = [
  {
    itemName: "",
    startDate: "",
    days: "",
    endDate: "",
    status: 1,
    remark: ""
  },
  {
    itemName: "",
    startDate: "",
    days: "",
    endDate: "",
    status: 1,
    remark: ""
  },
  {
    itemName: "",
    startDate: "",
    days: "",
    endDate: "",
    status: 1,
    remark: ""
  },
  {
    itemName: "",
    startDate: "",
    days: "",
    endDate: "",
    status: 1,
    remark: ""
  },
  {
    itemName: "",
    startDate: "",
    days: "",
    endDate: "",
    status: 1,
    remark: ""
  }
]

function InnerTimelineMobile({list=Data}) {
  //---drag  & drop functionality----/// 
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [hoverEffect, setHoverEffect] = useState("")
  const [itemflag, setItemflag] = useState(false);
  const [ghanttflag, setGhanttflag] = useState(false);
  const [openaddItem, setOpenaddItem] = useState(false);
  const [updateEditItem, setUpdateEditItem]=useState(false)
  const [updateReadItem, setUpdateReadItem]=useState(false);
  const navigate =useNavigate();
  const [listitem, setListitem] = useState(list);
  const { statusList } = data;
  const { colorTimeline, downFillArrow, crossCloseIcon, timelinePlus, Ellipse_bg, doubleVector, hash, minusCircelOutline } = imageslist
  const dummyarr = Array.from({ length: 5 })
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
  
  
  ///---on hover show the image ----///
  const imgHoverEffect = (id) => {
    setHoverEffect(id)
  }
  ///------drag and drop down functionality -----///
  //--locate the item to be dragged----///
  const dragStart = (e, position) => {
    dragItem.current = position;
  }
  ///-----track item being dragged------///
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  }
  ///-----Rearrange the list ------///
  const arangeDropItem = () => {
    const copyListItems = [...listitem];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setListitem(copyListItems);
  }

  ///----add moreItem with onclick button---//
  const addMoreListItem = () => {
    setListitem((prev) => [...prev, prev.length++])
  }

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
          <div className="color-text-888888 font-weight-500 small-font-10 cursor-pointer" onClick={()=>navigate("/")}>
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
              className={`font-weight-500 ${!itemflag ? "items-tab" : "ghantt-tab"
                }`}
              onClick={() => handleItemsDocs()}
            >
              Items
            </div>
            <div
              className={`font-weight-500 ${itemflag ? "items-tab" : "ghantt-tab"
                }`}
              onClick={() => handleGhanttDocs()}
            >
              Ghantt Chart
            </div>
          </div>
          <div style={{marginTop:"-4px"}} className="d-flex justify-flex-start align-center">
            <div className="color-text-888888"> View :</div>
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
          <div style={{ color: "#575757" }} className="width-30 small-font-12 text-align-center">Item</div>
          <div className="width-5"></div>
          <div style={{ color: "#575757" }} className="width-45 small-font-12 text-align-center">S Date</div>
          <div style={{ color: "#575757" }} className="width-45 small-font-12 text-align-center">E Date</div>
          <div className="width-10"></div>
        </div>
        <div className="height-65 overflow-y">
          { listitem && listitem.map(({itemName,startDate, endDate, days, remark, },index) => {
            return <div 
            key={index}
            draggable
            onMouseOver={() => imgHoverEffect(`img_${index + 1}`)}
            onMouseOut={() => imgHoverEffect(null)}
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={arangeDropItem}
            className="d-flex justify-flex-start border-df border-radius-4 padding-5 divider-margin" onClick={() => setUpdateReadItem(true)}>
              <div className={`width-15 ${hoverEffect === `img_${index + 1}` ? "minus-icon-wrapper" : "visiblity-none"}`}>
                <img style={{ width: "2vw" }} className="" src={hash} alt="hash-icon" />
              </div>
              <div style={{ borderBottom: " 1px solid #DFDFDF", background: "#F6F6F6" }} className="width-30 color-text-888888 text-align-center">{itemName}</div>
              <div className="width-5"></div>
              <div style={{fontWeight:"700"}} className="width-45 text-align-center color-text-000000">-</div>
              <div className="width-45 text-align-center color-text-000000 font-weight-400">-</div>
              <div className={`width-10 ${hoverEffect === `img_${index + 1}` ? "minus-icon-wrapper" : "visiblity-none"}`}>
                <img style={{ width: "4vw" }} src={minusCircelOutline} className="minus-icon" alt="minus-icon" />
              </div>
            </div>
          })
          }
        </div>
      </div>
      <div>
        <div style={{ borderTop: "1px solid #DFDFDF", padding: "10px 7px" }} className="d-flex align-center justify-between bg-color-ff">
          <button
            className="save-draft-btn-mobile border-radius-4"
          //   onClick={() => handleSaveDraftData()}
          >
            Save as Draft
          </button>
          <button
            className="submitbtn-mobile bg-color border-radius-4"
          //   onClick={() => handleSubmitData()}
          >
            Share
          </button>
        </div>
      </div>

      {/* ///-----open add item modal----/// */}
      {openaddItem && (
        <><div className="main-modal-add-item-mobile">
          <div className="modal-wrapper-add-item-mobile position-relative">
            <div
              className="close-icon-addItem position-absolute"
              onClick={() => openAddItemModal(false)}
            >
              <img style={{ width: "5vw" }} src={crossCloseIcon} alt="close-icon" />
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
                  placeholder="Write the name" />
              </div>
              <div>
                <label className="margin-bottom-5">Select start date</label>
                <input
                  type="date"
                  className="border-df padding-8 border-radius-4 width-100"
                  placeholder="Select Date" />
              </div>
              <div>
                <label className="margin-bottom-5">Days</label>
                <input
                  type="text"
                  className="border-df bg-color-fa padding-8 border-radius-4 width-100"
                  placeholder="No. of days" />
              </div>
              <div>
                <label className="margin-bottom-5">Select end date</label>
                <input
                  type="date"
                  className="border-df padding-8 border-radius-4 width-100"
                  placeholder="Select Date" />
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
                    alt="down-arrow-fill" />
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
            <div style={{ marginTop: "10%", margin: "0 10px" }} className="actions">
              <div className="ui button submit-btn-additem">
                submit
              </div>
            </div>
          </div>
        </div>

          {/* ////----update modal is read only-----//// */}
         { updateReadItem && <div style={{ marginTop: "0%" }} className="main-modal-add-update-item-mobile">
            <div className="modal-wrapper-add-item-mobile position-relative">
              <div
                className="close-icon-addItem position-absolute"
                onClick={() => setUpdateReadItem(false)}
              >
                <img style={{ width: "5vw" }} src={crossCloseIcon} alt="close-icon" />
              </div>
              <div className="font-weight-500 font-size-16 add-item-container color-text-000000">
                Add Item
              </div>
              <div
                style={{ marginTop: "1%", marginBottom: "0" }}
                className="ui divider"
              ></div>
              <div className="content main-content-update d-flex-col justify-between">
                <div style={{ margin: "8% 0" }}>
                  <label className="margin-bottom-5">Select start date</label>
                  <div className="border-df padding-8 border-radius-4 width-100"> 
                  18 sep 2022
                  </div>
                </div>
                <div className="margin-bottom-8">
                  <label className="margin-bottom-5">Select end date</label>
                  <div className="border-df padding-8 border-radius-4 width-100"> 
                  24 sep 2022
                  </div>
                </div>
                <div style={{ marginBottom: "8%" }} >
                  <label className="margin-bottom-5">Select Status</label>
                  <div className="border-df bg-color-fa padding-8 border-radius-4 width-100">Active</div>
                  <div className="d-flex align-center" style={{ marginTop: "3%" }}>
                    <input type="checkbox" /> <span style={{ color: "#575757", marginLeft: "3%" }}>Change the status to complete</span>
                  </div>
                </div>
                <div style={{ marginBottom: "53%" }}>
                  <label className="margin-bottom-5">Write a remark</label>
                  <textarea
                    className="border-df bg-color-fa padding-5 border-radius-4 width-100 padding-8"
                    rows="6"
                    cols="40"
                    placeholder="write a remark"
                  ></textarea>
                </div>
                <div style={{ margin: "0 10px" }} className="actions">
                  <div className="ui button submit-btn-additem" onClick={()=>setUpdateEditItem(true)}>
                    Update Status
                  </div>
                </div>
              </div>
            </div>
          </div>}
          {/* ////----update modal is for edit & read only-----//// */}
          { updateEditItem && <div style={{ marginTop: "0%" }} className="main-modal-add-update-item-mobile">
            <div className="modal-wrapper-add-item-mobile position-relative">
              <div
                className="close-icon-addItem position-absolute"
                onClick={() => setUpdateEditItem(false)}
              >
                <img style={{ width: "5vw" }} src={crossCloseIcon} alt="close-icon" />
              </div>
              <div className="font-weight-500 font-size-16 add-item-container color-text-000000">
                Add Item
              </div>
              <div
                style={{ marginTop: "1%", marginBottom: "0" }}
                className="ui divider"
              ></div>
              <div className="content main-content-update d-flex-col justify-between">
                <div style={{ margin: "8% 0" }}>
                  <label className="margin-bottom-5">Select start date</label>
                  <input
                    type="date"
                    className="border-df padding-8 border-radius-4 width-100"
                    placeholder="Select Date" />
                </div>
                <div className="margin-bottom-8">
                  <label className="margin-bottom-5">Select end date</label>
                  <input
                    type="date"
                    className="border-df padding-8 border-radius-4 width-100"
                    placeholder="Select Date" />
                </div>
                <div style={{ marginBottom: "12%" }} >
                  <label className="margin-bottom-5">Select Status</label>
                  <div className="border-df bg-color-fa padding-8 border-radius-4 width-100">Active</div>
                  <div className="d-flex align-center" style={{ marginTop: "3%" }}>
                    <input type="checkbox" /> <span style={{ color: "#575757", marginLeft: "3%" }}>Change the status to complete</span>
                  </div>
                </div>
                <div style={{ marginBottom: "53%" }}>
                  <label className="margin-bottom-5">Write a remark</label>
                  <textarea
                    className="border-df bg-color-fa padding-5 border-radius-4 width-100 padding-8"
                    rows="6"
                    cols="40"
                    placeholder="write a remark"
                  ></textarea>
                </div>
                <div style={{ margin: "0 10px" }} className="actions">
                  <div className="ui button submit-btn-additem">
                    Update Status
                  </div>
                </div>
              </div>
            </div>
          </div>}
        </>

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
  );
}

export default InnerTimelineMobile;
