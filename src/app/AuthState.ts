import * as ADAL from "adal-ts";
import {observable} from "mobx";

const config = new ADAL.AdalConfig(
    "ff4d4787-ed2f-4447-aaae-4aa80129655d",
    "srds.onmicrosoft.com",
    "http://localhost:3000/auth/ad/callback",
);

class AuthState {
    @observable public loggedIn = false;
    @observable public user? = false;

    public login() {
        const context = ADAL.Authentication.getContext(config);
        context.login();
    }

    public process() {
        ADAL.Authentication.getAadRedirectProcessor().process();
    }
}

export default AuthState;
