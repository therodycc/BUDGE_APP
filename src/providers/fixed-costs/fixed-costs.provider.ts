import config from "../../config"
import BaseProvider from "../base.provider"

class FixedCostsProvider extends BaseProvider {
    constructor() {
        super(`fixedCosts`)
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
const fixedCostsProvider = new FixedCostsProvider()
export default fixedCostsProvider