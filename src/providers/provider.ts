import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class Provider {
    private readonly axios: AxiosInstance;

    constructor(configInstance: AxiosRequestConfig<any>) {
        this.axios = axios.create({
            withCredentials: false,
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Access-Control-Allow-Credentials': "true",
            },
            ...configInstance
        });
    }

    protected async get(endpoint: string, config: AxiosRequestConfig = {}): Promise<any> {
        try {
            const res = await this.axios.get(endpoint, config);
            return res.data;
        } catch (error) {
            return { error };
        }
    }

    protected async post(endpoint: string, data: object = {}, config: AxiosRequestConfig = {}): Promise<any> {
        try {
            const res = await this.axios.post(endpoint, data, config);
            return res.data;
        } catch (error) {
            return { error };
        }
    }

    protected async update(endpoint: string, data: object = {}, config: AxiosRequestConfig = {}): Promise<any> {
        try {
            const res = await this.axios.patch(endpoint, data, config);
            return res.data;
        } catch (error) {
            return { error };
        }
    }

    protected async delete(endpoint: string, config: AxiosRequestConfig = {}): Promise<any> {
        try {
            const res = await this.axios.delete(endpoint, config);
            return res.data;
        } catch (error) {
            return { error };
        }
    }
    protected async patch(endpoint: string, data: object = {}, config: AxiosRequestConfig = {}): Promise<any> {
        try {
            const res = await this.axios.patch(endpoint, data, config);
            return res.data;
        } catch (error) {
            return { error };
        }
    }
}

export default Provider;