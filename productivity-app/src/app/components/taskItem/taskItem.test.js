import TaskItem from "./taskItem";
import TaskItemModel from "./taskItemModel";
import {expect} from "@jest/globals";
import TaskItemView from "./taskItemView";

test('taskItem', () => {
    const data = {
        categoryId: "work",
        completeDate: "Wed Oct 06 2021",
        completedCount: 2,
        createDate: "Wed Oct 06 2021",
        deadlineDate: "Fri Oct 08 2021",
        deadlineDay: 8,
        deadlineMonth: "October",
        description: "asdasdasd",
        estimation: 7,
        failedPomodoros: 0,
        isRemoved: false,
        priority: 4,
        status: {ACTIVE: false, COMPLETED: true, DAILY_LIST: true, GLOBAL_LIST: false},
        title: "asdasdasdq"
    }
    const taskItem = new TaskItem(data);
    expect(taskItem.model instanceof TaskItemModel).toBeTruthy()
    expect(taskItem.view instanceof TaskItemView).toBeTruthy()
})
