import axios from "axios";
class Api {
    constructor() {
        this.baseUrl = import.meta.env.VITE_SERVER_API;
        this.axios = axios.create({
            baseURL: this.baseUrl,
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials:true,
        });
    }
}

export default Api;