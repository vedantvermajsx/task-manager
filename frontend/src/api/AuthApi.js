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
        try{
        const response = await this.axios.post("/auth/login", loginRequest);
            return response.data;
    }
        catch(err){
            return err.response.data;
        }    
    }

    async logout(){
        const response = await this.axios.post("/auth/logout");
        return response.data;
    }

    async updateUser(id, updateData) {
        const response = await this.axios.put(`/user/update/${id}`, updateData);
        return response.data;
    }

    async updateProfilePic(id, file) {
        const formData = new FormData();
        formData.append("profilePic", file);

        const response=await this.axios.put(`/user/update-profile/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return response.data;
    }

    async sendOtp(passwordRequest){
        const response = await this.axios.post("/reset/send-otp", passwordRequest);
        return response.data;
    }

    async verifyOtp(passwordRequest){
        const response = await this.axios.post("/reset/verify-otp", passwordRequest);
        return response.data;
    }

    async updatePassword(passwordRequest){
        const response = await this.axios.post("/reset/update-password", passwordRequest);
        return response.data;
    }

}

export default new AuthApi();