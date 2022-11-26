import React, { useState, useEffect } from "react";
import "./SharedItem.css";
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
  const [hoverEffect, setHoverEffect] = useState("")
  const [itemflag, setItemflag] = useState(false);
  const [ghanttflag, setGhanttflag] = useState(false);
  const [openaddItem, setOpenaddItem] = useState(false);
  const [updateEditItem, setUpdateEditItem] = useState(false)
  const [updateReadItem, setUpdateReadItem] = useState(false);
  const [show, setShow] = useState(false)
  const [timelineSentItems, setTimelineSentItems] = useState([])
  const [timelineName, setTimelineName] = useState({})
  const [timelineSelectedItem, setTimelinSelectedItem] = useState({})
  const [timelineEditItem, setTimelineEditItem] = useState([])
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
  const { projectId, monthList,BaseUrl,AccessToken } = data
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

  ///---on hover show the image ----///
  const imgHoverEffect = (id) => {
    setHoverEffect(id)
  }

  const openReadUpdateModal = (value, id) => {
    setUpdateReadItem(value)
    if (value) {
      // settimelinSelectedItem(timelineItem)
      setTimelinSelectedItem(timelineItem?.data?.items?.find(({ _id }) => _id === id))
      setTimelineEditItem(timelineItem?.data?.items?.filter(({ _id }) => _id === id))
    }
  }

  let newState = [...listitem];  ///--static array initially render when timelineSentItems lenght is zero ;
  const openAddItemModal = (value, i) => {
    setOpenaddItem(value);
    setItemIndex(i)
    if (!openaddItem) {
      newState[itemIndex] = {
        itemName: "",
        startDate: "",
        days: "",
        endDate: "",
        remarks:[],
      }
      setListitem(newState)
    }
    console.log(listitem[itemIndex])
  };

  let updateitem = [...timelineEditItem]
  ///----get the diff of days btw two selected days----///
  ///----get the diff of days btw two selected days----///
  const getDiffDays = () => {
    let oneday = 1000 * 60 * 60 * 24;
    if (updateitem[0]?.startDate && updateitem[0]?.endDate) {
      const startdate = new Date(updateitem[0]?.startDate).getTime()
      const enddate = new Date(updateitem[0]?.endDate).getTime()
      updateitem[0] = {
        ...updateitem[0], ["days"]: Math.floor((enddate - startdate) / oneday)
      };
    }
    setTimelineEditItem(updateitem)
  }

  let updatedUnix;
  let currentUnix;
  let handleChangefield = (e) => {
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
    updateitem[0] = {
      ...updateitem[0], [name]: value
    }
    setTimelineEditItem(updateitem)
  }

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
  function handleUpdateItem() {
    let bodydata = {
      timelineId: timelineId,
      id: timelineEditItem[0]?._id,
      isDraft: false,
      startDate: timelineEditItem[0]?.startDate,
      days: timelineEditItem[0]?.days,
      endDate: timelineEditItem[0]?.endDate,
      status: timelineEditItem[0]?.status,
      remarks: timelineEditItem[0]?.remarks && timelineEditItem[0]?.remarks,
    }
    console.log(bodydata)
    dispatch(addEditItems(timelineId, bodydata))
    setUpdateEditItem(false)
  }


  ///----change the item view filter ---- normal - detailed---//
  const changeItemView = (value) => {
    setChangeItemsView(value)
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
        setDesignerName(res.data.projects[0].name)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [])

  useEffect(() => {
    ///----get timelineitem---///
    setTimelineSentItems(timelineItem?.data?.items?.filter(({ isDraft }) => isDraft === false))
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
        </div>
        <div className="ui divider"></div>
        <div className="d-flex justify-between align-center">
          <div className="d-flex width-40 justify-between">
            <div
              className={`font-weight-500 ${!itemflag ? "items-tag-mobile" : "ghantt-tab-mobile"
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
        <div style={{ height: "78vh" }} className="overflow-y">

          {changeItemsView === "0" && !itemflag && timelineSentItems?.map(({ itemName, startDate, endDate, days, remark, _id }, index) => {
            return <div
              key={index}
              onClick={() => openReadUpdateModal(true, _id)}
              style={{ padding: "10px 3px" }}
              className="d-flex justify-flex-start border-df border-radius-4 divider-margin" >
              <div className={`width-15 ${hoverEffect === `img_${index + 1}` ? "minus-icon-wrapper" : "visiblity-none"}`}>
                {/* <img style={{ width: "2vw" }} className="" src={hash} alt="hash-icon" /> */}
              </div>
              <div onClick={() => openAddItemModal(true, index)} style={{ borderBottom: " 1px solid #DFDFDF", background: "#F6F6F6" }} className="width-30 color-text-888888 text-align-center">{itemName ? add3dotsItemName(itemName) : "item 1"}</div>
              <div onClick={() => openAddItemModal(true, index)} className="width-5"></div>
              <div onClick={() => openAddItemModal(true, index)} className={`width-45 ${startDate ? "padding-left-5" : "font-weight-700"} text-align-center color-text-000000`}>{startDate ? `${startDate?.substring(8, 10)} ${makeMonthFormat(startDate?.substring(5, 7
              ))}` : "-"}</div>
              <div onClick={() => openAddItemModal(true, index)} className={`width-45 ${endDate ? "padding-left-10" : "font-weight-400"} text-align-center color-text-000000`}>{endDate ? `${endDate?.substring(8, 10)} ${makeMonthFormat(endDate?.substring(5, 7
              ))}` : "-"}</div>
            </div>
          })
          }
          {
            changeItemsView === "1" && !itemflag && timelineSentItems?.map(({ itemName, startDate, endDate, status, days, remarks, _id }, index) => {
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
            <Demo timelineItems={timelineSentItems} />
          </div>
          }
        </div>
      </div>

      {/* ////----update modal is read only-----//// */}
      {updateReadItem && <div style={{ marginTop: "0%" }} className="main-modal-add-update-item-mobile">
        <div className="modal-wrapper-add-item-mobile position-relative">
          <div
            className="close-icon-addItem position-absolute cursor-pointer"
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
                {`${timelineSelectedItem?.startDate?.substring(8, 10)} ${makeMonthFormat(timelineSelectedItem?.startDate?.substring(5, 7))
                  } ${timelineSelectedItem?.startDate?.substring(0, 4)}`}
              </div>
            </div>
            <div className="margin-bottom-8">
              <label className="margin-bottom-5">Select end date</label>
              <div className="border-df padding-8 border-radius-4 width-100">
                {`${timelineSelectedItem?.endDate?.substring(8, 10)} ${makeMonthFormat(timelineSelectedItem?.endDate?.substring(5, 7))
                  } ${timelineSelectedItem?.endDate?.substring(0, 4)}`}
              </div>
            </div>
            <div style={{ marginBottom: "8%" }} >
              <label className="margin-bottom-5">Select Status</label>
              <div className="border-df bg-color-fa padding-8 border-radius-4 width-100">{statusCode[timelineSelectedItem?.status]}</div>
              <div className="d-flex align-center" style={{ marginTop: "3%" }}>
                <input type="checkbox" /> <span style={{ color: "#575757", marginLeft: "3%" }}>Change the status to complete</span>
              </div>
            </div>
            <div style={{ marginBottom: "35%" }}>
              <label className="margin-bottom-5">Write a remark</label>
              <div style={{ minHeight: "20vh" }}
                className="border-df bg-color-fa padding-5 border-radius-4 width-100 padding-8"
              >{timelineSelectedItem?.remarks[timelineSelectedItem?.remarks?.length - 1]}</div>
            </div>
            <div className="actions">
              <div className="ui button submit-btn-readitem" onClick={() => setUpdateEditItem(true)}>
                Update Status
              </div>
            </div>
          </div>
        </div>
      </div>}
      {/* ////----update modal is for edit & read only-----//// */}
      {updateEditItem && <div style={{ marginTop: "0%" }} className="main-modal-add-update-item-mobile">
        <div className="modal-wrapper-add-item-mobile position-relative">
          <div
            className="close-icon-addItem position-absolute cursor-pointer"
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
                name="startDate"
                min={minDateCurrent()}
                className="border-df padding-8 border-radius-4 width-100"
                value={timelineEditItem[0]?.startDate?.toString()?.split('T')[0]}
                onChange={(e) => handleChangefield(e)}
                placeholder="Select Date" />
            </div>
            <div className="margin-bottom-8">
              <label className="margin-bottom-5">Select end date</label>
              <input
                type="date"
                name="endDate"
                min={minDateCurrent()}
                className="border-df padding-8 border-radius-4 width-100"
                value={timelineEditItem[0]?.endDate?.toString()?.split('T')[0]}
                onChange={(e) => handleChangefield(e)}
                placeholder="Select Date" />
            </div>
            <div style={{ marginBottom: "12%" }} >
              <label className="margin-bottom-5">Select Status</label>
              <div className="border-df bg-color-fa padding-8 border-radius-4 width-100">{statusCode[timelineEditItem[0]?.status]}</div>
              <div className="d-flex align-center" style={{ marginTop: "3%" }}>
                <input type="checkbox" /> <span style={{ color: "#575757", marginLeft: "3%" }}>Change the status to complete</span>
              </div>
            </div>
            <div style={{ marginBottom: "35%" }}>
              <label className="margin-bottom-5">Write a remark</label>
              <textarea
                className="border-df bg-color-fa padding-5 border-radius-4 width-100 padding-8"
                rows="6"
                cols="40"
                name="remarks"
                value={timelineEditItem[0]?.remarks}
                onChange={(e) => handleChangefield(e)}
                placeholder="write a remark"
              ></textarea>
            </div>
            <div className="actions">
              <div className="ui button submit-btn-additem" onClick={() => handleUpdateItem()}>
                Update Status
              </div>
            </div>
          </div>
        </div>
      </div>}

    </div>
  );
}

export default InnerTimelineMobile;
