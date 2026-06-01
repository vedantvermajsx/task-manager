import Api from "./Api";

class AuthApi extends Api {
    constructor() {
        super();
    }
   
    async me(){
        try{
            const response = await this.axios.get("/auth/me");
            if(!response){
                return this.defaultError;
            }
            return response.data;
        }
        catch(err){
            return err.response.data;
        }
    }

    async register(registerRequest) {
        try{
            const response = await this.axios.post("/auth/register", registerRequest);
            if(!response){
                return this.defaultError;
            }
            
            return response.data;
        }
        catch(err){
            return err.response.data;
        }
    }

    async login(loginRequest) {
        try{
            const response = await this.axios.post("/auth/login", loginRequest);
            console.log(response);
            if(!response){
                return this.defaultError;
            }
            return response.data;
        }
        catch(err){
            return err.response.data;
        }    
    }

    async logout(){
        try{
            const response = await this.axios.post("/auth/logout");
            if(!response){
                return this.defaultError;
            }
            return response.data;
        }
        catch(err){
            return err.response.data;
        }
    }

    async updateUser(id, updateData) {
        try{
            const response = await this.axios.put(`/user/update/${id}`, updateData);
            if(!response){
                return this.defaultError;
            }
            
            return response.data;
        }
        catch(err){
            return err.response.data;
        }
    }

    async updateProfilePic(id, file) {
        try{
            const formData = new FormData();
            formData.append("profilePic", file);

            const response=await this.axios.put(`/user/update-profile/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
                
            });
            if(!response){
                return this.defaultError;
            }
            return response.data;
        }
        catch(err){
            return err.response.data;
        }
    }

    async sendOtp(passwordRequest){
        try{
            const response = await this.axios.post("/reset/send-otp", passwordRequest);
            if(!response){
                return this.defaultError;
            }
            return response.data;
        }
        catch(err){
            return err.response.data;
        }
    }

    async verifyOtp(passwordRequest){
        try{
            const response = await this.axios.post("/reset/verify-otp", passwordRequest);
            if(!response){
                return this.defaultError;
            }
            
            return response.data;
        }
        catch(err){
            return err.response.data;
        }
    }

    async updatePassword(passwordRequest){
        try{
            const response = await this.axios.post("/reset/update-password", passwordRequest);
            if(!response){
                return this.defaultError;
            }
            return response.data;
        }
        catch(err){
            return err.response.data;
        }   
    }

}

export default new AuthApi();