import MaskEmail from "../utils/MaskEmail.js";

class UserResponse {
    constructor(user) {
        this.id = user._id;
        this.username = user.username;
        this.email = MaskEmail(user.email);
        this.avatar = user.avatar;
        this.description = user.description;
        this.totalTasks = user.totalTasks;
        this.completedTasks = user.completedTasks;
    }
}

export default UserResponse;