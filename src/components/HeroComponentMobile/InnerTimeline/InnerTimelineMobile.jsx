import React, { useState, useRef, useEffect } from "react";
import "./InnerTimeline.css";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { data } from "../../../utils";
import axios from "axios";
import { imageslist } from './../../../utils/images';
import { useDispatch, useSelector } from "react-redux";
import { getTimelineItems, deleteTimelineItem, addEditItems, getTimelinedata, createTimelineData } from "../../../Redux/Actions/timelineAction";
import { statusCode } from "../../../utils/static/timelineConfig";
import OffCanvasBar from "../Offcanvas/OffCanvas";
import Demo from "../../HeroComponentsPC/GanttChart/GhanttChart";


function InnerTimelineMobile() {
  //---drag  & drop functionality----/// 
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [hoverEffect, setHoverEffect] = useState("")
  const [itemflag, setItemflag] = useState(false);
  const [ghanttflag, setGhanttflag] = useState(false);
  const [openaddItem, setOpenaddItem] = useState(false);
  const [show, setShow] = useState(false)
  const [timelineItems, setTimelineItems] = useState([])
  const [timelineName, setTimelineName] = useState({})
  const [draftIds, setDraftIds] = useState([])
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [days, setDays] = useState("")
  const [itemIndex, setItemIndex] = useState("")
  const [designerName, setDesignerName] = useState("")
  const [changeItemsView, setChangeItemsView] = useState("0")
  const navigate = useNavigate();
  const { timelineId } = useParams()
  const dispatch = useDispatch();
  const { projectId, monthList, BaseUrl, AccessToken } = data
  const appState = useSelector((state) => state.timelineReducer)
  const { timelineData, timelineItem } = appState;
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
  const { statusList } = data;
  const { downFillArrow, crossCloseIcon, additemMobile, doubleVector, hash, minusCircelOutline } = imageslist
  const handleItemsDocs = () => {
    setItemflag(false);
    setGhanttflag(true);
  };
  const handleGhanttDocs = () => {
    setItemflag(true);
    setGhanttflag(false);
  };

  ///---on hover show the image ----///
  const imgHoverEffect = (id) => {
    setHoverEffect(id)
  }
  ///------drag and drop down functionality -----///
  //--locate the item to be dragged----///
  const dragStart = (position) => {
    dragItem.current = position;
  }
  ///-----track item being dragged------///
  const dragEnter = (position) => {
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

  let newState = [...listitem];  ///--static array initially render when timelineItems lenght is zero ;
  const openAddItemModal = (value, i) => {
    setOpenaddItem(value);
    setItemIndex(i)
    if (!openaddItem) {
      newState[itemIndex] = {
        itemName: "",
        startDate: "",
        days: "",
        endDate: "",
        remarks: "",
      }
      setListitem(newState)
    }
    console.log(listitem[itemIndex])
  };

  ///----get the diff of days btw two selected days----///
  // let timelineItems = [...timelineItems] ///--timelineItems array that is already store in db ;
  const getDiffDays = () => {
    let oneday = 1000 * 60 * 60 * 24;
    if (timelineItems.length === 0) {
      // for (let i = 0; i < listitem.length; i++) {
      if (listitem[itemIndex]?.startDate && listitem[itemIndex]?.endDate) {
        const startdate = new Date(listitem[itemIndex]?.startDate).getTime()
        const enddate = new Date(listitem[itemIndex]?.endDate).getTime()
        newState[itemIndex] = {
          ...newState[itemIndex], ["days"]: Math.floor((enddate - startdate) / oneday)
        }
      }
      else if (!listitem[itemIndex]?.endDate) {
        newState[itemIndex] = {
          ...newState[itemIndex], ["days"]: ""
        };
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
        if (listitem[i].startDate && listitem[i].days && +listitem[i].days < 61) {
          let startdate = new Date(listitem[i].startDate)
          let updatedEndDate = startdate.setDate(startdate.getDate() + +listitem[i].days)
          console.log(updatedEndDate)
          newState[i] = {
            ...newState[i], ["endDate"]: new Date(updatedEndDate)?.toISOString()?.substring(0, 10)
          };
        }
        else if (!listitem[i].days && +listitem[i].days > 61) {
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
        if (timelineItems[i].startDate && timelineItems[i].days && +listitem[i].days < 61) {
          let startdate = new Date(timelineItems[i].startDate)
          let updatedEndDate = startdate.setDate(startdate.getDate() + +timelineItems[i].days)
          items[i] = {
            ...items[i], ["endDate"]: new Date(updatedEndDate)?.toISOString().substring(0, 10)
          }
        }
        else if (!timelineItems[i].days && +listitem[i].days > 61) {
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
  let handleChange = (e) => {
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
      newState[itemIndex] = {
        ...newState[itemIndex], [name]: value
      }
      setListitem(newState)
    }
    else {
      let items = [...timelineItems]
      items[itemIndex] = {
        ...items[itemIndex], [name]: value
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

  ///---remove the zero the when month number is less than 10-----///
  const makeMonthFormat = (str) => {
    if (str.charAt(0) === "0") {
      return monthList[str.charAt(1)]
    }
    else {
      return monthList[str]
    }
  }

  ///---add three dots for title after limit out----///
  function add3dotsItemName(title) {
    let dots = "..";
    let limit = 10;
    if (title.length > limit) {
      return title.substring(0, limit - 2) + dots;
    } else {
      return title;
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
    if (timelineItems?.length === 0) {
      if (listitem.length > 1) {
        setListitem(listitem?.filter((_, i) => i !== index))
      }
    }
    else {
      setTimelineItems(timelineItems?.filter((_, i) => i !== index))
    }
  }

  ////----get the minimum start date and maximum end date 
  function getMinMaxDateTimeline(minDate, maxDate, trued) {
    const bodydata = {
      id: timelineId,
      isDraft: trued ? false : true,
      timelineStartDate: new Date(Math.min(...minDate)).toISOString().substring(0, 10),
      timelineEndDate: new Date(Math.max(...maxDate)).toISOString().substring(0, 10),
    }
    dispatch(createTimelineData(bodydata, projectId))
  }


  ///----change the item view filter ---- normal - detailed---//
  const changeItemView = (value) => {
    setChangeItemsView(value)
  }
  console.log(changeItemsView)

  ///----shared the timeline item
  const handleSharedTimelineItem = () => {
    let allStartDate = [];
    let allEndDate = [];
    if (timelineItems.length === 0) {
      for (let i = 0; i < listitem.length; i++) {
        if (listitem[i].itemName && listitem[i].startDate && listitem[i].days && listitem[i].endDate && listitem[i].remarks.length !== 0) {
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
      if (!allStartDate.includes("Invalid Date") && !allEndDate.includes("Invalid Date")) {
        getMinMaxDateTimeline(allStartDate, allEndDate, "true")
      }
      navigate(`/`)
    }
    else {
      for (let i = 0; i < timelineItems.length; i++) {
        if (draftIds.includes(timelineItems[i]._id)) {
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
              remarks: timelineItems[i].remarks[timelineItems[i].remarks.length - 1],
            }
            allStartDate.push(new Date(timelineItems[i].startDate))
            allEndDate.push(new Date(timelineItems[i].endDate))
            dispatch(addEditItems(timelineId, bodydata))
          }
        }
      }
      getMinMaxDateTimeline(allStartDate, allEndDate, "true")
      navigate(`/`)
    }
  }



  console.log(timelineItems)
  ///-----add (darft) the timeline list item------////
  const handleSaveDraft = () => {
    let allStartDate = [];
    let allEndDate = [];
    if (timelineItems.length === 0) {
      for (let i = 0; i < listitem.length; i++) {
        if (listitem[i].itemName && listitem[i].remarks.length !== 0) {
          console.log(listitem[i].remarks)
          let bodydata = {
            timelineId: timelineId,
            itemIndex: i,
            itemName: listitem[i].itemName,
            startDate: listitem[i].startDate && listitem[i].startDate,
            days: listitem[i].days && listitem[i].days,
            endDate: listitem[i].endDate && listitem[i].endDate,
            status: listitem[i].status,
            remarks: listitem[i].remarks,
          }
          allStartDate.push(new Date(listitem[i].startDate))
          allEndDate.push(new Date(listitem[i].endDate))
          dispatch(addEditItems(timelineId, bodydata))
        }
        else if (listitem[i].itemName && listitem[i].remarks.length === 0) {
          let bodydata = {
            timelineId: timelineId,
            itemIndex: i,
            startDate: listitem[i].startDate && listitem[i].startDate,
            days: listitem[i].days && listitem[i].days,
            endDate: listitem[i].endDate && listitem[i].endDate,
            status: listitem[i].status,
            itemName: listitem[i].itemName
          }
          dispatch(addEditItems(timelineId, bodydata))
        }
      }
      ///---collect the date from timeline item----///
      if (!allStartDate.includes("Invalid Date") && !allEndDate.includes("Invalid Date") && allStartDate.length !== 0 || allEndDate.length !== 0) {
        getMinMaxDateTimeline(allStartDate, allEndDate)

      }
      navigate(`/`)
    } else {
      for (let i = 0; i < timelineItems.length; i++) {
        if (draftIds.includes(timelineItems[i]._id)) {
          console.log(timelineItems[i].remarks[0])
          if (timelineItems[i].itemName && timelineItems[i].remarks.length !== 0) {
            let bodydata = {
              timelineId: timelineId,
              id: timelineItems[i]._id,
              itemIndex: i,
              itemName: timelineItems[i].itemName,
              startDate: timelineItems[i].startDate && timelineItems[i].startDate,
              days: timelineItems[i].days && timelineItems[i].days,
              endDate: timelineItems[i].endDate && timelineItems[i].endDate,
              status: timelineItems[i].status,
              remarks: timelineItems[i].remarks,
            }
            allStartDate.push(new Date(timelineItems[i].startDate))
            allEndDate.push(new Date(timelineItems[i].endDate))
            dispatch(addEditItems(timelineId, bodydata))
            navigate(`/`)
          }
          else if (timelineItems[i].itemName && timelineItems[i].remarks.length === 0) {
            let bodydata = {
              timelineId: timelineId,
              id: timelineItems[i]._id,
              itemIndex: i,
              itemName: timelineItems[i].itemName,
              startDate: timelineItems[i].startDate && timelineItems[i].startDate,
              days: timelineItems[i].days && timelineItems[i].days,
              endDate: timelineItems[i].endDate && timelineItems[i].endDate,
              status: timelineItems[i].status,
            }
            dispatch(addEditItems(timelineId, bodydata))
            navigate(`/`)
          }

          allStartDate.push(new Date(timelineItems[i].startDate))
          allEndDate.push(new Date(timelineItems[i].endDate))
        }
        else {
          if (timelineItems[i].itemName && timelineItems[i].remarks.length !== 0) {
            let bodydata = {
              timelineId: timelineId,
              itemIndex: i,
              itemName: timelineItems[i].itemName,
              startDate: timelineItems[i].startDate && timelineItems[i].startDate,
              days: timelineItems[i].days && timelineItems[i].days,
              endDate: timelineItems[i].endDate && timelineItems[i].endDate,
              status: timelineItems[i].status,
              remarks: timelineItems[i].remarks,
            }
            allStartDate.push(new Date(timelineItems[i].startDate))
            allEndDate.push(new Date(timelineItems[i].endDate))
            dispatch(addEditItems(timelineId, bodydata))
            navigate(`/`)
          }
          else if (timelineItems[i].itemName && timelineItems[i].remarks.length === 0) {
            console.log(timelineItems[i].endDate)
            let bodydata = {
              timelineId: timelineId,
              itemIndex: i,
              itemName: timelineItems[i].itemName,
              startDate: timelineItems[i].startDate && timelineItems[i].startDate,
              days: timelineItems[i].days && timelineItems[i].days,
              endDate: timelineItems[i].endDate && timelineItems[i].endDate,
              status: timelineItems[i].status,
            }
            dispatch(addEditItems(timelineId, bodydata))
          }
          allStartDate.push(new Date(timelineItems[i].startDate))
          allEndDate.push(new Date(timelineItems[i].endDate))
        }
        console.log(allStartDate, allEndDate)
        ///---collect the date from timeline item----///
        if (!allStartDate.includes("Invalid Date") && !allEndDate.includes("Invalid Date") && allStartDate.length !== 0 || allEndDate.length !== 0)
          getMinMaxDateTimeline(allStartDate, allEndDate)
      }
    }
    navigate(`/`)
  }

  ///---get designer project ---////
  async function getClientProject(projectId) {
    return await axios.get(
      `${BaseUrl}/api/projects/getProjects?projectId=${projectId}`,
      {
        headers: {
          Authorization: AccessToken,
        }
      }
    );
  }

  useEffect(() => {
    dispatch(getTimelineItems(timelineId))
    dispatch(getTimelinedata(projectId))
    //---get designer name from client data----///
    getClientProject(projectId)
      .then((res) => {
        // setAttendes(res.data.projects[0].clientId.email)
        setDesignerName(res.data.projects[0].name)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [])

  useEffect(() => {
    ///----get timelineitem---///
    setTimelineItems(timelineItem?.data?.items?.filter(({ isDraft }) => isDraft === true))
    setDraftIds(timelineItem?.data?.items?.map(({ _id }) => _id))


    ///---get timelinedata -----///
    setTimelineName(timelineData?.data?.find(({ _id }) => _id === timelineId))
  }, [timelineItem, timelineData])

  ///-----offcanvas view ----///
  const handleClose = (value) => {
    setShow(value)
  }

  return (
    <div>
      <OffCanvasBar show={show} handleClose={handleClose} />
      <div className="main-wrapper-mobile">
        <div className="d-flex align-center justify-between width-fit-content divider-margin">
          <div className="small-font-10 color-text-888888 cursor-pointer">
            {designerName}
          </div>
          <span className="d-flex align-center color-text-888888 small-font-12">
            <FiChevronRight />
          </span>
          <div className="color-text-888888 font-weight-500 small-font-10 cursor-pointer" onClick={() => navigate("/")}>
            Timeline
          </div>
          <span className="d-flex align-center color-text-888888 small-font-12">
            <FiChevronRight />
          </span>
          <div className="primary-color-text font-weight-500 small-font-10 cursor-pointer">
            {timelineName?.timelineName}
          </div>
        </div>
        <div className="d-flex justify-between align-center divider-margin">
          <div className="d-flex align-center width-fit-content">
            <div className="doublevector-icon" onClick={handleClose}>
              <img src={doubleVector} alt="vector" />
            </div>
            <div style={{ margin: "0 10px" }} className="divider-bar">|</div>
            <div className="timeline-head font-weight-500">
              {timelineName?.timelineName}
            </div>
          </div>
          {!itemflag && <div className="" onClick={() => {
            if (timelineItems?.length === 0) {
              addMoreListItem()
            }
            else {
              addMoreListItemForDraft()
            }
          }}>
            <img src={additemMobile} alt="plus-icon" />
          </div>}
        </div>
        <div className="ui divider"></div>
        <div className="d-flex justify-between align-center">
          <div className="d-flex width-40 justify-between">
            <div
              className={`font-weight-500 ${!itemflag ? "items-tab-mobile" : "ghantt-tab-mobile"
                }`}
              onClick={() => handleItemsDocs()}
            >
              Items
            </div>
            <div
              className={`font-weight-500 ${itemflag ? "items-tab-mobile" : "ghantt-tab-mobile"
                }`}
              onClick={() => handleGhanttDocs()}
            >
              Ghantt Chart
            </div>
          </div>
          {!itemflag && <div style={{ marginTop: "-4px" }} className="d-flex justify-flex-start align-center">
            <div className="color-text-888888"> View :</div>
            <select onChange={(e) => changeItemView(e.target.value)} className="border-none">
              <option value="0">Normal</option>
              <option value="1">Detailed</option>
            </select>
          </div>}
        </div>
        <div style={{ marginTop: "0%" }} className="ui divider"></div>

        {changeItemsView === "0" && !itemflag && <div className="d-flex justify-flex-start">
          <div className="width-15"></div>
          <div style={{ color: "#575757" }} className="width-30 small-font-12 text-align-center">Item</div>
          <div className="width-5"></div>
          <div style={{ color: "#575757" }} className="width-45 small-font-12 text-align-center">S Date</div>
          <div style={{ color: "#575757" }} className="width-45 small-font-12 text-align-center">E Date</div>
          <div className="width-10"></div>
        </div>}
        <div style={{ height: "61vh" }} className="overflow-y">

          {changeItemsView === "0" && !itemflag && (timelineItems?.length === 0 ? listitem : timelineItems)?.map(({ itemName, startDate, endDate, days, remark, _id }, index) => {
            return <div
              key={index}
              draggable
              onMouseOver={() => imgHoverEffect(`img_${index + 1}`)}
              onMouseOut={() => imgHoverEffect(null)}
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragEnd={arangeDropItem}
              style={{ padding: "10px 3px" }}
              className="d-flex justify-flex-start border-df border-radius-4 divider-margin" >
              <div onClick={() => openAddItemModal(true, index)} className={`width-15 ${hoverEffect === `img_${index + 1}` ? "minus-icon-wrapper" : "visiblity-none"}`}>
                <img style={{ width: "2vw" }} className="" src={hash} alt="hash-icon" />
              </div>
              <div onClick={() => openAddItemModal(true, index)} style={{ borderBottom: " 1px solid #DFDFDF", background: "#F6F6F6" }} className="width-30 color-text-888888 text-align-center">{itemName ? add3dotsItemName(itemName) : "item 1"}</div>
              <div onClick={() => openAddItemModal(true, index)} className="width-5"></div>
              <div onClick={() => openAddItemModal(true, index)} className={`width-45 ${startDate ? "padding-left-5" : "font-weight-700"} text-align-center color-text-000000`}>{startDate ? `${startDate?.substring(8, 10)} ${makeMonthFormat(startDate?.substring(5, 7
              ))}` : "-"}</div>
              <div onClick={() => openAddItemModal(true, index)} className={`width-45 ${endDate ? "padding-left-10" : "font-weight-400"} text-align-center color-text-000000`}>{endDate ? `${endDate?.substring(8, 10)} ${makeMonthFormat(endDate?.substring(5, 7
              ))}` : "-"}</div>
              <div onClick={() => {
                if (timelineItems?.length === 0) {
                  reduceListItem(index)
                }
                else {
                  if (_id) {
                    dispatch(deleteTimelineItem(_id, timelineId))
                    window.location.reload(false)
                  }
                  else {
                    reduceListItem(index)
                  }
                  navigate(`/innertimeline/${timelineId}`)
                }
              }} className={`width-10 ${hoverEffect === `img_${index + 1}` ? "minus-icon-wrapper" : "visiblity-none"}`}>
                <img style={{ width: "4vw" }} src={minusCircelOutline} className="minus-icon" alt="minus-icon" />
              </div>
            </div>
          })
          }
          {
            changeItemsView === "1" && !itemflag && (timelineItems?.length === 0 ? listitem : timelineItems)?.map(({ itemName, startDate, endDate, status, days, remarks, _id }, index) => {
              return (
                <div style={{ padding: "7px" }} className="border-df border-radius-4">
                  <div className="d-flex justify-between align-center divider-margin-5">
                    <div className="font-weight-500 color-text-000000">{itemName}</div>
                    <div name="status" className={`width-fit-content padding-5 border-radius-4 ${status === 0 ? "Yet-mobile" : statusCode[status].toUpperCase()}`}>{statusCode[status]}</div>
                  </div>
                  <div className="d-flex margin-top-15">
                    <div className="color-text-888888">Start Date : </div>
                    <div className={`${!startDate ? "text-align-center" : ""}font-weight-500`}>{startDate ? `${startDate?.substring(8, 10)} ${makeMonthFormat(startDate?.substring(5, 7))
                      } ${startDate?.substring(0, 4)}` : "-"}</div>
                  </div>
                  <div className="d-flex divider-margin-5">
                    <div className="color-text-888888">End Date : </div>
                    <div className={`${!endDate ? "text-align-center" : ""}font-weight-500`}>{endDate ? `${endDate?.substring(8, 10)} ${makeMonthFormat(endDate?.substring(5, 7))
                      } ${endDate?.substring(0, 4)}` : "-"}</div>
                  </div>
                  <div className="color-text-888888 margin-top-15">Reason</div>
                  <div className="divider-margin-5 font-weight-500 color-text-000000 text-align-justify">
                    {remarks}
                  </div>
                </div>
              )
            })
          }
          {itemflag && <div className="border-df border-radius-4 height-65 overflow-y">
            <Demo timelineItems={timelineItems} />
          </div>
          }
        </div>
      </div>
      {!itemflag && <div>
        <div style={{ borderTop: "1px solid #DFDFDF", padding: "10px 7px" }} className="d-flex align-center justify-between bg-color-ff">
          <button
            className="save-draft-btn-mobile border-radius-4 cursor-pointer"
            onClick={() => handleSaveDraft()}
          >
            Save as Draft
          </button>
          <button
            className="submitbtn-mobile bg-color border-radius-4 cursor-pointer"
            onClick={() => handleSharedTimelineItem()}
          >
            Share
          </button>
        </div>
      </div>}

      {/* ///-----open add item modal----/// */}
      {openaddItem && (<div className="main-modal-add-item-mobile">
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
          <div className="content add-item-wrapper d-flex-col justify-around">
            <div>
              <label className="margin-bottom-5">Item name</label>
              <input
                type="text"
                name="itemName"
                onChange={(e) => handleChange(e)}
                value={listitem[itemIndex].itemName}
                className="border-df bg-color-fa padding-8 border-radius-4 width-100"
                placeholder="Write the name" />
            </div>
            <div>
              <label className="margin-bottom-5">Select start date</label>
              <input
                type="date"
                name="startDate"
                min={minDateCurrent()}
                onChange={(e) => handleChange(e)}
                value={listitem[itemIndex].startDate?.toString()?.split('T')[0]}
                className="border-df padding-8 border-radius-4 width-100"
                placeholder="Select Date" />
            </div>
            <div>
              <label className="margin-bottom-5">Days</label>
              <input
                type="number"
                name="days"
                onChange={(e) => handleChange(e)}
                value={listitem[itemIndex].days}
                className="border-df bg-color-fa padding-8 border-radius-4 width-100"
                placeholder="No. of days" />
            </div>
            <div>
              <label className="margin-bottom-5">Select end date</label>
              <input
                type="date"
                name="endDate"
                min={minDateCurrent()}
                onChange={(e) => handleChange(e)}
                value={listitem[itemIndex].endDate?.toString()?.split('T')[0]}
                className="border-df padding-8 border-radius-4 width-100"
                placeholder="Select Date" />
            </div>
            <div className="position-relative">
              <label className="margin-bottom-5">Select Status</label>
              <select className="border-df bg-color-fa padding-8 border-radius-4 width-100">
                <option value="">Yet to Start</option>
                {/* {statusList &&
                    statusList.map((status) => {
                      return <option value={status}>{status}</option>;
                    })} */}
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
                name="remarks"
                className="border-df bg-color-fa padding-5 border-radius-4 width-100 padding-8"
                rows="6"
                cols="40"
                onChange={(e) => handleChange(e)}
                value={listitem[itemIndex].remarks}
                placeholder="write a remark"
              ></textarea>
            </div>
          </div>
          <div style={{ marginTop: "10%", margin: "0 10px" }} className="actions">
            <div onClick={() => openAddItemModal(false)} className="ui button submit-btn-additem">
              submit
            </div>
          </div>

        </div>
      </div>
      )}

    </div>
  );
}

export default InnerTimelineMobile;
