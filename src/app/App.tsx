import {observer} from "mobx-react";
import DevTools from "mobx-react-devtools";
import * as React from "react";
import {style} from "typestyle";
import AppState from "./AppState";

const mainStyle = style({
    color: "black",
    fontFamily: "helvetica",
});

const makeSomeSpacePlease = style({
    paddingTop: 20,
});

@observer
class TimerView extends React.Component<{ appState: AppState }, {}> {
    public render() {
        return (
            <div className={mainStyle}>
                <h1>look at my <em>xyz</em></h1>
                <hr/>
                <dl>
                    <dt className={makeSomeSpacePlease}><h3>Login test links</h3></dt>
                    <dd>
                        <a href="/auth/facebook">Login/Sign Up with Facebook</a><br/>
                        <a href="/nice">Nice site to check if I'm logged in</a><br/>
                        <a href="/logout">Logout</a><br/>
                    </dd>
                    <dt className={makeSomeSpacePlease}><h3>Async state example</h3></dt>
                    <dd>
                        <p>
                            This button receives the next second from <em>outside</em>. A click on it, resets it to 0.
                        </p>
                        <button onClick={this.onReset}>
                            time passed [ms]: {this.props.appState.timer}
                        </button>
                    </dd>
                    <dt className={makeSomeSpacePlease}><h3>In Browser XMR mining</h3></dt>
                    <dd>
                        <p>This page contains <a href="https://github.com/cazala/coin-hive">cazala/coin-hive</a>
                            , a javascript based XMR miner.</p>
                    </dd>
                </dl>
                <DevTools/>
            </div>
        );
    }

    public onReset = () => {
        this.props.appState.resetTimer();
    }
}

export {TimerView, AppState};
