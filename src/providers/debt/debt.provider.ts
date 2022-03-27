import config from "../../config"
import BaseProvider from "../base.provider"

class DebtProvider extends BaseProvider {
    constructor() {
        super(`debt`)
    }
    async getAll() {
        return await this.get('')
    }

    async update(id: string, data: any) {
        return await this.patch(`/${id}`, data)
    }

    async remove(id: string) {
        return await this.delete(`/${id}`)
    }
}
const debtProvider = new DebtProvider()
export default debtProvider