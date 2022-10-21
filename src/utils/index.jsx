import { BaseUrl, AccessToken, projectid, statusList, monthList } from './static/timelineConfig'
// console.log(localStorage.getItem("token"))
export function getToken(){
   return localStorage.getItem("token") ? localStorage.getItem("token"):null
}
export const data = {
   BaseUrl,
   AccessToken,
   projectid,
   statusList,
   monthList
}