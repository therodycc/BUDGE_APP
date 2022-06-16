import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class Provider {
    private readonly axios: AxiosInstance;

    constructor(configInstance: AxiosRequestConfig<any>) {
        this.axios = axios.create({
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Access-Control-Allow-Credentials': "true",
            },
            ...configInstance
        });
    }

    protected get(endpoint: string, config: AxiosRequestConfig = {}): Promise<any> {
        return this.axios.get(endpoint, config)
            .then(res => res.data)
            .catch(err => Promise.resolve(err?.response?.data));
    }

    protected post(endpoint: string, data: object = {}, config: AxiosRequestConfig = {}): Promise<any> {
        return this.axios.post(endpoint, data, config)
            .then(res => res.data)
            .catch(err => Promise.resolve(err?.response?.data));
    }

    protected update(endpoint: string, data: object = {}, config: AxiosRequestConfig = {}): Promise<any> {
        return this.axios.patch(endpoint, data, config)
            .then(res => res.data)
            .catch(err => Promise.resolve(err?.response?.data));
    }

    protected delete(endpoint: string, config: AxiosRequestConfig = {}): Promise<any> {
        return this.axios.delete(endpoint, config)
            .then(res => res.data)
            .catch(err => Promise.resolve(err?.response?.data));
    }
    protected patch(endpoint: string, data: object = {}, config: AxiosRequestConfig = {}): Promise<any> {
        return this.axios.patch(endpoint, data, config)
            .then(res => res.data)
            .catch(err => Promise.resolve(err?.response?.data));
    }
}

export default Provider;