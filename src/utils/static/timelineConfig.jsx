export const BaseUrl = "https://pmt.idesign.market";
export const AccessToken = localStorage.getItem("token");
// export const AccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6MiwidXNlcklkIjoiNjMzNTM2ZjJmYzIzMmMyZmMxZTU5OGNkIiwiZGV2aWNlSWQiOiIyNTAxMDA2NDY0NTM3MzYxMDUwMDA1MzczNjU3NjgxMzY2MjQiLCJpYXQiOjE2NjQ0MzE4NTh9.Z1GFrGZgxBcW8xtfhFFQqAG4cL-0WB0J-WiprcvzL5g";
export const projectId = localStorage.getItem("projectId")
export const timelineId = "6370d4e039c38e5d7c55864f"  //timeline2
//0-Yet to Start 1-Active 2-Pending 3-Delayed 4-Completed
export const statusCode = ["Yet to Start", "Active", "Pending", "Delayed", "Completed"]
export const monthList =
   ["zero",
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"];