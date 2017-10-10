import {observable} from "mobx";

class ApiTest {
    @observable public result: string;

    public async makeCall(accessToken?: string) {
        const headers = new Headers();
        headers.append("Authorization", "Bearer " + accessToken);
        headers.append("Ocp-Apim-Subscription-Key", process.env.API_SUBSCRIPTION_KEY as string);
        const response = await fetch(
            process.env.API_SOLUTIONS_URL as string, {
            headers,
        });
        this.result = JSON.stringify(await response.json());
    }
}

export default ApiTest;
