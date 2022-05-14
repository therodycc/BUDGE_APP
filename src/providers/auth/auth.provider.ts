import config from "../../config"
import Provider from "../provider"

class AuthProvider extends Provider {
    constructor() {
        super({
            baseURL: `${config.app.url}/auth`,
        })
    }

    async signIn(data: { email: string, password: string }) {
        return await this.post(`/sign-in`, data)
    }

    async logout() {
        return await this.post(`/logout`)
    }

    async changePassword(data: { password: string, newPassword: string }) {
        return await this.post(`/change-password`, data)
    }
}
const authProvider = new AuthProvider()
export default authProvider