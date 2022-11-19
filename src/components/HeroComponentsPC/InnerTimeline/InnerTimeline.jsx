import React, { useRef, useState, useEffect } from "react";
import "./InnerTimeline.css";
import { HiOutlineShare, HiOutlineMinusCircle } from "react-icons/hi";
import { AiOutlineDelete, AiFillCaretDown } from "react-icons/ai";
import { FiChevronRight, FiEdit2 } from "react-icons/fi";
import { Dropdown } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { imageslist } from "./../../../utils/images";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../../../utils/static/timelineConfig";
import { data } from "../../../utils"
import { getTimelineItems, deleteTimelineItem, addEditItems, getTimelinedata, createTimelineData } from "../../../Redux/Actions/timelineAction";
function InnerTimeline() {
  const { timelineId } = useParams()
  // console.log(timelineid)
  const dispatch = useDispatch()
  const [itemsflag, setItemsflag] = useState(false);
  const [ghanttflag, setGhanttflag] = useState(false);
  const [editUpdate, setEditUpdate] = useState(false)
  const [readonlystatus, setReadonlyStatus] = useState(false);
  const [draftIds, setDraftIds] = useState([])
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [timelineName, setTimelineName] = useState({})
  const [hoverEffect, setHoverEffect] = useState("")
  const [timelineItems, setTimelineItems] = useState([])
  const [timelineSentItems, setTimelineSentItems] = useState([])
  const [listitem, setListitem] = useState([
    {
      itemIndex: 0,
      itemName: "",
      startDate: "",
      days: "",
      endDate: "",
      status: 0,
      remarks: []
    },
    {
      itemIndex: 1,
      itemName: "",
      startDate: "",
      days: "",
      endDate: "",
      status: 0,
      remarks: []
    },
    {
      itemIndex: 2,
      itemName: "",
      startDate: "",
      days: "",
      endDate: "",
      status: 0,
      remarks: []
    },
    {
      itemIndex: 3,
      itemName: "",
      startDate: "",
      days: "",
      endDate: "",
      status: 0,
      remarks: []
    },
    {
      itemIndex: 4,
      itemName: "",
      startDate: "",
      days: "",
      endDate: "",
      status: 0,
      remarks: []
    }
  ]);
  const [shared, setShared] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false) ///---read only item status
  const [editItem, setEditItem] = useState(false) ///---edit item status
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [days, setDays] = useState("")
  const appState = useSelector((state) => state.timelineReducer)
  const { timelineData, timelineItem } = appState;
  // console.log(timelineItem?.data?.timelineItems)
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

  const { BaseUrl, AccessToken, projectId, } = data
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
    setReadonlyStatus(value)
  }

  ///----get the diff of days btw two selected days----///
  let newState = [...listitem];  ///--static array initially render when timelineItems lenght is zero ;
  // let timelineItems = [...timelineItems] ///--timelineItems array that is already store in db ;
  const getDiffDays = () => {
    let oneday = 1000 * 60 * 60 * 24;
    if (timelineItems.length === 0) {
      for (let i = 0; i < listitem.length; i++) {
        if (listitem[i].startDate && listitem[i].endDate) {
          const startdate = new Date(listitem[i].startDate).getTime()
          const enddate = new Date(listitem[i].endDate).getTime()
          newState[i] = {
            ...newState[i], ["days"]: Math.floor((enddate - startdate) / oneday)
          };
        }
        else if (!listitem[i].endDate) {
          newState[i] = {
            ...newState[i], ["days"]: ""
          };
        }
      }
      setListitem(newState)
    }
    else {
      let items = [...timelineItems];
      for (let i = 0; i < timelineItems?.length; i++) {
        if (timelineItems[i]?.startDate && timelineItems[i]?.endDate) {
          const startdate = new Date(timelineItems[i].startDate).getTime()
          const enddate = new Date(timelineItems[i].endDate).getTime()
          items[i] = {
            ...items[i], ["days"]: Math.floor((enddate - startdate) / oneday)
          };
        }
        else if (!timelineItems[i]?.days) {
          items[i] = {
            ...items[i], ["days"]: ""
          };
        }
      }
      setTimelineItems(items)
    }
  }

  ///----get the end date after selected start date and no. of days----///
  function getEndDate() {
    if (timelineItems.length === 0) {
      for (let i = 0; i < listitem.length; i++) {
        if (listitem[i].startDate && listitem[i].days) {
          let startdate = new Date(listitem[i].startDate)
          let updatedEndDate = startdate.setDate(startdate.getDate() + +listitem[i].days)
          console.log(updatedEndDate)
          newState[i] = {
            ...newState[i], ["endDate"]: new Date(updatedEndDate)?.toISOString()?.substring(0, 10)
          };
        }
        else if (!listitem[i].days) {
          newState[i] = {
            ...newState[i], ["endDate"]: ""
          };
        }
      }
      setListitem(newState)
    }
    else {
      let items = [...timelineItems]
      for (let i = 0; i < timelineItems.length; i++) {
        if (timelineItems[i].startDate && timelineItems[i].days) {
          let startdate = new Date(timelineItems[i].startDate)
          let updatedEndDate = startdate.setDate(startdate.getDate() + +timelineItems[i].days)
          items[i] = {
            ...items[i], ["endDate"]: new Date(updatedEndDate)?.toISOString().substring(0, 10)
          }
        }
        else if (!timelineItems[i].days) {
          items[i] = {
            ...items[i], ["endDate"]: ""
          };
        }
      }
      setTimelineItems(items)
    }
  }
  let updatedUnix;
  let currentUnix;
  let handleChange = (e, i) => {
    const { value, name } = e.target;
    if (name === "startDate") {
      updatedUnix = new Date(value).getTime()
      setStart(updatedUnix)
    }
    console.log(newState)
    if (name === "endDate") {
      currentUnix = new Date(value).getTime();
      setEnd(currentUnix)
    }
    if (name === "days") {
      setDays(value)
    }
    if (timelineItems?.length === 0) {
      newState[i] = {
        ...newState[i], [name]: value
      }
      setListitem(newState)
    }
    else {
      let items = [...timelineItems]
      items[i] = {
        ...items[i], [name]: value
      };
      setTimelineItems(items)
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
    if (timelineItems.length === 0) {
      const copyListItems = [...listitem];
      const dragItemContent = copyListItems[dragItem.current];
      copyListItems.splice(dragItem.current, 1);
      copyListItems.splice(dragOverItem.current, 0, dragItemContent);
      dragItem.current = null;
      dragOverItem.current = null;
      setListitem(copyListItems);
    }
    else {
      const copyItems = [...timelineItems];
      const dragItemContent = copyItems[dragItem.current];
      copyItems.splice(dragItem.current, 1);
      copyItems.splice(dragOverItem.current, 0, dragItemContent);
      dragItem.current = null;
      dragOverItem.current = null;
      setTimelineItems(copyItems);
    }
  }

  ///----add moreItem with onclick button---//
  const addMoreListItem = () => {
    newState.push({
      itemIndex: newState.length,
      itemName: "",
      startDate: "",
      days: "",
      endDate: "",
      status: 0,
      remarks: []
    })
    setListitem(newState)
  }
  // console.log(listitem)
  ///----add moreItem  for already made draft with onclick button---//
  const addMoreListItemForDraft = () => {
    let items = [...timelineItems]
    console.log(timelineItems)
    items.push({
      itemIndex: items.length,
      itemName: "",
      startDate: "",
      days: "",
      endDate: "",
      status: 0,
      remarks: []
    })
    setTimelineItems(items)
  }
  ///----reduce the list Item with onclick button---//
  const reduceListItem = (index) => {
    if (listitem.length > 1) {
      setListitem(listitem?.filter((_, i) => i !== index))
    }
  }

  ////----get the minimum start date and maximum end date 
  function getMinMaxDateTimeline(minDate, maxDate) {
    const bodydata = {
      id: timelineId,
      isDraft: false,
      timelineStartDate: new Date(Math.min(...minDate)).toISOString().substring(0, 10),
      timelineEndDate: new Date(Math.max(...maxDate)).toISOString().substring(0, 10),
    }
    dispatch(createTimelineData(bodydata, projectId))
  }


  ///----shared the timeline item
  const handleSharedTimelineItem = () => {
    let allStartDate = [];
    let allEndDate = [];
    if (timelineItems.length === 0) {
      for (let i = 0; i < listitem.length; i++) {
        if (listitem[i].itemName !== "" && listitem[i].startDate !== "" && listitem[i].days !== "" && listitem[i].endDate !== "" && listitem[i].remarks.length !== 0) {
          let bodydata = {
            isDraft: false,
            timelineId: timelineId,
            itemIndex: i,
            itemName: listitem[i].itemName,
            startDate: listitem[i].startDate,
            days: listitem[i].days,
            endDate: listitem[i].endDate,
            status: listitem[i].status,
            remarks: listitem[i].remarks,
          }
          allStartDate.push(new Date(listitem[i].startDate))
          allEndDate.push(new Date(listitem[i].endDate))
          dispatch(addEditItems(timelineId, bodydata))
        }
      }
      ///---collect the date from timeline item----///
      if (allStartDate && allEndDate) {
        getMinMaxDateTimeline(allStartDate, allEndDate)
      }
      navigate(`/sharedtimeline/${timelineId}`)
    }
    else {
      for (let i = 0; i < timelineItems.length; i++) {
        if (timelineItems[i].itemName !== "" && timelineItems[i].startDate !== "" && timelineItems[i].days !== "" && timelineItems[i].endDate !== "" && timelineItems[i].remarks.length !== 0) {
          let bodydata = {
            timelineId: timelineId,
            id: timelineItems[i]._id,
            itemIndex: i,
            isDraft: false,
            itemName: timelineItems[i].itemName,
            startDate: timelineItems[i].startDate,
            days: timelineItems[i].days,
            endDate: timelineItems[i].endDate,
            status: timelineItems[i].status,
            remarks: timelineItems[i].remarks && timelineItems[i].remarks[0],
          }
          allStartDate.push(new Date(timelineItems[i].startDate))
          allEndDate.push(new Date(timelineItems[i].endDate))
          dispatch(addEditItems(timelineId, bodydata))
        }
      }

      getMinMaxDateTimeline(allStartDate, allEndDate)
      navigate(`/sharedtimeline/${timelineId}`)
    }
  }



  // console.log(timelineItems)
  ///-----add (darft) the timeline list item------////
  const handleSaveDraft = () => {
    let allStartDate = [];
    let allEndDate = [];
    if (timelineItems.length === 0) {
      for (let i = 0; i < listitem.length; i++) {
        if (listitem[i].itemName !== "" && listitem[i].startDate !== "" && listitem[i].days !== "" && listitem[i].endDate !== "" && listitem[i].remarks.length !== 0) {
          let bodydata = {
            timelineId: timelineId,
            itemIndex: i,
            itemName: listitem[i].itemName,
            startDate: listitem[i].startDate,
            days: listitem[i].days,
            endDate: listitem[i].endDate,
            status: listitem[i].status,
            remarks: listitem[i].remarks,
          }
          allStartDate.push(new Date(listitem[i].startDate))
          allEndDate.push(new Date(listitem[i].endDate))
          dispatch(addEditItems(timelineId, bodydata))
        }
      }
      ///---collect the date from timeline item----///
      if (allStartDate && allEndDate) {
        getMinMaxDateTimeline(allStartDate, allEndDate)
      }
      navigate(`/innertimeline/${timelineId}`)
    } else {
      for (let i = 0; i < timelineItems.length; i++) {
        if (timelineItems[i].itemName !== "" && timelineItems[i].startDate !== "" && timelineItems[i].days !== "" && timelineItems[i].endDate !== "" && timelineItems[i].remarks.length !== 0) {
          if (draftIds.includes(timelineItems[i]._id)) {
            let bodydata = {
              timelineId: timelineId,
              id: timelineItems[i]._id,
              itemIndex: i,
              itemName: timelineItems[i].itemName,
              startDate: timelineItems[i].startDate,
              days: timelineItems[i].days,
              endDate: timelineItems[i].endDate,
              status: timelineItems[i].status,
              remarks: timelineItems[i].remarks[0],
            }
            allStartDate.push(new Date(timelineItems[i].startDate))
            allEndDate.push(new Date(timelineItems[i].endDate))
            dispatch(addEditItems(timelineId, bodydata))
          }
          else {
            let bodydata = {
              timelineId: timelineId,
              itemIndex: i,
              itemName: timelineItems[i].itemName,
              startDate: timelineItems[i].startDate,
              days: timelineItems[i].days,
              endDate: timelineItems[i].endDate,
              status: timelineItems[i].status,
              remarks: timelineItems[i].remarks,
            }
            dispatch(addEditItems(timelineId, bodydata))
          }
          allStartDate.push(new Date(timelineItems[i].startDate))
          allEndDate.push(new Date(timelineItems[i].endDate))
        }
        ///---collect the date from timeline item----///
        if (allStartDate && allEndDate)
          getMinMaxDateTimeline(allStartDate, allEndDate)
      }

    }
    navigate(`/innertimeline/${timelineId}`)
  }

  useEffect(() => {
    dispatch(getTimelineItems(timelineId))
    dispatch(getTimelinedata(projectId))
  }, [])

  useEffect(() => {
    ///----get timelineitem---///
    setTimelineItems(timelineItem?.data?.items?.filter(({ isDraft }) => isDraft === true))
    setTimelineSentItems(timelineItem?.data?.items?.filter(({ isDraft }) => isDraft === false))
    setDraftIds(timelineItem?.data?.items?.map(({ _id }) => _id))


    ///---get timelinedata -----///
    setTimelineName(timelineData?.data?.find(({ _id }) => _id === timelineId))
  }, [timelineItem, timelineData])

  // const openReadUpdateModal = (value) => {
  //   setOpenUpdate(value)
  // }
  // const openEditItemModal = (value) => {
  //   if (value) {
  //     setOpenUpdate(false)
  //   }
  //   setEditItem(value)
  // }
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
          {timelineName?.timelineName}
        </div>
      </div>
      <div className="d-flex justify-between align-center">
        <div className="timeline-head font-weight-500"> {timelineName?.timelineName}</div>
        <div style={{ width: "19rem" }} className="draft-share-btn-wrapper d-flex align-center justify-between">
          <div
            className="save-btn-web small-font-12 font-weight-400 text-align-center border-radius-4"
            onClick={() => handleSaveDraft()}
          >
            Save as Draft
          </div>
          <div
            className="submit-btn-web small-font-12 font-weight-400 text-align-center bg-color border-radius-4"
            onClick={() => handleSharedTimelineItem()}
          >
            Share
          </div>
        </div>
      </div>
      <div style={{ marginTop: "15px" }} className="d-flex justify-between align-center">
        <div className="d-flex width-15 justify-between">
          <div
            className={`font-weight-500 ${!itemsflag ? "timelineItems-tab" : "ghantt-tab"
              }`}
            onClick={() => handleItemsDocs()}
          >
            Items
          </div>
          <div
            className={`font-weight-500 ${itemsflag ? "timelineItems-tab" : "ghantt-tab"
              }`}
            onClick={() => handleGhanttDocs()}
          >
            Gantt View
          </div>
        </div>
        {!shared && <div className="d-flex justify-between align-center width-25">
          <div onClick={() => {
            if (timelineItems.length === 0) {
              addMoreListItem()
            }
            else {
              addMoreListItemForDraft()
            }
          }}>
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
      <div className="timelineItems-wrapper d-flex justify-flex-start color-text-444444 font-weight-400">
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
      <div style={{ borderRadius: "12px", padding: "8px 0" }} className="border-df height-63">
        <div style={{ maxHeight: "56vh" }} className="overflow-y">
          {
            (timelineItems?.length === 0 ? listitem : timelineItems)?.map(({ itemName, startDate, endDate, days, remarks, _id }, index) => {
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
                        value={startDate?.toString()?.split('T')[0]}
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
                        max="9999"
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
                        value={endDate?.toString()?.split('T')[0]}
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
                        name="remarks"
                        onChange={(e) => handleChange(e, index)}
                        value={remarks}
                        className="padding-3 bg-color-fa border-none"
                        placeholder="type something..."
                      />
                    </div>
                    <div onClick={() => {
                      if (timelineItems?.length === 0) {
                        reduceListItem(index)
                      }
                      else {
                        navigate(`/innertimeline/${timelineId}`)
                        dispatch(deleteTimelineItem(_id, timelineId))
                        window.location.reload(false)
                      }
                    }
                    } className={`width-5 text-align-center ${hoverEffect === `img_${index + 1}` ? "minus-icon-wrapper" : "visiblity-none"}`}>
                      <img src={minusCircelOutline} className="minus-icon width-30" alt="minus-icon" />
                    </div>
                  </div>
                  <hr style={{ marginTop: "2px", marginBottom: "0", margin: "0 5px" }} />
                </div>
              )
            })
          }
        </div>
        <div style={{ marginLeft: "3%" }} onClick={() => {
          if (timelineItems.length === 0) {
            addMoreListItem()
          }
          else {
            addMoreListItemForDraft()
          }
        }} className="cursor-pointer">
          <img className="add-more-item" src={addMoreItem} alt="add-more-item" />
        </div>
      </div>
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
      </div>}


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
