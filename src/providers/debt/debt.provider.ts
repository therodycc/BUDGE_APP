import config from "../../config"
import Provider from "../provider"

class DebtProvider extends Provider {
    constructor() {
        super({ baseURL: `${config.app.url}/debt` })
    }
    async getAll() {
        return await this.get('')
    }

    async update(id: string, data: any) {
        return await this.patch(`/${id}`, data)
    }

    async remove(id: string) {
        return await this.delete(`/${id}`)
    }
}
const debtProvider = new DebtProvider()
export default debtProvider