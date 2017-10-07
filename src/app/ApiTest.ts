import {observable} from "mobx";

class ApiTest {
    @observable public result?: Response;

    public async makeCall() {
        this.result = await fetch("http://swissredev.azure-api.net/dcs/api/v1/solutions", {
            credentials: "include",
            headers: {"Ocp-Apim-Subscription-Key": "e60ecbd9bb554ed99d540bc97bbcc4d6"},
            method: "GET",
        });
    }
}

export default ApiTest;
