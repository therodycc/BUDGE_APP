import config from "../../config"
import Provider from "../provider"

class AccountProvider extends Provider {
    constructor() {
        super({
            baseURL: `${config.app.url}/accounts`,
        })
    }

    async getAccounts() {
        return await this.get(`/`)
    }
}
const accountProvider = new AccountProvider()
export default accountProvider