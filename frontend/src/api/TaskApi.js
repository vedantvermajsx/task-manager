import Api from "./Api";
class TaskApi extends Api {
    constructor(page = 0, size = 10) {
        super();
        this.page = page;
        this.size = size;
    }

    async getTasks(date,page = this.page, size = this.size) {
        try {
            const response = await this.axios.get("/task/getTasks", {
                params: { page, size,date }
            });

            this.page++;
            return response.data;
        } catch (error) {
            console.error("Error fetching tasks:", error);
            throw error;
        }
    }

    async getAllTasks() {
        try {
            const response = await this.axios.get("/task/getTasks");
            return response.data;
        } catch (error) {
            console.error("Error fetching all tasks:", error);
            throw error;
        }
    }

    async createTask(task) {
        try {
            const response = await this.axios.post("/task/addTask", task);
            return response.data;
        } catch (error) {
            console.error("Error creating task:", error);
            throw error;
        }
    }

    async updateTask(id,task) {
        try {
            const response = await this.axios.put(`/task/updateTask/${id}`, task);
            return response.data;
        } catch (error) {
            console.error(`Error updating task ${task.id}:`, error);
            throw error;
        }
    }

    async deleteTask(id) {
        try {
            const response = await this.axios.delete(`/task/deleteTask/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting task ${id}:`, error);
            throw error;
        }
    }

    resetPagination() {
        this.page = 0;
    }
}

export default new TaskApi();