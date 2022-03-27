import config from "../../config"
import BaseProvider from "../base.provider"

class WishesProvider extends BaseProvider {
    constructor() {
        super(`wishes`)
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
const voluntaryProvider = new WishesProvider()
export default voluntaryProvider