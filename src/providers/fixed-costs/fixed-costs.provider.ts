import config from "../../config"
import { FixedCostsI } from "../../interfaces/fixed-costs/fixed-costs.interface"
import Provider from "../provider"

class FixedCostsProvider extends Provider {
    constructor() {
        super({ baseURL: `${config.app.url}/fixed-costs` })
    }
    async getAll() {
        return await this.get('/')
    }

    async update(id: string, data: FixedCostsI | any) {
        return await this.patch(`/${id}`, data)
    }

    async create(data: FixedCostsI) {
        return await this.post('/', data)
    }

    async remove(id: string) {
        return await this.delete(`/${id}`)
    }
}
const fixedCostsProvider = new FixedCostsProvider()
export default fixedCostsProvider