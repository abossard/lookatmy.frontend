import {observable} from "mobx";

class ApiTest {
    @observable public result: string;

    public async makeCall(accessToken?: string) {
        const headers = new Headers();
        headers.append("Authorization", "Bearer " + accessToken);
        const response = await fetch("https://graph.windows.net/srds.onmicrosoft.com/me?api-version=1.6", {
            headers,
        });
        this.result = JSON.stringify(await response.json());
    }
}

export default ApiTest;
