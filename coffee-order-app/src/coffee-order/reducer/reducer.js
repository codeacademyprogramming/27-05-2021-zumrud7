import * as ActionTypes from "../actions/action-types";
import { STATUS } from "../../redux/consts";

const initialState = {
  isLoading: false,
  data: [],
  status: STATUS.IDLE,
};
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ORDER_LIST:
      return {
        ...state,
        data: [],
        status: STATUS.LOADING,
        error: null,
      };
    case `${ActionTypes.GET_ORDER_LIST}_SUCCESS`:
      return {
        ...state,
        data: action.payload,
        status: STATUS.SUCCESS,
        error: null,
      };

    case `${ActionTypes.GET_ORDER_LIST}_ERROR`:
      return {
        ...state,
        data: [],
        status: STATUS.ERROR,
        error: action.error,
      };
    case ActionTypes.ADD_ORDER:
      return {
        ...state,
        data: [...state.data, action.payload],
        error: null,
        status: STATUS.SUCCESS,
      };
    default:
      break;
  }
  return state;
};

export default Reducer;
