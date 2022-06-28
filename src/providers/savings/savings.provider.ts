import config from "../../config";
import Provider from "../provider";

class SavingsProvider extends Provider {
    constructor() {
        super({ baseURL: `${config.app.url}/savings` });
    }
    async getSavings() {
        return await this.get("/");
    }
    async addSavings(savings: any) {
        await this.post("/", savings);
    }
}

export default new SavingsProvider();