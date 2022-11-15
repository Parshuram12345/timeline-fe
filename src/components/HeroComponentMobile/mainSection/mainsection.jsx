import React, { useState } from "react";
import { FiChevronRight, FiEdit2 } from "react-icons/fi";
import { HiOutlineShare } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { Dropdown } from "react-bootstrap";
import "./mainsection.css";
import { imageslist } from './../../../utils/images/index';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data } from "../../../utils";
import { createTimelineData, getTimelinedata,handleSingleDeleteTimeline } from "../../../Redux/Actions/timelineAction";
import { useNavigate } from "react-router-dom";

function Mainsection() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const appState = useSelector((state) => state.timelineReducer)
  const { timelineData } = appState;
  const [opeTimelineModal, setOpenTimelineModal] = useState(false);
  const [draftsflag, setDraftsflag] = useState(false);
  const [sentflag, setSentflag] = useState(false);
  const [timelineName, setTimelineName] = useState("");
  const [timelineNameError, setTimelineNameError] = useState(false);
  const [timelineDraftlist, setTimelineDraftlist] = useState([])
  const [timelineSentlist, setTimelineSentlist] = useState([]);
  const [opendeleteModal, setOpendeleteModal] = useState(false)
  const [singleDeleteTimeline, setSingleDeleteTimeline] = useState("")
  const { AccessToken, BaseUrl, projectId, monthList } = data;
  const { threeDots, addItem, addMoreItem, Ellipse_bg, timelinePlus, doubleVector, colorTimeline, timelineIcon, crossCloseIcon } = imageslist
  ///---create timeline ----///
  const handleCreateTimeline = (value) => {
    setOpenTimelineModal(value);
  };
  ///----draftsdocs -----///
  const handleDraftsDocs = () => {
    setDraftsflag(false);
    setSentflag(true);
  };
  ///=----sentdocs----////
  const handleSentDocs = () => {
    setDraftsflag(true);
    setSentflag(false);
  };

   ///---read the timeline and edit it---///
   async function createTimeLine() {
    if (timelineName) {
      setOpenTimelineModal(false)
      dispatch(createTimelineData(projectId, timelineName))
      // navigate("/innertimeline")
    } else {
      console.log("enter the timeline name")
      setTimelineNameError(true)
    }
  }

   ///----open single delete timeline modal -----///
   const handleTimelineDeleteModal = (value, id) => {
    if (value) {
      setSingleDeleteTimeline(id);
      setOpendeleteModal(value);
    } else {
      setOpendeleteModal(value);
      setSingleDeleteTimeline("");
    }
  };

  // ///------delete the timeline------////
    const handleDeleteTimeline=()=>{
      setOpendeleteModal(false)
      dispatch(handleSingleDeleteTimeline(singleDeleteTimeline,projectId))
    }

  ///----getting the timeline data ---///
  useEffect(() => {
    dispatch(getTimelinedata(projectId))
  }, [])

  useEffect(() => {
    setTimelineDraftlist(timelineData?.data?.filter((item) => item.isDraft === true))
    setTimelineSentlist(timelineData?.data?.filter((item) => item.isDraft === false))
  }, [timelineData])

  return (
    <div className="main-wrapper-mobile">
      {/* ///------modal code for create timeline name */}
      {opeTimelineModal && (
        <div className="main-modal-wrapper-mobile">
          <div className="modal-wrapper-create-timeline-mobile position-relative">
            <div className="content">
              <p className="notice-text-mobile">Write the Timeline name</p>
              <img
                className="position-absolute close-icon-mobile"
                onClick={() => handleCreateTimeline(false)}
                src={crossCloseIcon}
                alt="cross-icon"
              />
              <input
                type="text"
                className="border-df bg-color-fa padding-5 border-radius-4 width-100"
                value={timelineName}
                onChange={(e) => setTimelineName(e.target.value)}
                placeholder="Timeline name"
              />
              {timelineNameError && <div style={{ color: "red", fontSize: "10px" }}>Write the timeline</div>}
            </div>
            <div className="actions">
              <div className="ui button submit-btn-mobile" onClick={()=>createTimeLine()}>submit</div>
            </div>
          </div>
        </div>
      )}
       {/* modal for delete timeline */}
       {opendeleteModal && (
        <div className="main-modal-wrapper-mobile">
          <div className="modal-wrapper-create-delete-timeline-mobile">
            <div className="content">
              <p className="notice-text"> Are you sure you want to delete this?</p>
            </div>
            <div style={{ marginTop: "20px" }} className="actions">
              <div
                className="ui button yes-btn"
                onClick={() => handleDeleteTimeline()}
              >
                Yes
              </div>
              <div
                className="ui button no-btn"
                onClick={() => handleTimelineDeleteModal(false)}
              >
                No
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="d-flex align-center justify-between width-fit-content divider-margin">
        <div className="small-font-10 color-text-888888">
          Ashok rathi residence
        </div>
        <span className="d-flex align-center color-text-888888 small-font-12">
          <FiChevronRight />
        </span>
        <div className="primary-color-text font-weight-500 small-font-10 cursor-pointer">
          Timeline
        </div>
      </div>
      <div className="d-flex justify-between align-center divider-margin">
        <div className="d-flex justify-between align-center width-40">
          <div className="doublevector-icon">
            <img src={doubleVector} alt="vector" />
          </div>
          <div className="divider-bar">
            |
          </div>
          <div className="timeline-head font-weight-500">Timeline</div>
        </div>
        <div className="" onClick={() => handleCreateTimeline(true)}>
          <img src={timelinePlus} alt="plus-icon" />
        </div>
      </div>
      <div className="d-flex width-30 justify-between">
        <div
          className={`font-weight-500 ${!draftsflag ? "drafts-tab" : "sents-tab"
            }`}
          onClick={() => handleDraftsDocs()}
        >
          Drafts
        </div>
        <div
          className={`font-weight-500 ${draftsflag ? "drafts-tab" : "sents-tab"
            }`}
          onClick={() => handleSentDocs()}
        >
          Sent
        </div>
      </div>
      <div style={{ marginTop: "0%" }} className="ui divider"></div>
      {!draftsflag ? (timelineDraftlist?.length === 0 ? <div className="timeline-empty-area d-flex-col align-center justify-center 
           font-weight-500 m-auto border-df border-radius-4">
        <div className="position-relative">
          <img
            className="circle-icon-mobile"
            src={Ellipse_bg}
            alt="circle-icon"
          />
          <img
            className="timeline-icon-mobile position-absolute"
            src={timelineIcon}
            alt="timeline-icon"
          />
        </div>
        <div className="color-text-888888 font-weight-500 font-size-14 text-align-center width-46">
          you haven't added any items yet!
          <span className="primary-color-text font-weight-500 font-size-14 margin-left-4"
            onClick={() => handleCreateTimeline(true)}>
            Create New
          </span>
        </div>
      </div>
        :
        timelineDraftlist?.map(({ timelineName, createdAt, _id }) => {
          return (<div key={_id}
            onClick={()=>navigate("/innertimeline")}
            className="timeline-field border-df border-radius-4 divider-margin"
            name="draftMOM">
            <div className="d-flex justify-between padding-3">
              <div className="d-flex justify-flex-start width-100">
                <div>
                  <input
                    type="checkbox"
                    name="pointscheck"
                  />
                </div>
                <div className="d-flex-col justify-between width-85 margin-left-5">
                  <div
                    className="font-size-15 font-weight-500 width-fit-content color-text-000000">
                    {timelineName}
                  </div>
                  <div className="font-size-13 font-weight-400">{createdAt &&
                    `${createdAt?.substring(8, 10)} ${monthList[createdAt?.substring(5, 7
                    )]} ${createdAt?.substring(0, 4)}`}
                  </div>
                </div>
              </div>
              <Dropdown>
                <Dropdown.Toggle
                  as="button"
                  style={{
                    border: "none",
                    backgroundColor: "#ECEFF5",
                  }}
                >
                  <img src={threeDots} alt="threedots" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    className="d-flex align-center"
                  // onClick={() => handleSharedMOMdata(true)}
                  >
                    <HiOutlineShare className="share-icon margin-right-5" />
                    Share
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="d-flex align-center"
                  // onClick={() => handleEditDraftdata(_id)}
                  >
                    <FiEdit2 className="share-icon margin-right-5" />
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="d-flex align-center"
                    onClick={() => handleTimelineDeleteModal(true, _id)}
                  >
                    <AiOutlineDelete className="share-icon margin-right-5" />
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="mom-points d-flex-col text-align-justify padding-3">
              <div className="d-flex margin-top-15 color-text-666666 font-weight-400">
                <div className="">Timeline Start Date : </div>
                <div className=""> 20 Sept 2022</div>
              </div>
              <div style={{ width: "101%" }} className="d-flex justify-between divider-margin-5">
                <div className="d-flex color-text-666666">
                  <div className="">Timeline End Date : </div>
                  <div className=""> 20 Nov 2022</div>
                </div>
                <div className="border-radius-4 status-name small-font-12" style={{ background: "#EAF6E5", color: "#2BA400" }}>Completed</div>
              </div>
            </div>
          </div>)
        })
      )
        : (
          timelineSentlist?.length === 0 ? <div className="timeline-empty-area d-flex-col align-center justify-center 
           font-weight-500 m-auto border-df border-radius-4">
          <div className="position-relative">
            <img
              className="circle-icon-mobile"
              src={Ellipse_bg}
              alt="circle-icon"
            />
            <img
              className="timeline-icon-mobile position-absolute"
              src={timelineIcon}
              alt="timeline-icon"
            />
          </div>
          <div className="color-text-888888 font-weight-500 font-size-14 text-align-center width-46">
            you haven't sent any items yet!
            <span className="primary-color-text font-weight-500 font-size-14 margin-left-4"
              onClick={() => handleCreateTimeline(true)}>
              Create New
            </span>
          </div>
        </div>
          : 
          timelineSentlist?.map(({ timelineName, createdAt, _id }) => {
            return (<div key={_id}
              className="mom-field border-df border-radius-4 divider-margin"
              name="draftMOM">
              <div className="d-flex justify-between padding-3">
                <div className="d-flex justify-flex-start width-100">
                  <div>
                    <input
                      type="checkbox"
                      name="pointscheck"
                    />
                  </div>
                  <div className="d-flex-col justify-between width-85 margin-left-5">
                    <div
                      className="font-size-15 font-weight-500 width-fit-content color-text-000000">
                      {timelineName}
                    </div>
                    <div className="font-size-13 font-weight-400">{createdAt &&
                      `${createdAt?.substring(8, 10)} ${monthList[createdAt?.substring(5, 7
                      )]} ${createdAt?.substring(0, 4)}`}
                    </div>
                  </div>
                </div>
                <Dropdown>
                  <Dropdown.Toggle
                    as="button"
                    style={{
                      border: "none",
                      backgroundColor: "#ECEFF5",
                    }}
                  >
                    <img src={threeDots} alt="threedots" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      className="d-flex align-center"
                    // onClick={() => handleSharedMOMdata(true)}
                    >
                      <HiOutlineShare className="share-icon margin-right-5" />
                      Share
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="d-flex align-center"
                    // onClick={() => handleEditDraftdata(_id)}
                    >
                      <FiEdit2 className="share-icon margin-right-5" />
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="d-flex align-center"
                    // onClick={() => handleMOMModal(true, _id)}
                    >
                      <AiOutlineDelete className="share-icon margin-right-5" />
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="mom-points d-flex-col text-align-justify padding-3">
                <div className="d-flex margin-top-15 color-text-666666 font-weight-400">
                  <div className="">Timeline Start Date : </div>
                  <div className=""> 20 Sept 2022</div>
                </div>
                <div style={{ width: "101%" }} className="d-flex justify-between divider-margin-5">
                  <div className="d-flex color-text-666666">
                    <div className="">Timeline End Date : </div>
                    <div className=""> 20 Nov 2022</div>
                  </div>
                  <div className="border-radius-4 status-name small-font-12" style={{ background: "#EAF6E5", color: "#2BA400" }}>Completed</div>
                </div>
              </div>
            </div>)
          })
        )
      }
    </div>
  );
}

export default Mainsection;
