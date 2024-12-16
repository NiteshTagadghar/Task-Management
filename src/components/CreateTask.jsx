import React, { useContext } from 'react'
import { AppContext } from './AppContext'
import { TASK_STATUS } from '../constants'

function CreateTask() {

    const { setTaskList } = useContext(AppContext)


    const handleSubmit = (e) => {
        e.preventDefault()

        if (!e.target.taskName.value) {
            return alert("Enter valid task name")
        }

        // Create a task with id and initial status as not_completed
        const task = {
            id: Math.random(),
            name: e.target.taskName.value,
            status: TASK_STATUS.NOT_COMPLETED
        }

        // Add new record in task list
        setTaskList((prev) => ([...prev, task]))

        // Reset the input box
        e.target.reset()

    }

    return (
        <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input
                    type="text"
                    name="taskName"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task name"
                    required
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Add Task
                </button>
            </form>
        </div>
    )
}

export default CreateTask
