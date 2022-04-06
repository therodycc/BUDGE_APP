import config from "../../config"
import { ProfitsI } from "../../interfaces/profits/profits.interface"
import Provider from "../provider"

class ProfitsProvider extends Provider {
    constructor() {
        super({ baseURL: `${config.app.url}/profits` })
    }

    async getAll() {
        return await this.get('/')
    }

    async update(id: string, data: ProfitsI) {
        return await this.patch(`/${id}`, data)
    }

    async create(data: ProfitsI) {
        return await this.post('/', data)
    }

    async remove(uuid: string) {
        return await this.delete(`/${uuid}`)
    }
}
const profitsProvider = new ProfitsProvider()
export default profitsProvider