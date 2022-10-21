import { getReq, postReq, putReq } from "../../service/api";
import { BaseUrl } from "../../utils/static/timelineConfig";

export function getTimelineData(timelineData) {
  return {
    type: "GET_TIMELINE_DATA",
    payload: timelineData,
  };
}
export function postTimelineData(savetimeline) {
  return {
    type: "SAVE_TIMELINE_DATA",
    payload: savetimeline,
  };
}

export function getTimelinedata(projectId) {
  return async (dispatch, getState) => {
    const response = await getReq(
      `${BaseUrl}/api/timeline/getTimelines?projectId=${projectId}`
    );
    if (response && !response.error) {
        console.log(response)
      dispatch(getTimelineData(response));
    } else {
      console.log(response.error);
    }
  };
}
export function createTimelineData(projectId,timelinename){
    const bodydata ={
        
        name:timelinename,
        projectId:projectId
    }
    return async(dispatch,getState)=>{
        const res = await postReq(`${BaseUrl}/api/timeline/addEditTimeline`,bodydata)
        if (res && !res.error) {
            console.log(res)
          dispatch(getTimelineData(res));
        } else {
          console.log(res.error);
        }
    }
}
