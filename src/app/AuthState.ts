import * as ADAL from "adal-ts";
import {User} from "adal-ts";
import {observable} from "mobx";

const config = new ADAL.AdalConfig(
    process.env.AD_CLIENT_ID as string,
    process.env.AD_TENANT as string,
    process.env.AD_CALLBACK_URL as string,
    process.env.AD_CALLBACK_URL as string,
    "token",
    `resource=${process.env.AD_RESOURCE as string}`,
);
const context = (process.env.PLATFORM === "browser") ? ADAL.Authentication.getContext(config) : undefined;

class AuthState {
    @observable public loggedIn = false;
    @observable public token?: string;
    @observable public user?: User;

    public login() {
        context!.login();
    }

    public process() {
        ADAL.Authentication.getAadRedirectProcessor().process();
        this.token = context!.getToken();
        this.user = context!.getUser();
        this.loggedIn = this.user !== null && this.token !== null;
    }

    public logout() {
        context!.logout();
    }
}

export default AuthState;
