import config from "../../config"
import { WishesI } from "../../interfaces/wishes/wishes.interface"
import Provider from "../provider"

class WishesProvider extends Provider {
    constructor() {
        super({ baseURL: `${config.app.url}/wishes` })
    }
    async getAll() {
        return await this.get('/')
    }

    async update(id: string, data: any) {
        return await this.patch(`/${id}`, data)
    }

    async create(data: WishesI) {
        return await this.post('/', data)
    }

    async remove(uuid: string) {
        return await this.delete(`/${uuid}`)
    }
}
const voluntaryProvider = new WishesProvider()
export default voluntaryProvider