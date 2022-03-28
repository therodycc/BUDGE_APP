import config from "../config";
import Provider from "./provider";

class BaseProvider extends Provider {
    constructor(prefix: string) {
        super({
            baseURL: `${config.app.url}/${prefix}`,
            withCredentials: true,            
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Access-Control-Allow-Credentials': "true"
            },
        });
    }
}

export default BaseProvider