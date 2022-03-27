import BaseProvider from "../base.provider";

class ManageProvider extends BaseProvider {
    constructor() {
        super('ReportsWaitings')
    }

    async exportPDF(data: any) {
        return await this.post('/', data)
    }
}

export default new ManageProvider()