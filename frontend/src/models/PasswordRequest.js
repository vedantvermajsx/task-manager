class PasswordRequest{
    constructor(email,password=null,token=null){
        this.email=email;
        this.password=password;
        this.token=token;
    }
}

export default PasswordRequest;