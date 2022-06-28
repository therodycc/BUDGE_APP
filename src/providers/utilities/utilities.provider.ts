import config from "../../config"
import { ManageI } from "../../interfaces/manage/manage.interface"
import { TypeTable } from "../../interfaces/utility/utilily.type"
import Provider from "../provider"

class ManageProvider extends Provider {
    constructor() {
        super({ baseURL: `${config.app.url}/manage` })
    }
    async getAll() {
        return await this.get('/')
    }

    async postItem(data: any) {
        return await this.post('/', data)
    }

    async updateAction(id: string, type: TypeTable, data: any) {
        return await this.patch(`/${id}?type=${type}`, data,)
    }

    async create(data: ManageI) {
        return await this.post('/', data)
    }

    async remove(uuid: string) {
        return await this.delete(`/${uuid}`)
    }

    async deleteAllManage(uuidsManage: string[]) {
        return await this.delete('/', { data: { uuidsManage } })
    }
}
const manageProvider = new ManageProvider()
export default manageProvider