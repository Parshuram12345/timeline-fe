const initialState = {
  timelineData: {},
};

const timelineReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TIMELINE_DATA":
      return {
        ...state,
        timelineData: action.payload,
      };

    // case "SAVE_TIMELINE_DATA":
    //   return {
    //     ...state,
    //     savetimeline : action.payload,
    //   };

    default:
      return state;
  }
};

export default timelineReducer;
