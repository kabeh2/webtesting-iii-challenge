import * as actionType from "../actions/actionTypes";

export const initialState = {
  locked: false,
  closed: false
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.TOGGLE_LOCKED:
      return {
        ...state,
        locked: !state.locked
      };
    case actionType.TOGGLE_CLOSED:
      return {
        ...state,
        closed: !state.closed
      };
    default:
      return state;
  }
};

export default reducer;
