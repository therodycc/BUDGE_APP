import config from "../../config"
import BaseProvider from "../base.provider"

class ProfitsProvider extends BaseProvider {
    constructor() {
        super(`profits`)
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