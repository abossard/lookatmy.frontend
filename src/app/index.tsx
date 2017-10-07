import * as React from "react";
import * as ReactDOM from "react-dom";
import ApiTest from "./ApiTest";
import {App} from "./App";
import AppState from "./AppState";
import AuthState from "./AuthState";

const appState = new AppState();
const authState = new AuthState();
const apiTest = new ApiTest();
authState.process();

if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(
    <App
        appState={appState}
        authState={authState}
        apiTest={apiTest}
    />,
    document.getElementById("root") as HTMLElement,
);
