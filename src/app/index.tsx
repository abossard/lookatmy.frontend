import * as React from "react";
import * as ReactDOM from "react-dom";
import {setStylesTarget} from "typestyle";

import {App} from "./App";
import {createStore} from "./State";

const store = createStore();

if (module.hot) {
    module.hot.accept();
}

ReactDOM.hydrate(
    <App {...store} />,
    document.getElementById("root") as HTMLElement,
);

setStylesTarget(document.getElementById("styles-target") as HTMLElement);