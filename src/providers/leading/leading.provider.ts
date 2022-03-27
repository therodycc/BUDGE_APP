import config from "../../config"
import BaseProvider from "../base.provider"

class LeadingProvider extends BaseProvider {
    constructor() {
        super(`leading`)
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
const leadingProvider = new LeadingProvider()
export default leadingProvider