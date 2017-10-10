import ApiTest from "./ApiTest";
import AppState from "./AppState";
import AuthState from "./AuthState";

const appState = new AppState();
const authState = new AuthState();
const apiTest = new ApiTest();

export function createStore() {
    return {
        apiTest,
        appState,
        authState,
    };
}
