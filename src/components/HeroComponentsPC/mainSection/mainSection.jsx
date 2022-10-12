import React, { useEffect, useState } from "react";
import axios from "axios";
import {FiChevronRight,FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { HiOutlineShare } from "react-icons/hi";
import { AiOutlineDelete} from "react-icons/ai";
// import { FaRegEdit } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import "./mainSection.css";
import {data} from "../../../utils"

function MainSection() {
  const [opeTimelineModal, setOpenTimelineModal] = useState(false);
  const [draftsflag, setDraftsflag] = useState(false);
  const [sentflag, setSentflag] = useState(false);
  const [timelineName,setTimelineName]=useState("")
  const navigate = useNavigate();
  const {AccessToken,BaseUrl,projectid}=data;
  const dummayarr = Array.from({length:2})

  ///---go to InnerPage of Timeline----///
  const goToInnerTimeline=()=>{
    navigate("/innertimeline")
  }
  ///---create timeline ----///
  const handleCreateTimeline = (value) => {
    setOpenTimelineModal(value);
    if(timelineName){
      setTimelineName("")
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
  };
  
  ///---read the mom and edit it---///
async function createTimeLine(){
  await axios({
    method:"post",
    url:`${BaseUrl}/api/timeline/addEditTimeline`,
    headers: {
      "Content-Type": "application/json",
      Authorization: AccessToken,
    },
    data: {
      projectId :projectid,
      name : timelineName
    },
  })
  .then((response)=>{
    if(response.status===200){
      setTimelineName("")
      setOpenTimelineModal(false)
      console.log(response.data)
     }
  })
  .catch((err)=>{
    console.log(err)
  })
 
  }
useEffect(()=>{
},[])
  return (
    <div className="main-wrapper">
      <div className="d-flex align-center justify-between width-fit-content divider-margin">
          <div className="small-font-12 color-text-888888">
            Ashok rathi residence
          </div>
          <span className="d-flex align-center color-text-888888 font-size-14">
            <FiChevronRight />
          </span>
          <div className="primary-color-text font-weight-500 small-font-12 cursor-pointer">Timeline</div>
        </div>
      <div className="d-flex justify-between align-center divider-margin">
        <div className="timeline-head font-weight-500 width-100">Timeline</div>
        <button
          className="timeline-button border-radius-4"
          onClick={() => handleCreateTimeline(true)}
        >
          Create new
        </button>
      </div>
      <div className="d-flex width-15 justify-between">
          <div
            className={`font-weight-500 ${
              !draftsflag ? "drafts-tab" : "sents-tab"
            }`}
            onClick={() => handleDraftsDocs()}
          >
            Drafts
          </div>
          <div
            className={`font-weight-500 ${
              draftsflag ? "drafts-tab" : "sents-tab"
            }`}
            onClick={() => handleSentDocs()}
          >
            Sent
          </div>
        </div>
        <div style={{ marginTop: "0%" }} className="ui divider"></div>
      {/* <div className="timeline-area d-flex-col align-center justify-center font-weight-500 m-auto">
        <div className="position-relative">
        <img
          className="circle-icon"
          src={"/Images/Ellipse.svg"}
          alt="circle-icon"
        />
        <img
          className="timeline-icon position-absolute"
          src={"/Images/timelineIcon.svg"}
          alt="timeline-icon"
          />
          </div>
        <div className="color-text-888888 font-weight-500 small-font-12 text-align-center">
          you haven't made any Timelines yet
        </div>
        <div className="primary-color-text font-weight-500 small-font-12"
         onClick={() => handleCreateTimeline(true)}>Create New
        </div>
        </div> */}
        <div className="d-flex justify-flex-start">
          <div className="timeline-header width-12 margin-left-6 small-font-12 font-weight-400">Name</div>
          <div className="timeline-header width-15 small-font-12 font-weight-400">CreateDate</div>
          <div className="timeline-header width-20 small-font-12 font-weight-400">Timeline Start Date</div>
          <div className="timeline-header width-20 small-font-12 font-weight-400">Timeline End Date</div>
          <div className="timeline-header width-12 small-font-12 font-weight-400">Status</div>
        </div>
        
        <div>
          {dummayarr && dummayarr.map((_,index)=>{
            return(
              <>
            <div  key={index} className="d-flex align-center justify-between border-radius-4 border-df divider-margin-8">
            <div className="timeline-content-wrapper d-flex justify-flex-start cursor-pointer" onClick={goToInnerTimeline}>
              <div className="width-6">
                <img className="" src={"/Images/colortimeline.svg"}  alt="three-vector"/>
              </div>
            <div className="width-15">Timeline {index+1}</div>
            <div className="width-19">{index+28} Sep 2022</div>
            <div className="width-25">{index+30} Sep 2022</div>
            <div className="width-24">{index+1} Nov 2022</div>
            <div className="status-container width-15">Yet to start</div>
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
                            <img
                              src={"/Images/threedots.svg"}
                              alt="threedots"
                            />
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
                            <Dropdown.Item
                            >
                              <AiOutlineDelete className="share-icon" />
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                </div>
            </div>
            </>
              ) 
          })}
        </div>

      {/* ///------modal code for create timeline name */}
      {opeTimelineModal && (
        <div className="main-modal-wrapper">
          <div className="modal-wrapper position-relative">
            <div className="content">
                <p className="notice-text">Write the Timeline name</p>
                <img 
                  className="position-absolute close-icon"
                  onClick={() => handleCreateTimeline(false)}
                  src={"/Images/akar-icons_cross.svg"}
                  alt="cross-icon"
                />
              <input type="text" className="border-df bg-color-fa padding-5 border-radius-4 width-100" 
              placeholder="Timeline name" value={timelineName} onChange={(e)=>setTimelineName(e.target.value)}/>
            </div>
            <div className="actions">
              <div className="ui button submit-btn" onClick={createTimeLine}>submit</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainSection;
