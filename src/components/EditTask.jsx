import React, { useContext, useState } from 'react';
import { TASK_STATUS } from '../constants';
import { AppContext } from './AppContext';

function EditTask({ task }) {
    console.log(task, 'task in edit')
    const { setTaskList, closePopup } = useContext(AppContext)
    const [formValue, setFormValue] = useState(task);


    // Update the value on change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };



    const onSubmit = (e) => {
        e.preventDefault();

        // Update the task list array
        setTaskList((prev) =>
            prev.map((storedTask) => {

                if (storedTask.id === task.id) {
                    return {
                        ...storedTask,
                        name: formValue.name,
                        status: formValue.status,
                    };
                }

                return storedTask
            })
        );

        closePopup()
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium">
                            Task Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formValue.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="taskStatus" className="block text-sm font-medium">
                            Task Status
                        </label>
                        <select
                            name="status"
                            value={formValue.status}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value={TASK_STATUS.COMPLETED}>Completed</option>
                            <option value={TASK_STATUS.NOT_COMPLETED}>Not Completed</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={closePopup}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTask;
