import * as React from "react";
import * as ReactDOM from "react-dom";
import {App} from "./App";
import AppState from "./AppState";
import AuthState from "./AuthState";

const appState = new AppState();
const authState = new AuthState();

authState.process();

if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(
    <App appState={appState} authState={authState} />,
    document.getElementById("root") as HTMLElement,
);
