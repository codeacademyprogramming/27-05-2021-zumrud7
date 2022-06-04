import * as ActionTypes from "./action-types";

export function getOrders() {
  return function (dispatch) {
    fetch("order-list.json")
      .then((resp) => resp.json())
      .then((list) => {
        dispatch({
          type: `${ActionTypes.GET_ORDER_LIST}_SUCCESS`,
          payload: list,
        });
      })
      .catch((err) => {
        dispatch({
          type: `${ActionTypes.GET_ORDER_LIST}_ERROR`,
          payload: err,
        });
      });
  };
}

export function addOrders(order) {
  return {
    type: ActionTypes.ADD_ORDER,
    payload: order,
  };
}
