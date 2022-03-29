import config from "../../config";
import Provider from "../provider";

class ManageProvider extends Provider {
    constructor() {
        super({ baseURL: `${config.app.url}/ReportsWaitings` })
    }

    async exportPDF(data: any) {
        return await this.post('/', data)
    }
}

export default new ManageProvider()