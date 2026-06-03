import axios from "axios";
import { toast } from "sonner";

let hasHealthChecked = false;

class Api {
    constructor() {
        this.baseUrl = import.meta.env.VITE_SERVER_API;
        this.axios = axios.create({
            baseURL: this.baseUrl,
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        this.defaultError = {
            success: false,
            message: "Some error occurred while processing your request"
        };

        this.axios.interceptors.request.use(
            async (config) => {
                if (config.url !== "/health" && !hasHealthChecked) {
                    try {
                        await this.axios.get("/health");
                        hasHealthChecked = true;
                    } catch (error) {
                        return Promise.reject({
                            response: {
                                data: { success: false, message: "Server is not reachable" }
                            }
                        });
                    }
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
    }

    async handleRequest(promise, successMessage = null, showSuccess = true, showError = true) {
        try {
            const response = await promise;
            if (showSuccess && successMessage) {
                toast.success(successMessage);
            } else if (showSuccess && response.data?.message) {
                toast.success(response.data.message);
            }
            return response;
        } catch (error) {
            if (showError) {
                const errorMessage = error?.response?.data?.message || this.defaultError.message;
                toast.error(errorMessage);
            }
            throw error;
        }
    }
}

export default Api;
