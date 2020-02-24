import {observer} from "mobx-react";
import * as React from "react";
import {style} from "typestyle";
import ApiTest from "./ApiTest";
import AppState from "./AppState";

const mainStyle = style({
    color: "green",
    fontFamily: "comic sans, helvetica",
});

const makeSomeSpacePlease = style({
    paddingTop: 20,
});

@observer
class App extends React.Component<{ appState: AppState, apiTest: ApiTest }, {}> {
    public render() {
        return (
            <div className={mainStyle}>
                <h1>look at my <em>xyz</em></h1>
                <hr/>
                <dl>
                    <dt className={makeSomeSpacePlease}><h3>Async state example</h3></dt>
                    <dd>
                        <p>
                            Count
                        </p>
                        <button onClick={this.onReset}>
                            Counter: {this.props.appState.timer}
                        </button>
                    </dd>
                </dl>
                
            </div>
        );
    }

    public onReset = () => {
        this.props.appState.resetTimer();
    }
}

export {App};
