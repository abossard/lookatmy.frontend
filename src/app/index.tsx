import * as React from "react";
import * as ReactDOM from "react-dom";
import {TimerView} from "./App";
import AppState from "./AppState";
import AuthState from "./AuthState";

const appState = new AppState();
const authState = new AuthState();

if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(
    <TimerView appState={appState}/>,
    document.getElementById("root") as HTMLElement,
);
