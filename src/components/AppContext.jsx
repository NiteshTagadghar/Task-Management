import React, { useEffect, useState } from 'react'
import { createContext } from 'react';

export const AppContext = createContext();


function AppProvider({ children }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || [])
  const [userDetails, setUserDetails] = useState({})

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  // Get users from local storage 
  const getUsers = () => {
    setUsers(JSON.parse(localStorage.getItem('users')) || [])
  }

  // Edit task
  const editTask = (task) => {

    const allTasks = userDetails?.tasks?.map((storedTask) => {
      if (task.id == storedTask.id) {
        storedTask.name = task.name
        storedTask.status = task.status
      }
      return storedTask
    })
    updateLocalStorage(allTasks)
  }

  // Delete task by id
  const deleteTask = (task) => {
    const allTasks = userDetails.tasks.filter((storedTask) => storedTask.id !== task.id)
    updateLocalStorage(allTasks)
  }

  // Add task in local storage (users & userDetails) and update the state as well
  const addTask = (task) => {
    const allTasks = userDetails.tasks || []
    allTasks.push(task)

    updateLocalStorage(allTasks)
  }

  // Update local storage for users and userDetails
  const updateLocalStorage = (allTasks) => {

    // Update in userDetails
    const tempUserDetails = { ...userDetails }
    tempUserDetails.tasks = allTasks

    // Update in users array
    const allUsers = users.map((user) => {
      if (user.id == userDetails.id) {
        user.tasks = allTasks
      }
      return user
    })

    setUserDetails(tempUserDetails)
    localStorage.setItem('users', JSON.stringify(allUsers))
    localStorage.setItem('userDetails', JSON.stringify(tempUserDetails))
  }



  useEffect(() => {
    setUserDetails(JSON.parse(localStorage.getItem("userDetails")))
  }, [])

  console.log(userDetails, 'user details in context')
  return (
    <AppContext.Provider value={{ openPopup, closePopup, isPopupOpen, deleteTask, users, getUsers, userDetails, setUserDetails, addTask, editTask }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
