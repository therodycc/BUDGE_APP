import config from "../../config"
import Provider from "../provider"

class FinancialExpenseProvider extends Provider {
    constructor() {
        super({
            baseURL: `${config.app.url}/financial-expenses`,
        })
    }

    async getAll() {
        return await this.get(`/`)
    }
}
const financialExpenseProvider = new FinancialExpenseProvider()
export default financialExpenseProvider