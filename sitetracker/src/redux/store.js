import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/root";
//import reduxLogger from "redux-logger";
import thunk from "redux-thunk"
//import axios from "axios";

const error = (store) => (next) => (action) => {
  try{
    next(action);
  } catch(err){
    console.log("error! ", err);
  }
}

var middleware = null;
if(process.env.REACT_APP_DEV === 'true'){
  //middleware = applyMiddleware(error, reduxLogger, thunk);
  middleware = applyMiddleware(error, thunk);
}else{
  middleware = applyMiddleware(error, thunk);
}
const store = createStore(rootReducer,{},middleware);

export default store;
