import React, { useEffect, useState } from 'react'
import { createContext } from 'react';

export const AppContext = createContext();


function AppProvider({ children }) {

  const [taskList, setTaskList] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || [])
  const [userDetails, setUserDetails] = useState({})

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  // Get users from local storage 
  const getUsers = () => {
    setUsers(JSON.parse(localStorage.getItem('users')) || [])
  }

  // Delete task by id
  const deleteTask = (task) => {
    setTaskList((prev) => prev.filter((storedTask) => storedTask.id !== task.id))
  }

  const addTask = (task) => {
    const allTasks = userDetails.tasks || []
    allTasks.push(task)
    const tempUserDetails = { ...userDetails }
    tempUserDetails.tasks = allTasks
    setUserDetails(tempUserDetails)
    console.log(tempUserDetails, 'temp user details')

    // Update tasks in users array
    const allUsers = users.map((user) => {
      if (user.id == userDetails.id) {
        user.tasks = allTasks
      }
      return user
    })

    localStorage.setItem('users', JSON.stringify(allUsers))
    localStorage.setItem('userDetails', JSON.stringify(tempUserDetails))
  }

  useEffect(() => {
    setUserDetails(JSON.parse(localStorage.getItem("userDetails")))
  }, [])

  return (
    <AppContext.Provider value={{ taskList, setTaskList, openPopup, closePopup, isPopupOpen, deleteTask, users, getUsers, userDetails, setUserDetails, addTask }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
