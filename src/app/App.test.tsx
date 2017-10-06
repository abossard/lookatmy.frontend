import * as React from "react";
import {create} from "react-test-renderer";
import {App} from "./App";
import AppState from "./AppState";
import AuthState from "./AuthState";

test("Does render", () => {
    const component = create(
        <App appState={new AppState()} authState={new AuthState()}/>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
