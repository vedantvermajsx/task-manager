class Task {

    constructor(title, description, completed = false, dueDate = undefined) {
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.dueDate = dueDate;
    }
}

export default Task;

