class TaskItemModel {
    constructor(taskData) {
        this.id = taskData.id
        this.title = taskData.title
        this.description = taskData.description
        this.categoryId = taskData.categoryId
        this.priority = taskData.priority
        this.estimation = taskData.estimation
        this.deadlineDate = taskData.deadlineDate
        this.status = taskData.status
        this.createDate = taskData.createDate
    }
}

export default TaskItemModel
