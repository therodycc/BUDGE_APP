import config from "../../config"
import { ManageI } from "../../interfaces/manage/manage.interface"
import Provider from "../provider"

class UtilitiesProvider extends Provider {
    constructor() {
        super({ baseURL: `${config.app.url}/manage` })
    }
    async getAll() {
        return await this.get('/')
    }

    async postItem(data: any) {
        return await this.post('/', data)
    }

    async update(id: string, data: any) {
        return await this.patch(`/${id}`, data)
    }

    async create(data: ManageI) {
        return await this.post('/', data)
    }

    async remove(uuid: string) {
        return await this.delete(`/${uuid}`)
    }
}
const utilitiesProvider = new UtilitiesProvider()
export default utilitiesProvider