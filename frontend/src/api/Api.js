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
         this.defaultError={
            success:false,
            message:"Some error occurred while processing your request"
        }
    }
}

export default Api;