import React from 'react'
import { useNavigate } from 'react-router-dom'
import CreateTask from '../components/CreateTask'
import DisplayTasks from '../components/DisplayTasks'

function TaskDashboard() {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.setItem('userDetails', null)
        navigate("/login")
    }
    return (
        <div className="min-h-screen bg-gray-100">

            {/* Header Section */}
            <header className="flex justify-between items-center py-4 px-8 bg-blue-500 shadow-md">
                <h1 className="text-2xl font-bold text-white">Task Dashboard</h1>
                <button
                    onClick={logout}
                    className="px-4 py-2 text-white bg-red-500 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                    Log Out
                </button>
            </header>

            {/* CreateTask Section */}
            <section className="mx-8 mt-6 p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Create a New Task</h2>
                <div className="w-full h-48 bg-gray-50 rounded-lg p-4">
                    <CreateTask />
                </div>
            </section>

            {/* DisplayTasks Section */}
            <section className="mx-8 mt-6 p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Your Tasks</h2>
                <div className="overflow-y-auto max-h-96">
                    <DisplayTasks />
                </div>
            </section>
        </div>
    )
}

export default TaskDashboard
