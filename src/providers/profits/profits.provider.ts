import config from "../../config"
import Provider from "../provider"

class ProfitsProvider extends Provider {
    constructor() {
        super({ baseURL: `${config.app.url}/profits` })
    }
    async getAll() {
        return await this.get('/')
    }

    async update(id: string, data: any) {
        return await this.patch(`/${id}`, data)
    }

    async remove(id: string) {
        return await this.delete(`/${id}`)
    }
}
const profitsProvider = new ProfitsProvider()
export default profitsProvider