import TaskCollection from "./taskCollection";
import {expect} from "@jest/globals";
import TaskCollectionModel from "./taskColletionModel";

test('taskCollection', () => {
    const taskCollection = new TaskCollection()
    expect(taskCollection.model instanceof TaskCollectionModel)
})

test('taskCollectionModel', () => {
    const taskCollectionModel = new TaskCollectionModel()
    taskCollectionModel.getTasksData().then(() => {
        expect(Array.isArray(taskCollectionModel.tasks)).toBeTruthy()
    })
})