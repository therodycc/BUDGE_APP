import config from "../../config"
import BaseProvider from "../base.provider"

class VoluntaryProvider extends BaseProvider {
    constructor() {
        super(`voluntary`)
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