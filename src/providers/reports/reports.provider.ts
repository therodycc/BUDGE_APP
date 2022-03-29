import config from "../../config";
import Provider from "../provider";

class ReportsProvider extends Provider {
    constructor() {
        super({ baseURL: `${config.app.url}/reports` })
    }

    async exportPDF(data: any) {
        return await this.post('/', data)
    }
}

export default new ReportsProvider()