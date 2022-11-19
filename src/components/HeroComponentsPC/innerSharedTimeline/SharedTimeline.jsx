import React, { useState, useEffect } from 'react';
import "./SharedTimeline.css"
import { HiOutlineShare, HiOutlineMinusCircle } from "react-icons/hi";
import { AiOutlineDelete, AiFillCaretDown } from "react-icons/ai";
import { FiChevronRight, FiEdit2 } from "react-icons/fi";
import { Dropdown } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { BaseUrl, timelineId } from "../../../utils/static/timelineConfig";
import { data } from "../../../utils";
import { imageslist } from "./../../../utils/images";
import { getTimelineItems, getTimelinedata, addEditItems } from "../../../Redux/Actions/timelineAction";

function SharedTimeline() {
  const dispatch = useDispatch()
  const { timelineId } = useParams()
  const navigate = useNavigate();
  const [shared, setShared] = useState(false);
  const [itemsflag, setItemsflag] = useState(false);
  const [ghanttflag, setGhanttflag] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false) ///---read only item status
  const [editItem, setEditItem] = useState(false) ///---edit item status
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const { monthList, statusCode, projectId } = data;
  const { crossCloseIcon } = imageslist;
  const [timelineName, setTimelineName] = useState({})
  const [timelineSentItems, setTimelineSentItems] = useState([])
  const [timelineSelectedItem, setTimelinSelectedItem] = useState({})
  const [timelineEditItem, setTimelineEditItem] = useState([])
  const appState = useSelector((state) => state.timelineReducer)
  const { timelineData, timelineItem } = appState;
  const navigateTimeline = () => {
    navigate("/");
  };
  const handleItemsDocs = () => {
    setItemsflag(false);
    setGhanttflag(true);
  };
  const handleGhanttDocs = () => {
    setItemsflag(true);
    setGhanttflag(false);
  };

  const openReadUpdateModal = (value, id) => {
    setOpenUpdate(value)
    if (value) {
      // settimelinSelectedItem(timelineItem)
      setTimelinSelectedItem(timelineItem?.data?.items?.find(({ _id }) => _id === id))
      setTimelineEditItem(timelineItem?.data?.items?.filter(({ _id }) => _id === id))
    }
  }

  console.log(timelineEditItem)
  let updateitem = [...timelineEditItem]

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

  ///--edit the timeline items field----///
  let updatedUnix;
  let currentUnix;
  const handleChangefield = (e) => {
    let { name, value } = e.target;
    if (name === "startDate") {
      updatedUnix = new Date(value).getTime()
      setStart(updatedUnix)
    }
    if (name === "endDate") {
      currentUnix = new Date(value).getTime();
      setEnd(currentUnix)
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

  function handleUpdateItem(){
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

  ///----date not select greater than current date-----////
  function minDateCurrent() {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    const todayupdate = yyyy + '-' + mm + '-' + dd;
    return todayupdate;
  }


  ///----add three dots after limit out ----///
  function add3DotsRemarks(remark) {
    let dots = "...";
    let limit = 32;
    if (remark?.length > limit) {
      return remark?.substring(0, limit) + dots;
    } else {
      return remark?.substring(0);
    }
  }
  ///---add three dots for title after limit out----///
  function add3dotsItemName(title) {
    let dots = "...";
    let limit = 20;
    if (title.length > limit) {
      return title.substring(0, limit) + dots;
    } else {
      return title;
    }
  }

  const openEditItemModal = (value) => {
    if (value) {
      setOpenUpdate(false)
    }
    setEditItem(value)
  }

  useEffect(() => {
    dispatch(getTimelinedata(projectId))
    dispatch(getTimelineItems(timelineId))
  }, [])


  useEffect(() => {
    setTimelineSentItems(timelineItem?.data?.items?.filter(({ isDraft }) => isDraft === false))
    ///---get timelinedata -----///
    setTimelineName(timelineData?.data?.find(({ _id }) => _id === timelineId))
  }, [timelineItem, timelineData])

  return (
    <div className="innertimeline-wrapper">
      {/* ///----open update modal--- */}
      {/* { readonlystatus && */}
      {openUpdate && <div className="main-modal-wrapper">
        <div className="modal-wrapper-pc position-relative">
          <div className="padding-12 color-text-000000 font-weight-400 font-size-16">{timelineSelectedItem?.itemName}</div>
          <img onClick={() => openReadUpdateModal(false)} className="closeicon position-absolute" src={crossCloseIcon} alt="close-icon" />
          <div style={{ margin: "0%" }} className="ui divider"></div>
          <div className="content padding-12">
            <label className="label-text margin-bottom-3">Start Date</label>
            <div style={{ paddingLeft: "10px" }} className="width-100 border-df border-radius-4 bg-color-fa padding-5 margin-bottom-8">{`${timelineSelectedItem?.startDate?.substring(8, 10)} ${makeMonthFormat(timelineSelectedItem?.startDate?.substring(5, 7))
              } ${timelineSelectedItem?.startDate?.substring(0, 4)}`}</div>
            {/* <label className="label-text margin-bottom-3">Days</label>
            <div style={{ paddingLeft: "10px" }} className="width-100 border-df border-radius-4 bg-color-fa padding-5 margin-bottom-8">9 days</div> */}
            <label className="label-text margin-bottom-3">End Date</label>
            <div style={{ paddingLeft: "10px" }} className="width-100 border-df border-radius-4 bg-color-fa padding-5 margin-bottom-8">{`${timelineSelectedItem?.endDate?.substring(8, 10)} ${makeMonthFormat(timelineSelectedItem?.endDate?.substring(5, 7))
              } ${timelineSelectedItem?.endDate?.substring(0, 4)}`}</div>
            <div className="d-flex justify-flex-start align-center divider-margin-3">
              <label className="label-text width-25">Satus</label>
              <div style={{ paddingLeft: "10px" }} className="width-100 font-weight-400 border-df border-radius-4 bg-color-fa padding-5 margin-bottom-8">{statusCode[timelineSelectedItem?.status]}</div>
            </div>
            <label className="label-text divider-margin-3">Reason</label>
            <div style={{ paddingLeft: "10px" }} className="show-remarks divider-margin-3 color-text-000000 font-weight-400">{timelineSelectedItem?.remarks[timelineSelectedItem?.remarks?.length-1]}</div>
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
            {timelineSelectedItem?.itemName}
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
              <input name="startDate" style={{ paddingLeft: "10px" }}
                className="border-none width-100"
                min={minDateCurrent()}
                placeholder="Select Date"
                onFocus={(e) => (e.target.type = "date")}
                value={timelineEditItem[0]?.startDate?.toString()?.split('T')[0]}
                onChange={(e) => handleChangefield(e)}
              />
            </div>
            {/* <label className="label-text">Days</label>
            <div
              style={{ paddingLeft: "10px" }}
              className="width-100 border-df border-radius-4 padding-5 margin-bottom-8 color-text-000000"
            >
              9 days
            </div> */}
            <label className="label-text">End Date</label>
            <div className="width-100 border-df border-radius-4 padding-5 margin-bottom-8">
              <input style={{ paddingLeft: "10px" }}
                name="endDate"
                className="border-none width-100"
                min={minDateCurrent()}
                placeholder="Select Date"
                onFocus={(e) => (e.target.type = "date")}
                value={timelineEditItem[0]?.endDate?.toString()?.split('T')[0]}
                onChange={(e) => handleChangefield(e)}
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
              <div style={{ paddingLeft: "10px" }} className="width-100 font-weight-400 border-df border-radius-4 bg-color-fa padding-5 margin-bottom-8">{statusCode[timelineSelectedItem?.status]}</div>
            </div>
            <div className="d-flex align-center" style={{ marginLeft: "20%" }}>
              <input type="checkbox" /><span style={{ color: "#575757", marginLeft: "3%" }}>Change the status to complete</span>
            </div>
            <label className="label-text divider-margin-3">Reason</label>
            <textarea
              name="remarks"
              className="show-remarks-edit divider-margin-3"
              rows="5"
              cols="8"
              style={{ resize: "none", paddingLeft: "10px" }}
              placeholder="Write a reason"
              value={timelineEditItem[0]?.remarks}
              onChange={(e) => handleChangefield(e)}
            ></textarea>
          </div>
          <div
            style={{ margin: "10px 0", padding: "0 12px" }}
            className="actions"
          >
            <div
              className="ui button update-edit-btn"
              onClick={() => handleUpdateItem()}
            >
              Update Status
            </div>
          </div>
        </div>
      </div>
      }
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
        <div className="timeline-head font-weight-500">{timelineName?.timelineName}</div>
        <div
          className="createNew-btn-web small-font-12 font-weight-400 text-align-center bg-color border-radius-4"
          onClick={() => navigate(`/innertimeline/${timelineId}`)}
        >
          Create new
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
      </div>
      <div style={{ marginTop: "0%" }} className="ui divider"></div>
      <div className="item-header-wrapper d-flex justify-flex-start color-text-444444 font-weight-400 bg-color-fa border-df">
        <div className="width-3"></div>
        <div className="width-13 small-font-12">Item name</div>
        <div className="width-13 small-font-12">Start Date</div>
        <div className="width-11 small-font-12">Days</div>
        <div className="width-13 small-font-12">End Date</div>
        <div className="width-12 small-font-12">Status</div>
        <div className="width-14 small-font-12">Remark</div>
      </div>
      <div className="bg-color-fa timeline-item-container border-df">
        {timelineSentItems && timelineSentItems.map(({ itemName, startDate, endDate, days, status, _id, remarks }, index) => {
          return <div key={index} onClick={() => openReadUpdateModal(true, _id)}>
            <div style={{ borderBottom: "1px solid #DFDFDF" }} className="d-flex justify-flex-start bg-color-ff item-row-wrapper">
              <div className="width-3"></div>
              <div className="width-13">{add3dotsItemName(itemName)}</div>
              <div className="width-13">{`${startDate.substring(8, 10)} ${makeMonthFormat(startDate.substring(5, 7))
                } ${startDate.substring(0, 4)}`}</div>
              <div className="width-11">{days} days</div>
              <div className="width-13">{`${endDate.substring(8, 10)} ${makeMonthFormat(endDate.substring(5, 7))
                } ${endDate.substring(0, 4)}`}</div>
              <div name="status" className={`width-12 ${status === 0 ? "Yet" : statusCode[status].toUpperCase()}`}>{statusCode[status]}</div>
              <div className="width-30">{add3DotsRemarks(remarks[remarks?.length-1])}</div>
            </div>
          </div>
        })}
      </div>
    </div>
  );
}
export default SharedTimeline;