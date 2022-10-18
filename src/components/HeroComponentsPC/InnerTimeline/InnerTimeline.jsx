import React, { useState } from "react";
import "./InnerTimeline.css";
import { HiOutlineShare, HiOutlineMinusCircle } from "react-icons/hi";
import { AiOutlineDelete, AiFillCaretDown } from "react-icons/ai";
import { FiChevronRight, FiEdit2 } from "react-icons/fi";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function InnerTimeline() {
  const [itemsflag, setItemsflag] = useState(false);
  const [ghanttflag, setGhanttflag] = useState(false);
  const navigate = useNavigate();
  const dummyArr = Array.from({ length: 1 });
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
          className="font-weight-500 small-font-12 color-text-888888 cursor-pointer"
          onClick={navigateTimeline}
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
        <div className="draft-share-btn-wrapper d-flex align-center justify-between width-27">
          <button
            className="savedata-button font-size-12 font-weight-400 border-radius-4"
            //   onClick={() => handleSaveDraft()}
          >
            Save as Draft
          </button>
          <button
            className="submitdata-button bg-color border-none border-radius-4"
            //   onClick={() => handleSubmitData()}
          >
            Share
          </button>
        </div>
      </div>
      <div className="d-flex justify-between align-center margin-top-10">
        <div className="d-flex width-12 justify-between">
          <div
            className={`font-weight-500 ${
              !itemsflag ? "items-tab" : "ghantt-tab"
            }`}
            onClick={() => handleItemsDocs()}
          >
            Items
          </div>
          <div
            className={`font-weight-500 ${
              itemsflag ? "items-tab" : "ghantt-tab"
            }`}
            onClick={() => handleGhanttDocs()}
          >
            Ghantt View
          </div>
        </div>
        <div className="d-flex justify-between align-center width-25">
          <div>
            <img
              className="add-item"
              src={"/Images/+additem.svg"}
              alt="add-item"
            />
          </div>
          <div>
            <img
              className="search-icon"
              src={"/Images/searchicon.svg"}
              alt="search-icon"
            />
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
                <img src={"/Images/threedots.svg"} alt="threedots" />
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
      </div>
      <div style={{ marginTop: "0%" }} className="ui divider"></div>
      {/* <div>Timeline 1</div> */}
      <div className="items-wrapper d-flex justify-flex-start color-text-444444 font-weight-400">
        <div className="width-15">Items</div>
        <div className="width-20">Start Date</div>
        <div className="width-15">Days</div>
        <div className="width-20">End Date</div>
        <div className="width-15">Status</div>
        <div className="width-20">Remark</div>
      </div>
      <div style={{ marginTop: "0%" }} className="ui divider"></div>
      <div>
        {dummyArr &&
          dummyArr.map((_, index) => {
            return (
              <>
                <div
                  key={index}
                  className="item-container d-flex justify-flex-start align-center"
                >
                  <div className="width-3">
                    <img
                      className="hash-icon"
                      src={"Images/hash.svg"}
                      alt="hash-icon"
                    />
                  </div>
                  <div className="position-relative width-13">
                    <input
                      type="text"
                      className="border-df bg-color-fa border-radius-4 padding-3 width-80"
                      placeholder="Item name"
                    />
                    <AiFillCaretDown className="position-absolute down-arrow-icon color-text-888888" />
                  </div>
                  <div className="d-flex justify-between align-center position-relative width-18">
                    <input
                      type="text"
                      className="border-df bg-color-ff padding-5 border-radius-4 width-88"
                      placeholder="Select date"
                      onFocus={(e) => (e.target.type = "date")}
                    />
                    {/* <AiFillCaretDown
            style={{ background: "white" }}
            className="position-absolute down-arrow-date-icon color-text-888888"
          /> */}
                  </div>
                  <div className="position-relative width-14">
                    <input
                      type="text"
                      className="border-df color-text-888888 bg-color-fa border-radius-4 width-80 padding-3"
                      placeholder="No. of days"
                    />
                    <AiFillCaretDown className="position-absolute down-arrow-icon color-text-888888" />
                  </div>
                  <div className="d-flex justify-between align-center position-relative width-18">
                    <input
                      type="text"
                      className="border-df bg-color-ff padding-5 border-radius-4 width-88"
                      placeholder="Select date"
                      onFocus={(e) => (e.target.type = "date")}
                    />
                    {/* <AiFillCaretDown
            style={{ background: "white" }}
            className="position-absolute down-arrow-date-icon color-text-888888"
          /> */}
                  </div>
                  <div className="width-13 position-relative">
                    {/* <Dropdown>
                      <Dropdown.Toggle
                        as="button"
                        className="border-df padding-3 border-radius-4 width-88"
                      >
                        Yet to start
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>Yet to start</Dropdown.Item>
                        <Dropdown.Item>ACTIVE</Dropdown.Item>
                        <Dropdown.Item>PENDING</Dropdown.Item>
                        <Dropdown.Item>DELAYED</Dropdown.Item>
                        <Dropdown.Item>COMPLETED</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown> */}
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>Yet to start</option>
                      <option value="1">ACTIVE</option>
                      <option value="2">PENDING</option>
                      <option value="3">DELAYED</option>
                      <option value="3">COMPLETED</option>
                    </select>
                    <AiFillCaretDown className="position-absolute arrow-icon right-13 top-8 color-text-888888"/>
                  </div>
                  <div className="width-20 remarks-field">
                    <textarea
                      rows="1"
                      cols="17"
                      style={{resize:"none"}}
                      className="border-df border-radius-4 padding-3 bg-color-fa"
                      placeholder="type something..."
                    />
                  </div>
                  <HiOutlineMinusCircle style={{ color: "red" }} />
                </div>
              </>
            );
          })}
          <div className="d-flex justify-flex-start">
            <div className="width-3"></div>
            <div className="width-13">item1</div>
            <div className="width-18">22 sep 2022</div>
            <div className="width-14">8 days</div>
            <div className="width-18">30 sep 2022</div>
            <div className="width-13">yet to start</div>
            <div className="width-18">compelete a day before</div>
            <div></div>
          </div>
      </div>
      <div>
        <img
          className="add-more-item"
          src={"Images/addmoreitem.svg"}
          alt="add-more-item"
        />
      </div>
       {/* ///----open update modal--- */}
       <div className="main-modal-wrapper">
            <div className="modal-wrapper position-relative">
              <div>Item 1</div>
              <img className="closeicon position-absolute" src={"/Images/akar-icons_cross.svg"} alt="close-icon" />
              <div style={{ margin:"0%"}} className="ui divider"></div>
              <div className="content">
               <div className="d-flex justify-between width-60">
               <label className="label-text">Start Date</label>
               <div>22 sep 2022</div>
                </div>
                <div className="d-flex justify-between width-60">
               <label className="label-text">Days</label>
               <div>9 days</div>
                  </div>
                  <div className="d-flex justify-between width-60">
               <label className="label-text">End Date</label>
               <div>29 sep 2022</div>
                </div>
                <div className="d-flex justify-between width-60">
               <label className="label-text">Satus</label>
               <div style={{color:"#3B5998"}}>Active</div>
                </div>
               <label className="label-text">Reason</label>
               <textarea placeholder="Nothing to show here"></textarea>
              </div>
              <div style={{marginTop:"20px"}} className="actions">
                <div
                  className="ui button yes-btn"
                  // onClick={() => handleSingleDeleteMOM()}
                >
                  Update Status
                </div>
              </div>
            </div>
          </div>
    </div>
  );
}

export default InnerTimeline;
