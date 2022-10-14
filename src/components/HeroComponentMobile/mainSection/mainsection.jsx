import React, { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import "./mainsection.css";

function Mainsection() {
  const [opeTimelineModal, setOpenTimelineModal] = useState(false);
  const [draftsflag, setDraftsflag] = useState(false);
  const [sentflag, setSentflag] = useState(false);

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
  return (
    <div className="main-wrapper-mobile">
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
            <img src={"/Images/doublevector.svg"} alt="vector" />
          </div>
          <div className="divider-bar">
            |{/* <img src={"/Images/line.svg"} alt="vertical-line" /> */}
          </div>
        <div className="timeline-head font-weight-500">Timeline</div>
        </div>
        <div className="" onClick={() => handleCreateTimeline(true)}>
          <img src={"/Images/timelineplus.svg"} alt="plus-icon" />
        </div>
      </div>
      <div className="d-flex width-30 justify-between">
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
      <div className="timeline-area d-flex-col align-center justify-center 
      font-weight-500 m-auto border-df border-radius-4">
        <div className="position-relative">
          <img
            className="circle-icon-mobile"
            src={"/Images/Ellipse.svg"}
            alt="circle-icon"
          />
          <img
            className="timeline-icon-mobile position-absolute"
            src={"/Images/timelineIcon.svg"}
            alt="timeline-icon"
          />
        </div>

        <div className="color-text-888888 font-weight-500 font-size-14 text-align-center width-46">
          you haven't added any items yet!
        <span className="primary-color-text font-weight-500 font-size-14 margin-left-4">
          Create New
        </span>
        </div>
      </div>
      {/* ///------modal code for create timeline name */}
      {opeTimelineModal && (
        <div className="main-modal-wrapper-mobile">
          <div className="modal-wrapper-mobile position-relative">
            <div className="content">
              <p className="notice-text-mobile">Write the Timeline name</p>
              <img
                className="position-absolute close-icon-mobile"
                onClick={() => handleCreateTimeline(false)}
                src={"/Images/akar-icons_cross.svg"}
                alt="cross-icon"
              />
              <input
                type="text"
                className="border-df bg-color-fa padding-5 border-radius-4 width-100"
                placeholder="Timeline name"
              />
            </div>
            <div className="actions">
              <div className="ui button submit-btn-mobile">submit</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mainsection;
