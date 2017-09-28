import React from "react";
import ReactDOM from "react-dom";
import {TimerView} from "./App";
import AppState from "./AppState";

const appState = new AppState();

ReactDOM.render(
    <TimerView appState={appState}/>,
    document.getElementById("root") as HTMLElement,
);
