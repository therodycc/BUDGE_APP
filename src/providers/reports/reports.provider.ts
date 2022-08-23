import config from "../../config";
import { ReportsBodyToSendI } from "../../interfaces/reports/reports-items.interface";
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

    deleteReport(uuid: string) {
        return this.delete(`/${uuid}`)
    }

    createReports(body: ReportsBodyToSendI) {
        return this.post('/', body)
    }

    async exportPDF(data: any) {
        return await this.post('/', data)
    }
}

export default new ReportsProvider()