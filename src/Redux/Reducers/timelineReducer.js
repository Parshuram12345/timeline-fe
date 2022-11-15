const initialState = {
  timelineData: {},
  timelineItem:{}
};

const timelineReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TIMELINE_DATA":
      return {
        ...state,
        timelineData: action.payload,
      };

    case "GET_TIMELINE_ITEM":
      return {
        ...state,
        timelineItem : action.payload,
      };

    default:
      return state;
  }
};

export default timelineReducer;
