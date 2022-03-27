import config from "../../config"
import BaseProvider from "../base.provider"

class UtilitiesProvider extends BaseProvider {
    constructor() {
        super(`utilities`)
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

    async remove(id: string) {
        return await this.delete(`/${id}`)
    }
}
const utilitiesProvider = new UtilitiesProvider()
export default utilitiesProvider