import React from "react";
import memoryGame from "./Redux/reducers";
import "./styles/Game.css";
import "./styles/index.css";
import { initGame } from "./Redux/actions";
import { Provider } from "react-redux";
import { MAX_PAIRS } from "./cardFunctions";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createRoot } from "react-dom/client";
import ChooseGrid from "./Components/ChooseGrid";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(memoryGame, composeEnhancers(applyMiddleware(thunk)));
store.dispatch(initGame(MAX_PAIRS));

const container = document.getElementById("root");

const root = createRoot(container);
root.render(
  <Provider store={store}>
    <ChooseGrid />
  </Provider>
);
