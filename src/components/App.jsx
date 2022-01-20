import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from "../store/reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import RouterApp from "./RouterApp";


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
// const store = createStore(reducer, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterApp />
      </Provider>
    );
  }
}

export default App;
