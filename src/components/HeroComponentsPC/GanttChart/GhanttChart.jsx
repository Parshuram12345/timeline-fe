import React, { useState, useEffect } from "react";
import TimeLine from "react-gantt-timeline";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTimelineItems } from "../../../Redux/Actions/timelineAction";
import { data } from "../../../utils";

function Demo({ timelineItems }) {
  const { timelineId } = useParams()
  const { randomColor } = data;
  // const [timelineItems,setTimelineItems]=useState([])
  const [itemsLIst, setItemsLIst] = useState([])
  // console.log(data)
  let newdata = [...itemsLIst];

  //---set the re-loop color-----///
  const handleColorLoop=(i)=>{
    let newIndex = Math.trunc(i%randomColor.length);
    return randomColor[newIndex];
  }
  useEffect(() => {
    for (let i = 0; i < timelineItems.length; i++) {
      newdata[i] = {
        id: i + 1,
        start: new Date(timelineItems[i].startDate),
        end: new Date(timelineItems[i].endDate),
        name: timelineItems[i].itemName,
        color: i < randomColor.length ? randomColor[i] : handleColorLoop(i),
      }
    }
    setItemsLIst(newdata)
  }, [])
  return (
    <div className="app-container">
      <div className="time-line-container">
        <TimeLine data={itemsLIst} />
      </div>
    </div>
  );
}
export default Demo;