import config from "../../config"
import Provider from "../provider"

class UserProvider extends Provider {
    constructor() {
        super({ baseURL: `${config.app.url}/users` })
    }

    async getMe() {
        return await this.get('/me')
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