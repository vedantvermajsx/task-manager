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
            if(!response){
                return this.defaultError;
            }

            this.page++;
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    async getAllTasks() {
        try {
            const response = await this.axios.get("/task/getTasks", {
                params: { all: 'true' }
            });
            if(!response){
                return this.defaultError;
            }
            return response.data;

        } catch (error) {
            return error.response.data;
        }
    }

    async createTask(task) {
        try {
            const response = await this.axios.post("/task/addTask", task);
            
            if(!response){
                return this.defaultError;
            }
            return response.data;
        } catch (error) {
           return error.response.data;
        }
    }

    async updateTask(id,task) {
        try {
            const response = await this.axios.put(`/task/updateTask/${id}`, task);
            if(!response){
                return this.defaultError;
            }
            return response.data;
        } catch (error) {
           return error.response.data;
        }
    }

    async deleteTask(id) {
        try {
            const response = await this.axios.delete(`/task/deleteTask/${id}`);
            if(!response){
                return this.defaultError;
            }
            return response.data;
        } catch (error) {
           return error.response.data;
        }
    }

    resetPagination() {
        this.page = 0;
    }
}

export default new TaskApi();