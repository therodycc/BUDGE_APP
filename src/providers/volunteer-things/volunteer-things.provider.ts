import config from "../../config"
import { VolunteerThingsI } from "../../interfaces/volunteer-things/volunteer-things.interface"
import Provider from "../provider"

class VolunteerThingsProvider extends Provider {
    constructor() {
        super({ baseURL: `${config.app.url}/volunteer-things` })
    }

    async getAll() {
        return await this.get('/')
    }

    async update(id: string, data: VolunteerThingsI) {
        return await this.patch(`/${id}`, data)
    }

    async create(data: VolunteerThingsI) {
        return await this.post('/', data)
    }

    async remove(id: string) {
        return await this.delete(`/${id}`)
    }
}
const volunteerThingsProvider = new VolunteerThingsProvider()
export default volunteerThingsProvider