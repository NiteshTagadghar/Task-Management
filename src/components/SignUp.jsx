import React, { useState } from 'react'
import { USER } from '../constants';
import { useNavigate } from 'react-router-dom';

function SignUp() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Where name is inputbox name and value is the value of perticular input box
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.username) {
            setErrors((prev) => ({
                ...prev,
                username: "User name must be provided"
            }))
        }

        if (!formData.password) {
            setErrors((prev) => ({
                ...prev,
                password: "Password must be provided"
            }))
        }

        if (formData.password !== formData.confirmPassword) {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: "Password doesnt match"
            }))
        }

        const newUser = { id: Math.random().toString(), username: formData.username, password: formData.password }

        const users = JSON.parse(localStorage.getItem('users'))


        if (!users) {
            const users = [newUser]
            localStorage.setItem('users', JSON.stringify(users))
        } else {
            users.push(newUser)
            localStorage.setItem('users', JSON.stringify(users))
        }

        navigate("/login")
    }

    return (
        <div>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-sm p-6 bg-white rounded-md shadow-lg">
                    <h2 className="text-xl font-semibold text-center text-gray-800">Login</h2>

                    <form onSubmit={handleSubmit} className="mt-6">
                        <div className="mb-4">
                            <label htmlFor="username" className="text-sm text-gray-600">Username</label>
                            <input
                                type="text"
                                name="username"
                                autoComplete="off"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md"
                                placeholder={USER.USER_NAME}
                            />
                        </div>
                        {errors.username && (
                            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                        )}
                        <div className="mb-4">
                            <label htmlFor="password" className="text-sm text-gray-600">Password</label>
                            <input
                                type="password"
                                name="password"
                                autoComplete="off"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md"
                                placeholder={USER.PASSWORD}
                            />
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                        )}
                        <div className="mb-4">
                            <label htmlFor="password" className="text-sm text-gray-600">Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                autoComplete="off"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md"
                                placeholder={USER.PASSWORD}
                            />
                        </div>
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                        )}
                        <button
                            type="submit"
                            className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
