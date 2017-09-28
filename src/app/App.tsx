import * as React from "react";
import {style} from "typestyle";

import {observer} from "mobx-react";
import DevTools from "mobx-react-devtools";
import AppState from "./AppState";

const redText = style({color: "red"});

@observer
class TimerView extends React.Component<{appState: AppState}, {}> {
    public render() {
        return (
            <div className={redText}>
                <h1>Hello, World!</h1>
                <button onClick={this.onReset}>
                    Seconds passed: {this.props.appState.timer}
                </button>
                <DevTools />
            </div>
        );
    }

    public onReset = () => {
        this.props.appState.resetTimer();
    }
}

export {TimerView, AppState};
