import React, { useContext, useState } from 'react'
import { AppContext } from './AppContext'
import { TASK_STATUS } from '../constants'
import EditTask from './EditTask'

function DisplayTasks() {
    const { taskList, openPopup, isPopupOpen, deleteTask } = useContext(AppContext)
    const [taskToEdit, setTaskToEdit] = useState()

    const onEditClic = (task) => {
        setTaskToEdit(task)
        openPopup()
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-6">
            {taskList?.map((task) => {
                return (
                    <div
                        key={task.id}
                        className="relative flex flex-col hover:bg-slate-50 hover:cursor-pointer hover:shadow-2xl bg-white shadow-sm border border-slate-200 rounded-lg"
                    >
                        <div className="p-4">
                            <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                                Name : {task.name}
                            </h5>
                            <p className="text-slate-600 leading-normal font-light">
                                Status : {task.status === TASK_STATUS.NOT_COMPLETED ? "Not Completed" : "Completed"}
                            </p>

                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => onEditClic(task)}
                                    className="rounded-md bg-slate-800 py-2 px-4 text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700"
                                    type="button"
                                >
                                    Edit
                                </button>

                                {/* Pop-up to edit the particular task */}
                                {isPopupOpen && <EditTask task={taskToEdit} />}

                                <button
                                    onClick={() => deleteTask(task)}
                                    className="rounded-md bg-slate-800 py-2 px-4 text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700"
                                    type="button"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>

    )
}

export default DisplayTasks
