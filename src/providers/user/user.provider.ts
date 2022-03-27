import config from "../../config"
import BaseProvider from "../base.provider"

class UserProvider extends BaseProvider {
    constructor() {
        super(`user`)
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
const userProvider = new UserProvider()
export default userProvider