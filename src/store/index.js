// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
// let composeEnhancers = null;

// if (
//   process.env.NODE_ENV === "development" &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
// ) {
//   composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose;
// } else {
//   composeEnhancers = compose;
// }

// export default createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );

// migrating to @redux/toolkit
import rootReducer from "../reducers";
import { configureStore } from "@reduxjs/toolkit";
export default configureStore({
  reducer: rootReducer,
  devTools: true,
});
