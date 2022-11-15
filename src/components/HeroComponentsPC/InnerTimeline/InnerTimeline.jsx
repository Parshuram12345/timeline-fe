import React, { useRef, useState, useEffect, useParams } from "react";
import "./InnerTimeline.css";
import { HiOutlineShare, HiOutlineMinusCircle } from "react-icons/hi";
import { AiOutlineDelete, AiFillCaretDown } from "react-icons/ai";
import { FiChevronRight, FiEdit2 } from "react-icons/fi";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { imageslist } from "./../../../utils/images";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../../../utils/static/timelineConfig";
import { data } from "../../../utils"
import { getTimelineItems, deleteTimelineItem, addEditItems } from "../../../Redux/Actions/timelineAction";
function InnerTimeline() {
  // const {timelineid}=useParams()
  // console.log(timelineid)
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
  const dispatch = useDispatch()
  const [itemsflag, setItemsflag] = useState(false);
  const [ghanttflag, setGhanttflag] = useState(false);
  const [editUpdate, setEditUpdate] = useState(false)
  const [readonlystatus, setReadonlyStatus] = useState(false);
  // const [startDate, setStartDate] = useState("")
  // const [endDate, setEndDate] = useState("")
  // const [status, setStatus] = useState("");
  // const [remark, setRemark] = useState("")
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [hoverEffect, setHoverEffect] = useState("")
  const [listitem, setListitem] = useState([
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
  ]);
  // listitem.
  const [shared, setShared] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false) ///---read only item status
  const [editItem, setEditItem] = useState(false) ///---edit item status
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [days, setDays] = useState("")
  const appState = useSelector((state) => state.timelineReducer)
  const { timelineData, timelineItem } = appState;
  console.log(timelineItem?.data?.items)
  let dummyarr = Array.from({ length: 5 })
  const {
    lineVertical,
    hash,
    threeDots,
    searchIcon,
    addItem,
    addMoreItem,
    crossCloseIcon,
    minusCircelOutline,
    downEmptyarrow,
  } = imageslist;
  const navigate = useNavigate();

  const { BaseUrl, AccessToken, projectid, timelineId } = data
  const handleItemsDocs = () => {
    setItemsflag(false);
    setGhanttflag(true);
  };
  const handleGhanttDocs = () => {
    setItemsflag(true);
    setGhanttflag(false);
  };
  const navigateTimeline = () => {
    navigate("/");
  };
  const handleReadOnlyStatus = (value) => {
    setReadonlyStatus(value);
  };


  ///----get the diff of days btw two selected days----///
  let newState = [...listitem];
  const getDiffDays = () => {
    let oneday = 1000 * 60 * 60 * 24;
    for (let i = 0; i < listitem.length; i++) {
      if (listitem[i].startDate && listitem[i].endDate) {
        const startdate = new Date(listitem[i].startDate).getTime()
        const enddate = new Date(listitem[i].endDate).getTime()
        newState[i] = {
          ...newState[i], ["days"]: Math.floor((enddate - startdate) / oneday)
        };
        setListitem(newState)
      }
    }
  }

  ///----get the end date after selected start date and no. of days----///
  function getEndDate() {
    for (let i = 0; i < listitem.length; i++) {
      if (listitem[i].startDate && listitem[i].days) {
        let startdate = new Date(listitem[i].startDate)
        let updatedEndDate = startdate.setDate(startdate.getDate() + +listitem[i].days)
        console.log(startdate.setDate(startdate.getDate() + +listitem[i].days))
        newState[i] = {
          ...newState[i], ["endDate"]: new Date(updatedEndDate).toISOString().substring(0, 10)
        };
        setListitem(newState)
      }
    }
  }

  let updatedUnix;
  let currentUnix;
  let handleChange = (e, i) => {
    const { value, name } = e.target;
    newState[i] = {
      ...newState[i], [name]: value
    };
    setListitem(newState)
    console.log(newState)
    if (name === "startDate") {
      updatedUnix = new Date(value).getTime()
      setStart(updatedUnix)
    }

    if (name === "endDate") {
      currentUnix = new Date(value).getTime();
      setEnd(currentUnix)
    }
    if (name === "days") {
      setDays(value)
    }
  }

  ///-----got end date after selected the start date and no. of days -----///
  useEffect(() => {
    getEndDate()
  }, [start, days])

  ///----got no. of days after selected the start date and end date----///
  useEffect(() => {
    getDiffDays()
  }, [start, end])

  ///----date not select greater than current date-----////
  function minDateCurrent() {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    const todayupdate = yyyy + '-' + mm + '-' + dd;
    return todayupdate;
  }

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
  ///----reduce the list Item with onclick button---//
  const reduceListItem = () => {
    // setListitem((prev) => [...prev, prev.length++])
  }

  ///-----add the timeline list item------////
  const handleSaveDraft = async () => {
    for (let i = 0; i < listitem.length; i++) {
      let bodydata = {
        timelineId: timelineId,
        itemName: listitem[i].itemName,
        startDate: listitem[i].startDate,
        days: listitem[i].days,
        endDate: listitem[i].endDate,
        status: listitem[i].status,
        remarks: listitem[i].remark,
      }
      dispatch(addEditItems(timelineId, bodydata))
    }
  }

  useEffect(() => {
    dispatch(getTimelineItems(timelineId))
  }, [])
  useEffect(() => {
    // setListitem(timelineItem?.data?.items.filter((item) => item.isDraft === true))
  }, [timelineItem])

  ///---fixed the every status color in drop-down------////
  const selectedStatus = document.getElementsByName("status");
  for (let i = 0; i < selectedStatus.length; i++) {
    console.log(selectedStatus[i].textContent)
    switch (selectedStatus[i].textContent) {
      case "Yet to start":
        selectedStatus[i].style.color = "#888888";
        break;
      case "ACTIVE":
        console.log("active");
        selectedStatus[i].style.color = "#3B5998";
        break;
      case "PENDING":
        selectedStatus[i].style.color = "#BBB400";
        break;
      case "DELAYED":
        selectedStatus[i].style.color = "#D50000";
        break;
      case "COMPLETED":
        selectedStatus[i].style.color = "#2BA400";
        break;
    }
  }
  const openReadUpdateModal = (value) => {
    setOpenUpdate(value)
  }
  const openEditItemModal = (value) => {
    if (value) {
      setOpenUpdate(false)
    }
    setEditItem(value)
  }
  return (
    <div className="innertimeline-wrapper">
      <div className="d-flex align-center justify-between width-fit-content divider-margin">
        <div className="small-font-12 color-text-888888">
          Ashok rathi residence
        </div>
        <span className="d-flex align-center color-text-888888 font-size-14">
          <FiChevronRight />
        </span>
        <div
          className="small-font-12 color-text-888888 cursor-pointer"
          onClick={() => navigateTimeline()}
        >
          Timeline
        </div>
        <span className="d-flex align-center color-text-888888 font-size-14">
          <FiChevronRight />
        </span>
        <div className="primary-color-text font-weight-500 small-font-12 cursor-pointer">
          Living room timeline
        </div>
      </div>
      <div className="d-flex justify-between align-center">
        <div className="timeline-head font-weight-500">Timeline 1</div>
        <div style={{ width: "19rem" }} className="draft-share-btn-wrapper d-flex align-center justify-between">
          <div
            className="save-btn-web small-font-12 font-weight-400 text-align-center border-radius-4"
            onClick={() => handleSaveDraft()}
          >
            Save as Draft
          </div>
          <div
            className="submit-btn-web small-font-12 font-weight-400 text-align-center bg-color border-radius-4"
            // onClick={() => handleSharedTimelineItem()}
            onClick={() => setShared(true)}
          >
            Share
          </div>
        </div>
      </div>
      <div style={{ marginTop: "15px" }} className="d-flex justify-between align-center">
        <div className="d-flex width-15 justify-between">
          <div
            className={`font-weight-500 ${!itemsflag ? "items-tab" : "ghantt-tab"
              }`}
            onClick={() => handleItemsDocs()}
          >
            Items
          </div>
          <div
            className={`font-weight-500 ${itemsflag ? "items-tab" : "ghantt-tab"
              }`}
            onClick={() => handleGhanttDocs()}
          >
            Ghantt View
          </div>
        </div>
        {!shared && <div className="d-flex justify-between align-center width-25">
          <div onClick={addMoreListItem}>
            <img className="add-item cursor-pointer" src={addItem} alt="add-item" />
          </div>
          <div>
            <img className="search-icon" src={searchIcon} alt="search-icon" />
          </div>
          <div className="width-30">
            <Dropdown>
              <Dropdown.Toggle
                as="button"
                style={{
                  border: "none",
                  backgroundColor: "#ffffff",
                }}
              >
                <img src={threeDots} alt="threedots" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <HiOutlineShare className="share-icon" />
                  Share
                </Dropdown.Item>
                <Dropdown.Item>
                  <FiEdit2 className="share-icon" />
                  Edit
                </Dropdown.Item>
                <Dropdown.Item>
                  <AiOutlineDelete className="share-icon" />
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        }
      </div>
      <div style={{ marginTop: "0%" }} className="ui divider"></div>
      {!shared && <>
        <div className="items-wrapper d-flex justify-flex-start color-text-444444 font-weight-400">
          <div style={{ width: "3.5%" }} className=""></div>
          <div className="width-10 small-font-12">Items</div>
          <div className="width-3"></div>
          <div className="width-11 small-font-12">Start Date</div>
          <div className="width-3"></div>
          <div className="width-11 small-font-12">Days</div>
          <div className="width-5"></div>
          <div className="width-13 small-font-12">End Date</div>
          <div className="width-3"></div>
          <div className="width-12 small-font-12">Status</div>
          <div className="width-10"></div>
          <div className="width-14 small-font-12">Remark</div>
          <div className="width-5"></div>
        </div>
        <div style={{ borderRadius: "12px", padding: "8px 0" }} className="border-df height-63 overflow-y">
          {listitem &&
            listitem.map(({ itemName, startDate, endDate, days, remark, _id }, index) => {
              return (
                <div key={index}>
                  <div
                    draggable
                    onMouseOver={() => imgHoverEffect(`img_${index + 1}`)}
                    onMouseOut={() => imgHoverEffect(null)}
                    onDragStart={(e) => dragStart(e, index)}
                    onDragEnter={(e) => dragEnter(e, index)}
                    onDragEnd={arangeDropItem}
                    className="item-container d-flex justify-flex-start align-center cursor-pointer"
                  >
                    <div style={{ paddingLeft: "5px" }} className={`hash-show width-3 text-align-center ${hoverEffect === `img_${index + 1}` ? "minus-icon-wrapper" : "visiblity-none"}`}>
                      <img className="hash-icon" src={hash} alt="hash-icon" />
                    </div>
                    <div className="width-10">
                      <input
                        type="text"
                        className="border-df bg-color-fa border-radius-4 padding-3 width-100 text-align-center"
                        name="itemName"
                        onChange={(e) => handleChange(e, index)}
                        value={itemName}
                        placeholder="Item name"
                      />
                    </div>
                    <div className="width-3"></div>
                    <div className="width-11">
                      <input
                        type="text"
                        name="startDate"
                        onChange={(e) => handleChange(e, index)}
                        min={minDateCurrent()}
                        value={startDate.toString().split('T')[0]}
                        style={{ maxWidth: "100%" }}
                        className="border-df bg-color-ff padding-3 border-radius-4 text-align-center"
                        placeholder="Select date"
                        onFocus={(e) => (e.target.type = "date")}
                      />
                    </div>
                    <div className="width-3"></div>
                    <div className="position-relative width-11">
                      <input
                        type="number"
                        name="days"
                        onChange={(e) => handleChange(e, index)}
                        value={days}
                        className="border-df bg-color-fa border-radius-4 text-align-center width-100 padding-3"
                        placeholder="No. of days"
                      />
                    </div>
                    <div className="width-5"></div>
                    <div className="width-11">
                      <input
                        type="text"
                        name="endDate"
                        onChange={(e) => handleChange(e, index)}
                        min={minDateCurrent()}
                        value={endDate.toString().split('T')[0]}
                        style={{ maxWidth: "100%" }}
                        className="border-df bg-color-ff padding-3 border-radius-4 text-align-center"
                        placeholder="Select date"
                        onFocus={(e) => (e.target.type = "date")}
                      />
                    </div>
                    <div className="width-5"></div>
                    <div className="width-12  position-relative">
                      <div className="border-df border-radius-4 padding-3">
                        {/* <option>Yet to start</option>
                        <option>ACTIVE</option>
                        <option>PENDING</option>
                        <option>DELAYED</option>
                        <option>COMPLETED</option> */}
                        Yet to start
                      </div>
                      <img src={downEmptyarrow} alt="down-Arrow" style={{ width: "8%", right: "15px", top: "10px" }} className="position-absolute arrow-icon right-13 top-8 color-text-888888" />
                    </div>
                    <div className="width-10"></div>
                    <div className="width-14 remarks-field border-df bg-color-fa border-radius-4">
                      <textarea
                        rows="1"
                        cols="13"
                        style={{ resize: "none" }}
                        name="remark"
                        onChange={(e) => handleChange(e, index)}
                        value={remark}
                        className="padding-3 bg-color-fa border-none"
                        placeholder="type something..."
                      />
                    </div>
                    <div onClick={() => dispatch(deleteTimelineItem(_id, timelineId))} className={`width-5 text-align-center ${hoverEffect === `img_${index + 1}` ? "minus-icon-wrapper" : "visiblity-none"}`}>
                      <img src={minusCircelOutline} className="minus-icon width-30" alt="minus-icon" />
                    </div>
                  </div>
                  <hr style={{ marginTop: "2px", marginBottom: "0", margin: "0 5px" }} />
                </div>
              )
            })}

          <div style={{ marginLeft: "3%" }} onClick={addMoreListItem} className="cursor-pointer">
            <img className="add-more-item" src={addMoreItem} alt="add-more-item" />
          </div>
        </div>
      </>}
      {/* ////----shared timeline item -----//// */}
      {shared && <div style={{ padding: "8px 0" }} className="">
        <div className="d-flex justify-between align-center timeline-item-search-wrapper bg-color-ff">
          <div style={{ marginLeft: "32px" }}>
            Timeline
          </div>
          <div className="d-flex justify-between align-center width-15">
            <img className="search-icon" src={searchIcon} alt="search_item" />
            <Dropdown style={{ marginRight: "40%" }} className="width-5">
              <Dropdown.Toggle
                as="button"
                style={{
                  border: "none",
                  backgroundColor: "#ffffff",
                }}
              >
                <img src={threeDots} alt="threedots" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <HiOutlineShare className="share-icon" />
                  Share
                </Dropdown.Item>
                <Dropdown.Item>
                  <FiEdit2 className="share-icon" />
                  Edit
                </Dropdown.Item>
                <Dropdown.Item>
                  <AiOutlineDelete className="share-icon" />
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="item-header-wrapper d-flex justify-flex-start color-text-444444 font-weight-400 bg-color-fa border-df">
          <div className="width-3"></div>
          <div className="width-10 small-font-12">Item name</div>
          <div className="width-13 small-font-12">Start Date</div>
          <div className="width-11 small-font-12">Days</div>
          <div className="width-13 small-font-12">End Date</div>
          <div className="width-12 small-font-12">Status</div>
          <div className="width-14 small-font-12">Remark</div>
        </div>
        <div className="bg-color-fa timeline-item-container border-df">
          {dummyarr && dummyarr.map((_, index) => {
            return <div key={index} onClick={() => openReadUpdateModal(true)}>
              <div style={{ borderBottom: "1px solid #DFDFDF" }} className="d-flex justify-flex-start bg-color-ff item-row-wrapper">
                <div className="width-3"></div>
                <div className="width-10 small-font-12">item1</div>
                <div className="width-13 small-font-12">22 sep 2022</div>
                <div className="width-11 small-font-12">8 days</div>
                <div className="width-13 small-font-12">30 sep 2022</div>
                <div name="status" className="width-12 small-font-12">COMPLETED</div>
                <div className="width-14 small-font-12">compelete a day before</div>
              </div>
            </div>
          })}
        </div>
      </div>}
      {/* ///----open update modal--- */}
      {/* { readonlystatus && */}
      {openUpdate && <div className="main-modal-wrapper">
        <div className="modal-wrapper-pc position-relative">
          <div className="padding-12 color-text-000000 font-weight-400 font-size-16">Item 1</div>
          <img onClick={() => openReadUpdateModal(false)} className="closeicon position-absolute" src={crossCloseIcon} alt="close-icon" />
          <div style={{ margin: "0%" }} className="ui divider"></div>
          <div className="content padding-12">
            <label className="label-text margin-bottom-3">Start Date</label>
            <div style={{ paddingLeft: "10px" }} className="width-100 border-df border-radius-4 bg-color-fa padding-5 margin-bottom-8">22 sep 2022</div>
            <label className="label-text margin-bottom-3">Days</label>
            <div style={{ paddingLeft: "10px" }} className="width-100 border-df border-radius-4 bg-color-fa padding-5 margin-bottom-8">9 days</div>
            <label className="label-text margin-bottom-3">End Date</label>
            <div style={{ paddingLeft: "10px" }} className="width-100 border-df border-radius-4 bg-color-fa padding-5 margin-bottom-8">29 sep 2022</div>
            <div className="d-flex justify-flex-start align-center divider-margin-3">
              <label className="label-text width-25">Satus</label>
              <div style={{ paddingLeft: "10px" }} className="width-100 font-weight-400 border-df border-radius-4 bg-color-fa padding-5 margin-bottom-8">Active</div>
            </div>
            <label className="label-text divider-margin-3">Reason</label>
            <div style={{ paddingLeft: "10px" }} className="show-remarks divider-margin-3 color-text-000000 font-weight-400">Nothing to show here</div>
          </div>
          <div style={{ margin: "10px 0", padding: "0 12px" }} className="actions">
            <div
              className="ui button update-btn"
              onClick={() => openEditItemModal(true)}
            >
              Update Status
            </div>
          </div>
        </div>
      </div>}

      {/* ///----open  edit update modal--- */}
      {editItem && <div className="main-modal-wrapper">
        <div className="modal-wrapper-pc position-relative">
          <div className="padding-12 color-text-000000 font-weight-400 font-size-16">
            Item 1
          </div>
          <img
            onClick={() => openEditItemModal(false)}
            className="closeicon position-absolute"
            src={crossCloseIcon}
            alt="close-icon"
          />
          <div style={{ margin: "0%" }} className="ui divider"></div>
          <div className="content padding-12">
            <label className="label-text">Start Date</label>
            <div className="width-100 border-df border-radius-4 padding-5 margin-bottom-8">
              <input style={{ paddingLeft: "10px" }}
                className="border-none width-100"
                placeholder="Select Date"
                onFocus={(e) => (e.target.type = "date")}
              />
            </div>
            <label className="label-text">Days</label>
            <div
              style={{ paddingLeft: "10px" }}
              className="width-100 border-df border-radius-4 padding-5 margin-bottom-8 color-text-000000"
            >
              9 days
            </div>
            <label className="label-text">End Date</label>
            <div className="width-100 border-df border-radius-4 padding-5 margin-bottom-8">
              <input style={{ paddingLeft: "10px" }}
                className="width-100 border-none"
                placeholder="Select Date"
                onFocus={(e) => (e.target.type = "date")}
              />
            </div>
            <div
              className="d-flex justify-flex-start align-center divider-margin-3"
            >
              <label className="label-text width-25">Status</label>
              {/* <div
                className="position-relative"
                style={{ color: "#3B5998", width: "54%" }}
              >
                <select name="status" className="form-select"
                // onChange={handleSelectStatus}
                >
                  <option  style={{color:"#888888"}} selected>Yet to start</option>
                      <option style={{color:"#3B5998"}} value="1">ACTIVE</option>
                      <option  style={{color:"#BBB400"}}  value="2">PENDING</option>
                      <option  style={{color:"#D50000"}} value="3">DELAYED</option>
                    <option  style={{color:"#2BA400"}} value="3">COMPLETED</option>
                  <option>Yet to start</option>
                  <option>ACTIVE</option>
                  <option>PENDING</option>
                  <option>DELAYED</option>
                  <option>COMPLETED</option>
                </select>
                <AiFillCaretDown className="position-absolute arrow-icon right-13 top-8 color-text-888888" />
              </div> */}
              <div style={{ paddingLeft: "10px" }} className="width-100 font-weight-400 border-df border-radius-4 bg-color-fa padding-5 margin-bottom-8">Active</div>
            </div>
            <div className="d-flex align-center" style={{ marginLeft: "20%" }}>
              <input type="checkbox" /> <span style={{ color: "#575757", marginLeft: "3%" }}>Change the status to complete</span>
            </div>
            <label className="label-text divider-margin-3">Reason</label>
            <textarea
              className="show-remarks-edit divider-margin-3"
              rows="5"
              cols="8"
              style={{ resize: "none", paddingLeft: "10px" }}
              placeholder="Write a reason"
            ></textarea>
          </div>
          <div
            style={{ margin: "10px 0", padding: "0 12px" }}
            className="actions"
          >
            <div
              className="ui button update-edit-btn"
            // onClick={() => handleSingleDeleteMOM()
            >
              Update Status
            </div>
          </div>
        </div>
      </div>
      }

      {/* /// not updating anything item */}
      {/* <div className="main-modal-wrapper">
            <div className="modal-updated-yes-no-modal">
              <div className="content">
                <div className="padding-12">
               <div className="color-text-000000 font-size-18 font-weight-400 divider-margin-5">
                You haven't updated anything in this item yet!
               </div>
               <div className="color-text-000000 font-size-16 font-weight-400 divider-margin-5">
                  Had the work started on the given date?
               </div>
                </div>
               <div className="d-flex justify-between align-center">
                <div style={{ borderRight: "1px solid #a59595"}} className="color-text-888888 updated-btn width-50 d-flex align-center justify-center">Yes</div>
                {/* <div style={{background:"#D9D9D9"}} className="border-df">| */}
      {/* <img src={lineVertical} /> */}
      {/* </div> */}
      {/* <div className="color-text-888888 updated-btn width-50 d-flex align-center justify-center">No</div>
               </div>
              </div>
            </div>
          </div> */}
    </div>
  );
}

export default InnerTimeline;
