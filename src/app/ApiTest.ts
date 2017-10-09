import {observable} from "mobx";

class ApiTest {
    @observable public result: string;

    public async makeCall(accessToken?: string) {
        const headers = new Headers();
        headers.append("Authorization", "Bearer " + accessToken);
        headers.append("Ocp-Apim-Subscription-Key", __API_SUBSCRIPTION_KEY__);
        const response = await fetch(
            __API_SOLUTIONS_URL__, {
            headers,
        });
        this.result = JSON.stringify(await response.json());
    }
}

export default ApiTest;
