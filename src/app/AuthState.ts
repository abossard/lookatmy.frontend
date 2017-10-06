import * as ADAL from "adal-ts";
import {observable} from "mobx";
import {User} from "adal-ts";

const config = new ADAL.AdalConfig(
    "ff4d4787-ed2f-4447-aaae-4aa80129655d",
    "srds.onmicrosoft.com",
    "http://localhost:8080",
);

const context = ADAL.Authentication.getContext(config);

class AuthState {
    @observable public loggedIn = false;
    @observable public token?: string;
    @observable public user?: User;

    public login() {
        context.login();
    }

    public process() {
        ADAL.Authentication.getAadRedirectProcessor().process();
        this.token = context.getToken();
        this.user = context.getUser();
        this.loggedIn = this.user !== null && this.token !== null;
    }

    public logout() {
        context.logout();
    }
}

export default AuthState;
