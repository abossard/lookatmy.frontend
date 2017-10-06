import {observer} from "mobx-react";
import DevTools from "mobx-react-devtools";
import * as React from "react";
import {style} from "typestyle";
import AppState from "./AppState";
import AuthState from "./AuthState";

const mainStyle = style({
    color: "green",
    fontFamily: "comic sans, helvetica",
});

const makeSomeSpacePlease = style({
    paddingTop: 20,
});

@observer
class App extends React.Component<{ appState: AppState, authState: AuthState }, {}> {
    public render() {
        return (
            <div className={mainStyle}>
                <h1>look at my <em>xyz</em></h1>
                <hr/>
                <dl>
                    <dt className={makeSomeSpacePlease}>SPA Login, yeah</dt>
                    <dd>
                        {this.props.authState.loggedIn ?
                            <div>Yes, you did it {this.props.authState.user && this.props.authState.user.name}
                                <br/>
                                Your magic cookie token is:
                                <textarea name="token" id="" cols={30} rows={1}>
                                    {this.props.authState.token}
                                </textarea>
                                <br/>
                                <button onClick={this.props.authState.logout}>Logout</button>
                            </div>
                            : <button onClick={this.props.authState.login}>Login</button>
                        }

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
                </dl>
                <DevTools/>
            </div>
        );
    }

    public onReset = () => {
        this.props.appState.resetTimer();
    }
}

export {App};
