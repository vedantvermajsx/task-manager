class PasswordRequest{
    constructor(email,otp=null,password=null,token=null){
        this.email=email;
        this.otp=otp;
        this.password=password;
        this.token=token;
    }
}

export default PasswordRequest;