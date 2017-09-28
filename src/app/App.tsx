import React from 'react';
import {style} from 'typestyle';

import {observable} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

class AppState {
    @observable timer = 0;

    constructor() {
        setInterval(() => {
            this.timer += 1;
        }, 1000);
    }

    resetTimer() {
        this.timer = 0;
    }
}

const redText = style({color: 'red'});

@observer
class TimerView extends React.Component<{appState: AppState}, {}> {
    render() {
        return (
            <div className={redText}>
                <h1>Hello</h1>
                <button onClick={this.onReset}>
                    Seconds passed: {this.props.appState.timer}
                </button>
                <DevTools />
            </div>
        );
    }

    onReset = () => {
        this.props.appState.resetTimer();
    }
}

export {TimerView, AppState};