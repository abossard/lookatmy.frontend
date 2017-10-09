import {observable} from "mobx";

class ApiTest {
    @observable public result: string;

    public async makeCall(accessToken?: string) {
        const headers = new Headers();
        headers.append("Authorization", "Bearer " + accessToken);
        headers.append("Ocp-Apim-Subscription-Key", "e60ecbd9bb554ed99d540bc97bbcc4d6");
        const response = await fetch(
            "https://graph.windows.net/me?api-version=1.6", {
            headers,
        });
        this.result = JSON.stringify(await response.json());
    }
}

export default ApiTest;
