import * as actionType from "./actionTypes";

export const toggleLocked = () => {
  return {
    type: actionType.TOGGLE_LOCKED
  };
};

export const toggleClosed = () => {
  return {
    type: actionType.TOGGLE_CLOSED
  };
};
