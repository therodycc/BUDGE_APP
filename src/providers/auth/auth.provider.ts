import config from "../../config"
import Provider from "../provider"

class AuthProvider extends Provider {
    constructor() {
        super({ baseURL: `${config.app.url}/auth` })
    }

    async signIn(data: { email: string, password: string }) {
        return await this.post(`/sign-in`, data)
    }
}
const authProvider = new AuthProvider()
export default authProvider