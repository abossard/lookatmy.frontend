import {observable} from "mobx";

class AppState {
    @observable public timer = 0;

    constructor() {
        if (process.env.PLATFORM === "browser") {
            setInterval(() => {
                this.timer += 16;
            }, 16);
        }
    }

    public resetTimer() {
        this.timer += 1;
    }
}

export default AppState;
