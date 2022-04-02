import config from "../../config"
import { NecessaryI } from "../../interfaces/necessary/necessary.interface"
import Provider from "../provider"

class NecessaryProvider extends Provider {
    constructor() {
        super({ baseURL: `${config.app.url}/necessary` })
    }
    async getAll() {
        return await this.get('/')
    }

    async update(uuid: string, data: any) {
        return await this.patch(`/${uuid}`, data)
    }

    async create(data: NecessaryI) {
        return await this.post('/', data)
    }

    async remove(uuid: string) {
        return await this.delete(`/${uuid}`)
    }
}
const necessaryProvider = new NecessaryProvider()
export default necessaryProvider