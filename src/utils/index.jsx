import { BaseUrl, AccessToken, projectId, monthList,statusCode,randomColor} from './static/timelineConfig'
// console.log(localStorage.getItem("token"))
export function getToken(){
   return localStorage.getItem("token") ? localStorage.getItem("token"):null
}
export const data = {
   BaseUrl,
   AccessToken,
   projectId,
   monthList,
   // timelineId,
   statusCode,
   randomColor,
}