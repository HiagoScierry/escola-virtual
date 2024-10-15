import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class ApiProvider {
    private readonly instance: AxiosInstance;
    
    constructor() {
        this.instance = axios.create({
            baseURL: "http://localhost:8000",
            timeout: 1000,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }


    public async get(url: string, config?: AxiosRequestConfig) {
        return this.instance.get(url, config);
    }

    public async post(url: string, data: any, config?: AxiosRequestConfig) {
        return this.instance.post(url, data, config);
    }

    public async put(url: string, data: any, config?: AxiosRequestConfig) {
        return this.instance.put(url, data, config);
    }

    public async delete(url: string, config?: AxiosRequestConfig) {
        return this.instance.delete(url, config);
    }

}