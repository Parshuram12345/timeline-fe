import { getReq, postReq, putReq } from "../../service/api";
import { BaseUrl, timelineId } from "../../utils/static/timelineConfig";

export function getTimelineData(timelineData) {
  return {
    type: "GET_TIMELINE_DATA",
    payload: timelineData,
  };
}
export function getItems(getTimelineItems) {
  return {
    type: "GET_TIMELINE_ITEM",
    payload: getTimelineItems,
  };
}

export function getTimelinedata(projectId) {
  return async (dispatch, getState) => {
    const response = await getReq(
      `${BaseUrl}/api/timeline/getTimelines?projectId=${projectId}`
    );
    if (response && !response.error) {
      // console.log(response)
      dispatch(getTimelineData(response))
    } else {
      console.log(response.error)
    }
  }
}
export function createTimelineData(bodydata,projectId) {
  return async (dispatch, getState) => {
    const res = await postReq(`${BaseUrl}/api/timeline/addEditTimeline`, bodydata)
    if (res && !res.error) {
      dispatch(getTimelinedata(projectId));
    } else {
      console.log(res.error);
    }
  }
}

export function handleSingleDeleteTimeline(singleDeleteTimelineid, projectId) {
  const bodydata = {
    id: singleDeleteTimelineid,
    projectId: projectId,
    isDeleted: true
  }
  return async (dispatch, getState) => {
    const res = await postReq(`${BaseUrl}/api/timeline/addEditTimeline`, bodydata)
    if (res && !res.error) {
      // console.log(res)
      dispatch(getTimelinedata(projectId));
    } else {
      console.log(res.error);
    }
  }
}


export function getTimelineItems(timelineId){
  return async(dispatch,getState)=>{
    const response = await getReq( `${BaseUrl}/api/timeline/getItems?timelineId=${timelineId}`);
    if (response && !response.error) {
      dispatch(getItems(response));
    } else {
      console.log(response.error)
    }
  }
}

export function addEditItems(timelineId,bodydata){
  return async(dispatch,getState)=>{
    const res = await postReq(`${BaseUrl}/api/timeline/addEditItems`,bodydata) 
    if(res && !res.error){
      dispatch(getTimelineItems(timelineId))
    }
    else{
      console.log(res.error)
    }
  }
}
export function deleteTimelineItem(id,timelineId){
  const bodydata = {
    id:id,
    isDeleted: true
  }
  return async (dispatch,getState)=>{
    const res = await postReq(`${BaseUrl}/api/timeline/addEditItems`,bodydata)
    if (res && !res.error) {
      console.log(res)
      dispatch(getTimelineItems(timelineId));
    } else {
      console.log(res.error);
    }
  }
   
}