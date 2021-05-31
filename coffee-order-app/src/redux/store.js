import Reducer from "../coffee-order/reducer/reducer";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

export const store = createStore(Reducer, applyMiddleware(thunk));
