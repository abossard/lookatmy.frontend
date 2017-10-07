import {observable} from "mobx";

class ApiTest {
    @observable public result?: Response;

    public async makeCall(accessToken?: string) {
        const headers = new Headers();
        headers.append("Authorization", "Bearer " + accessToken);
        headers.append("Bananan", "Bearer " + accessToken);
        this.result = await fetch("https://graph.windows.net/srds.onmicrosoft.com/me?api-version=1.6", {
            credentials: "include",
            headers,
            method: "GET",
            mode: "no-cors",
        });
    }
}

export default ApiTest;
