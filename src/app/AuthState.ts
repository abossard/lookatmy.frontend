import * as ADAL from "adal-ts";
import {User} from "adal-ts";
import {observable} from "mobx";

const config = new ADAL.AdalConfig(
    __AD_CLIENT_ID__,
    __AD_TENANT__,
    __AD_CALLBACK_URL__,
    __AD_CALLBACK_URL__,
    "token",
    `resource=${__AD_RESOURCE__}`,
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
