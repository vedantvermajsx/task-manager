import MaskEmail from "../utils/MaskEmail.js";

class UserResponse {
    constructor(user) {
        this.id = user._id;
        this.username = user.username;
        this.email = MaskEmail(user.email);
    }
}

export default UserResponse;