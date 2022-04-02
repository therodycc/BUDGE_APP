import config from "../../config"
import { DebtsI } from "../../interfaces/debts/debts.interface"
import Provider from "../provider"

class DebtProvider extends Provider {
    constructor() {
        super({ baseURL: `${config.app.url}/debts` })
    }
    async getAll() {
        return await this.get('/')
    }

    async update(uuid: string, data: any) {
        return await this.patch(`/${uuid}`, data)
    }

    async create(data: DebtsI) {
        return await this.post('/', data)
    }

    async remove(uuid: string) {
        return await this.delete(`/${uuid}`)
    }
}
const debtProvider = new DebtProvider()
export default debtProvider