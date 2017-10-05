import * as React from "react";
import * as ReactDOM from "react-dom";
import {TimerView} from "./App";
import AppState from "./AppState";

const appState = new AppState();

if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(
    <TimerView appState={appState}/>,
    document.getElementById("root") as HTMLElement,
);
