import ApiTest from "./ApiTest";
import AppState from "./AppState";

const appState = new AppState();
const apiTest = new ApiTest();

export function createStore() {
    return {
        apiTest,
        appState,
    };
}
