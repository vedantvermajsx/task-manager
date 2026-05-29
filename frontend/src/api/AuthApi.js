import Api from "./Api";

class AuthApi extends Api {
    constructor() {
        super();
    }
   
    async me(){
        const response = await this.axios.get("/auth/me");
        return response.data;
    }

    async register(registerRequest) {

        const response = await this.axios.post("/auth/register", registerRequest);
        return response.data;
    }

    async login(loginRequest) {
        const response = await this.axios.post("/auth/login", loginRequest);
        return response.data;
    }

    async logout(){
        const response = await this.axios.post("/auth/logout");
        return response.data;
    }

    }

export default new AuthApi();