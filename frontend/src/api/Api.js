import axios from "axios";
import MyToaster from "../components/MyToaster";
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

        
        this.axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if(error.response.status === 401){    
                    MyToaster.error("Session expired. Please login again.");
                }
                return Promise.reject(error);
            }
        )
         this.defaultError={
            status:500,
            success:false,
            message:"unable to reach the server"
        }
    }
}

export default Api;