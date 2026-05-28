class Task {

    constructor(id,title, description, completed = false) {
        this._id=id;
        this.title = title;
        this.description = description;
        this.completed = completed;
    }
}

export default Task;

