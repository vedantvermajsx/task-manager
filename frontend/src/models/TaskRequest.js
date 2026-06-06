import { formatDate } from '../utils/dateUtils.js';

class Task {

    constructor(title, description, completed = false, dueDate = undefined) {
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.dueDate = dueDate ? formatDate(dueDate) : undefined;
    }
}

export default Task;

