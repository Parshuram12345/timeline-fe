import { BaseUrl, AccessToken, projectId, statusList, monthList,timelineId } from './static/timelineConfig'
// console.log(localStorage.getItem("token"))
export function getToken(){
   return localStorage.getItem("token") ? localStorage.getItem("token"):null
}
export const data = {
   BaseUrl,
   AccessToken,
   projectId,
   statusList,
   monthList,
   timelineId
}