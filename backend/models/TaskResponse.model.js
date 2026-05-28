class TaskResponse{
    constructor(task){
        this._id=task._id;
        this.title=task.title;
        this.description=task.description;
        this.completed=task.completed;
        this.createdAt=task.createdAt;
    }
}

export default TaskResponse;