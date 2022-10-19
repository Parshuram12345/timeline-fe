const initialState = {
  leadBucket: "new",
  isLoading: true,
  buyLeadsFilterBudget: "all",
  buyLeadsFilterWork: "all",
};

const noPersist = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_LEAD_BUCKET":
      return {
        ...state,
        leadBucket: action.payload,
      };

    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "BUY_LEADS_FILTER_BUDGET":
      return {
        ...state,
        buyLeadsFilterBudget: action.payload,
      };

    case "BUY_LEADS_FILTER_WORK":
      return {
        ...state,
        buyLeadsFilterWork: action.payload,
      };

    default:
      return state;
  }
};
export default noPersist;
