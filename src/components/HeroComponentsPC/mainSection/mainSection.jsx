import React, { useEffect, useState } from "react";
// import axios from "axios";
import { FiChevronRight, FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { HiOutlineShare } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./mainSection.css";
import { data } from "../../../utils";
import { imageslist } from './../../../utils/images/index';
import { createTimelineData, getTimelinedata, getTimelineItems, handleSingleDeleteTimeline } from "../../../Redux/Actions/timelineAction";
import axios from "axios";
function MainSection() {
  const dispatch = useDispatch()
  const appState = useSelector((state) => state.timelineReducer)
  const { timelineData, timelineItem } = appState;
  const [opeTimelineModal, setOpenTimelineModal] = useState(false);
  const [draftsflag, setDraftsflag] = useState(false);
  const [sentflag, setSentflag] = useState(false);
  const [timelineName, setTimelineName] = useState("");
  const [timelineNameError, setTimelineNameError] = useState(false);
  const [opendeleteModal, setOpendeleteModal] = useState(false)
  const [timelineDraftlist, setTimelineDraftlist] = useState([])
  const [timelineSentlist, setTimelineSentlist] = useState([])
  const [singleDeleteTimeline, setSingleDeleteTimeline] = useState("")
  const [designerName, setDesignerName] = useState("")
  const navigate = useNavigate();
  const { AccessToken, BaseUrl, projectId, monthList, statusCode, timelineId } = data;
  const { crossCloseIcon, Ellipse_bg, threeDots, colorTimeline, timelineIcon, longline } = imageslist
  ///---go to InnerPage of Timeline----///
  const goToInnerTimeline = (timelineId) => {
    navigate(`/innertimeline/${timelineId}`);
  };

  ///--go to shared timeline page of timeline----///
  const gotoSharedTimeline = (timelineId) => {
    navigate(`/sharedtimeline/${timelineId}`)
  }

  ///---create timeline ----///
  const handleCreateTimeline = (value) => {
    setOpenTimelineModal(value);
    if (timelineName) {
      setTimelineName("");
    }
  }

  ///----draftsdocs -----///
  const handleDraftsDocs = () => {
    setDraftsflag(false);
    setSentflag(true);
  };
  ///=----sentdocs----////
  const handleSentDocs = () => {
    setDraftsflag(true);
    setSentflag(false);
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

  ///----open single delete timeline modal -----///
  const handleTimelineDeleteModal = (value, id) => {
    if (value) {
      setSingleDeleteTimeline(id);
      setOpendeleteModal(value);
    } else {
      setOpendeleteModal(value);
      setSingleDeleteTimeline("");
    }
  }
  // ///------delete the timeline------////
  const handleDeleteTimeline = () => {
    setOpendeleteModal(false)
    dispatch(handleSingleDeleteTimeline(singleDeleteTimeline, projectId))
  }

  ///---add three dots for title after limit out----///
  function add3dotsItemName(title) {
    let dots = "..";
    let limit = 21;
    if (title.length > limit) {
      return title.substring(0, limit) + dots;
    } else {
      return title;
    }
  }

  ///---play with error state
  if (timelineName && timelineNameError) setTimelineNameError(false);

  ///---read the mom and edit it---///
  async function createTimeLine() {
    if (timelineName) {
      const bodydata = {
        timelineName: timelineName,
        projectId: projectId
      }
      // dispatch(createTimelineData(bodydata,projectId))
      const response = await axios({
        method: "post",
        url: `${BaseUrl}/api/timeline/addEditTimeline`,
        headers: { Authorization: AccessToken },
        data: bodydata
      })
      if (response?.data) {
        navigate(`/innertimeline/${response?.data?._id}`)
      }
      setOpenTimelineModal(false)
    } else {
      console.log("enter the timeline name")
      setTimelineNameError(true)
    }
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
    dispatch(getTimelinedata(projectId))
    dispatch(getTimelineItems(timelineId));
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
    setTimelineDraftlist(timelineData?.data?.filter((item) => item.isDraft === true))
    setTimelineSentlist(timelineData?.data?.filter((item) => item.isDraft === false))

    //--get timeline item---///

  }, [timelineData, timelineItem])
  return (
    <div className="main-wrapper">
      {/* ///------modal code for create timeline name */}
      {opeTimelineModal && (
        <div style={{ background: "#00000050" }} className="main-modal-wrapper">
          <div className="modal-wrapper-timeline position-relative">
            <div className="content">
              <p className="notice-text">Write the Timeline name</p>
              <img
                className="position-absolute close-icon cursor-pointer"
                onClick={() => handleCreateTimeline(false)}
                src={crossCloseIcon}
                alt="cross-icon"
              />
              <input
                type="text"
                className="border-df bg-color-fa padding-5 border-radius-4 width-100"
                placeholder="Timeline name"
                value={timelineName}
                onChange={(e) => setTimelineName(e.target.value)}
              />
            </div>
            {timelineNameError && <div style={{ color: "red", fontSize: "12px", paddingLeft: "7px" }}>Write the timeline</div>}
            <div style={{ marginTop: "1rem" }} className="actions">
              <div className="ui button submit-btn-timeline" onClick={() => createTimeLine()}>
                submit
              </div>
            </div>
          </div>
        </div>
      )}
      {/* modal for delete timeline */}
      {opendeleteModal && (
        <div style={{ background: "#00000050" }} className="main-modal-wrapper">
          <div className="modal-wrapper-delete">
            <div className="content">
              <p className="notice-text"> Are you sure you want to delete this?</p>
            </div>
            <div style={{ marginTop: "20px", width: "10rem" }} className="actions d-flex">
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
      {/* /// */}
      <div className="d-flex align-center justify-between width-fit-content divider-margin">
        <div className="small-font-12 color-text-888888">
          {designerName}
        </div>
        <span className="d-flex align-center color-text-888888 font-size-14">
          <FiChevronRight />
        </span>
        <div className="primary-color-text font-weight-500 small-font-12 cursor-pointer">
          Timeline
        </div>
      </div>
      <div className="d-flex justify-between align-center divider-margin">
        <div className="timeline-head font-weight-500 width-100">Timeline</div>
        <button
          className="timeline-button border-radius-4 cursor-pointer"
          onClick={() => handleCreateTimeline(true)}
        >
          Create new
        </button>
      </div>
      <div className="d-flex width-10 justify-between">
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
      {!draftsflag ?
        (timelineDraftlist?.length === 0 ? <div className="timeline-area d-flex-col align-center justify-center font-weight-500 m-auto">
          <div className="position-relative">
            <img
              className="circle-icon"
              src={Ellipse_bg}
              alt="circle-icon"
            />
            <img
              className="timeline-icon position-absolute"
              src={timelineIcon}
              alt="timeline-icon"
            />
          </div>
          <div className="color-text-888888 font-weight-500 small-font-12 text-align-center">
            you haven't made any Timelines yet
          </div>
          <div className="primary-color-text font-weight-500 small-font-12 cursor-pointer"
            onClick={() => handleCreateTimeline(true)}>Create New
          </div>
        </div>
          : <div className="d-flex justify-flex-start">
            <div className="timeline-header width-12 margin-left-6 small-font-12 font-weight-400">
              Name
            </div>
            <div className="timeline-header width-15 small-font-12 font-weight-400">
              Created Date
            </div>
            <div className="timeline-header width-20 small-font-12 font-weight-400">
              Timeline Start Date
            </div>
            <div className="timeline-header width-20 small-font-12 font-weight-400">
              Timeline End Date
            </div>
            <div className="timeline-header width-12 small-font-12 font-weight-400">
              Status
            </div>
          </div>) :
        (timelineSentlist?.length === 0 ? <div className="timeline-area d-flex-col align-center justify-center font-weight-500 m-auto">
          <div className="position-relative">
            <img
              className="circle-icon"
              src={Ellipse_bg}
              alt="circle-icon"
            />
            <img
              className="timeline-icon position-absolute"
              src={timelineIcon}
              alt="timeline-icon"
            />
          </div>
          <div className="color-text-888888 font-weight-500 small-font-12 text-align-center">
            you haven't sent any Timelines yet
          </div>
          <div className="primary-color-text font-weight-500 small-font-12"
            onClick={() => handleCreateTimeline(true)}>Create New
          </div>
        </div>
          : <div className="d-flex justify-flex-start">
            <div className="timeline-header width-12 margin-left-6 small-font-12 font-weight-400">
              Name
            </div>
            <div className="timeline-header width-15 small-font-12 font-weight-400">
              Created Date
            </div>
            <div className="timeline-header width-20 small-font-12 font-weight-400">
              Timeline Start Date
            </div>
            <div className="timeline-header width-20 small-font-12 font-weight-400">
              Timeline End Date
            </div>
            <div className="timeline-header width-12 small-font-12 font-weight-400">
              Status
            </div>
          </div>)
      }
      <div className={timelineData?.data?.length!==0 ? "timelines-wrapper" :""}>
        {!draftsflag ?
          (timelineDraftlist?.length > 0 &&
            timelineDraftlist?.map(({ timelineName, createdAt, timelineStartDate, status, timelineEndDate, _id }, index) => {
              return (
                <div
                  key={_id}
                  className="d-flex align-center justify-between border-radius-4 border-df divider-margin-8"
                >
                  <div
                    className="timeline-content-wrapper d-flex align-center justify-flex-start cursor-pointer"
                    onClick={() => goToInnerTimeline(_id)}
                  >
                    <div className="width-6">
                      <img
                        className=""
                        src={colorTimeline}
                        alt="colorTimeline"
                      />
                    </div>
                    <div className="width-15">{add3dotsItemName(timelineName)}</div>
                    <div className="width-19">{createdAt &&
                      `${createdAt?.substring(8, 10)} ${makeMonthFormat(createdAt?.substring(5, 7
                      ))} ${createdAt?.substring(0, 4)}`}</div>
                    <div className={`width-25  ${!timelineStartDate ? "padding-left-50 font-weight-400" : ""}`}>{timelineStartDate ? `${timelineStartDate?.substring(8, 10)} ${makeMonthFormat(timelineStartDate?.substring(5, 7
                    ))} ${timelineStartDate?.substring(0, 4)}` : <img style={{ marginLeft: "8px" }} src={longline} alt="longline" />}</div>
                    <div className={`width-24 ${!timelineEndDate ? "padding-left-50 font-weight-400" : ""}`}>{timelineEndDate ? `${timelineEndDate?.substring(8, 10)} ${makeMonthFormat(timelineEndDate?.substring(5, 7
                    ))} ${timelineEndDate?.substring(0, 4)}` : <img style={{ marginLeft: "8px" }} src={longline} alt="longline" />}</div>
                    <div className="status-container width-15">
                      {statusCode[status]}
                    </div>
                  </div>
                  <div className="width-3">
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
                        {/* <Dropdown.Item>
                          <HiOutlineShare className="share-icon" />
                          Share
                        </Dropdown.Item> */}
                        {/* <Dropdown.Item>
                          <FiEdit2 className="share-icon" />
                          Edit
                        </Dropdown.Item>
                      */}
                        <Dropdown.Item onClick={() => handleTimelineDeleteModal(true, _id, timelineName)}>
                          <AiOutlineDelete className="share-icon" />
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              );
            })) :
          (timelineSentlist?.length > 0 &&
            timelineSentlist?.map(({ timelineName, createdAt, timelineStartDate, timelineEndDate, status, _id }, index) => {
              return (
                <div
                  key={_id}
                  className="d-flex align-center justify-between border-radius-4 border-df divider-margin-8"
                >
                  <div
                    onClick={() => gotoSharedTimeline(_id)}
                    className="timeline-content-wrapper d-flex align-center justify-flex-start cursor-pointer"
                  // onClick={goToInnerTimeline}
                  >
                    <div className="width-6">
                      <img
                        className=""
                        src={colorTimeline}
                        alt="colorTimeline"
                      />
                    </div>
                    <div className="width-15">{add3dotsItemName(timelineName)}</div>
                    <div className="width-19">{createdAt &&
                      `${createdAt?.substring(8, 10)} ${makeMonthFormat(createdAt?.substring(5, 7
                      ))} ${createdAt?.substring(0, 4)}`}</div>
                    <div className="width-25">{timelineStartDate ? `${timelineStartDate?.substring(8, 10)} ${makeMonthFormat(timelineStartDate?.substring(5, 7
                    ))} ${timelineStartDate?.substring(0, 4)}` : <img style={{ marginLeft: "8px" }} src={longline} alt="longline" />}</div>
                    <div className="width-24">{timelineEndDate ? `${timelineEndDate?.substring(8, 10)} ${makeMonthFormat(timelineEndDate?.substring(5, 7
                    ))} ${timelineEndDate?.substring(0, 4)}` : <img style={{ marginLeft: "8px" }} src={longline} alt="longline" />}</div>
                    <div className="status-container width-15">
                      {statusCode[status]}
                    </div>
                  </div>
                  <div className="width-3">
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
                        {/* <Dropdown.Item>
                          <HiOutlineShare className="share-icon" />
                          Share
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <FiEdit2 className="share-icon" />
                          Edit
                        </Dropdown.Item> */}
                        <Dropdown.Item onClick={() => handleTimelineDeleteModal(true, _id, timelineName)}>
                          <AiOutlineDelete className="share-icon" />
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              );
            }))

        }
      </div>
    </div>
  );
}

export default MainSection;
