import { createStore, applyMiddleware } from "redux";
import reducer from "../reducers/index";
import thunk from "redux-thunk";

export default function configureStore(initialState: any) {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(thunk)
  );
}
