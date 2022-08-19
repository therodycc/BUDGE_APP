import config from "../../config";
import Provider from "../provider";

class ReportsProvider extends Provider {
    constructor() {
        super({ baseURL: `${config.app.url}/reports` })
    }

    getReports() {
        return this.get('/')
    }

    getReportItems(uuid: string) {
        return this.get(`/items/${uuid}`)
    }

    async exportPDF(data: any) {
        return await this.post('/', data)
    }
}

export default new ReportsProvider()