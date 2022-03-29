import config from "../../config"
import Provider from "../provider"

class VoluntaryProvider extends Provider {
    constructor() {
        super({ baseURL: `${config.app.url}/volunteer-things` })
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
const voluntaryProvider = new VoluntaryProvider()
export default voluntaryProvider