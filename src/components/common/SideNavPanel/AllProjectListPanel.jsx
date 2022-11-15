import React, { useState } from "react";
import axios from "axios"
import { Accordion } from "react-bootstrap";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import { TbChecklist } from "react-icons/tb";
import { MdSystemUpdateAlt, MdTimeline } from "react-icons/md";
import { BiFileBlank } from "react-icons/bi";
import styles from "./allProjectListPanel.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLocation, useNavigate,useParams } from "react-router-dom";
import { useRef } from "react";
import {data} from "../../../utils"

const AllProjectListPanel =({ socket }) => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const {projectId} = useParams();
  console.log(projectId)
  const location = useLocation();
  const projectList = useSelector((state) => state.addToCartReducer.projectList);
  const overRef = useRef(null);
  const {AccessToken,BaseUrl}=data;

  const userId = localStorage.getItem("userId");
  // const conversation = useSelector((state) => state.pmtPersist.conversation);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    setProjects([...projectList]);
  }, [projectList])
  

   ///---get client project ---////
   async function getClientProjects(userId) {
    return await axios.get(
      `${BaseUrl}/api/projects/getProjects?userId=${userId}`,
      {
        headers: {
          Authorization: AccessToken,
        }
      }
    );
  }
  useEffect(()=>{
    getClientProjects(userId)
    .then((res)=>{
      setProjects([...res.data.projects]);
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])


  // const getProjects = async () => {
  //   const res = await getReq(`${constants.PMT_BASE}/api/projects/getProjects?userId=${localStorage.getItem("userId")}`);
  //   if (res && !res.error) {
  //     dispatch(fetchProjects(res.data.projects));
  //   } else {
  //     console.log(res.error);
  //   }
  // };

  // const changeProjectStatus = async (event, projId) => {
  //   const projRes = await postReq(`${constants.PMT_BASE}/api/projects/addEditProject`, {
  //     id: projId,
  //     status: event.target.value,
  //   });
  //   if (projRes && !projRes.error) {
  //     getProjects();
  //     console.log("success");
  //   } else {
  //     console.log(projRes.error);
  //   }
  // };
  

////-----handle Accordian side nav ---//
function handleAccordian(Acor_header,projectId){
  console.log(projectId)
  localStorage.setItem("Acorheader",Acor_header)
  localStorage.setItem("projectId",projectId)
  navigateTo(`/${Acor_header}`);
}
  useEffect(() => {
  }, []);
  return (
    <React.Fragment>
      {/* {firstStep} */}
      <div className={styles.allProjectListContainer}>
        <div style={{ height: "fit-content" }}>
          <div className={styles.heading} onClick={() => navigateTo("/")}>
            <AiOutlineArrowLeft style={{ marginRight: "0.8rem" }} />
            All Projects
          </div>
          <div ref={overRef}>
            <Accordion defaultActiveKey={projectId && projectId} flush>
              {projects &&
                projects.map((curElem, index) => {
                  const updatedUnix = new Date(curElem.updatedAt).getTime();
                  const currentUnix = new Date().getTime();
                  const diffDay = Math.floor((currentUnix - updatedUnix) / 1000 / 60 / 60 / 24);
                  const diffHour = Math.floor((currentUnix - updatedUnix) / 1000 / 60 / 60);

                  const firstLetter = curElem.name.split(" ")[0] ? curElem.name.split(" ")[0].split("")[0].toUpperCase() : "";
                  const secondLetter = curElem.name.split(" ")[1] ? curElem.name.split(" ")[1].split("")[0].toUpperCase() : "";
                  const initials = firstLetter + secondLetter;
                  return (
                    <Accordion.Item
                      eventKey={curElem._id}
                      onClick={() => {
                        // openProject(curElem);
                        navigateTo("/project-discussion");
                      }}
                      key={curElem._id}
                      // className={tourActive && index === 0 && tourStep === 1 && "guide-active-part"}
                    >
                      <Accordion.Header className={projectId && curElem._id === projectId ? styles.selectedProjHeaderActive : styles.selectedProjHeaderInactive}>
                        <div className={styles.projectInitials}>{curElem.name && initials}</div>
                        <div className="d-flex flex-column">
                          <div className={styles.projectName}>{curElem.name && curElem.name}</div>
                          <div className="d-flex flex-wrap align-items-center" style={{ whiteSpace: "nowrap" }}>
                            <div className={styles.projectDetails}>
                              {curElem.location && curElem.city ? `${curElem.location},` : `${curElem.location}`} {curElem.city && curElem.city}
                            </div>
                            <div className={styles.projectDetails}>
                              <GoPrimitiveDot fontSize={6} style={{ margin: "0 0.1rem" }} />
                            </div>
                            <div className={styles.projectStatus}>{curElem.status && curElem.status === 1 ? "Active" : curElem.status === 2 ? "Inactive" : curElem.status === 3 && "Completed"}</div>
                            <div className={styles.projectDetails}>
                              <GoPrimitiveDot fontSize={6} style={{ margin: "0 0.1rem" }} />
                            </div>
                            {curElem.isSharedToClient ? (
                              <div className={styles.projectDetails}>{diffDay > 1 ? `${diffDay}d ago` : `${diffHour}h ago`}</div>
                            ) : (
                              <div style={{ fontSize: "9px", color: "#FF5858" }}>Project Not Shared</div>
                            )}
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div>
                          <div
                            className={
                              projectId && projectId=== curElem._id && location.pathname === "/project-discussion" ? styles.accordionIconTextActive : styles.accordionIconText
                            }
                            onClick={() => {
                              handleAccordian("project-discussion",projectId)
                            }}
                          >
                            <div className={styles.discussionIconContainer}>
                              <MdSystemUpdateAlt fontSize={16} />
                            </div>
                            Update
                          </div>
                          <div
                            className={projectId && projectId === curElem._id && location.pathname === "/files-and-media" ? styles.accordionIconTextActive : styles.accordionIconText}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleAccordian("files-and-media",projectId)
                            }}
                          >
                            <div className={styles.mediaIconContainer}>
                              <BiFileBlank fontSize={16} />
                            </div>
                            Files & Media
                          </div>
                          <div className={styles.accordionIconText} onClick={() => window.location.assign(`https://pro.idesign.market/mom/${curElem._id}`)}>
                            <div className={styles.momIconContainer}>
                              <TbChecklist fontSize={16} />
                            </div>
                            MOM
                          </div>
                          <div className={styles.accordionIconText} style={{ marginBottom: "5rem" }}>
                            <div className={styles.timelineIconContainer}>
                              <MdTimeline fontSize={16} />
                            </div>
                            Timeline
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
            </Accordion>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AllProjectListPanel;
