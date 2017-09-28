import {observable} from "mobx";

class AppState {
    @observable public timer = 0;

    constructor() {
        setInterval(() => {
            this.timer += 16;
        }, 16);
    }

    public resetTimer() {
        this.timer = 0;
    }
}

export default AppState;
