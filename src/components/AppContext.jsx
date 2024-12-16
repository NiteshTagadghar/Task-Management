import React, { useState } from 'react'
import { createContext } from 'react';

export const AppContext = createContext();


function AppProvider({ children }) {

  const [taskList, setTaskList] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || [])

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const getUsers = () => {
    setUsers(JSON.parse(localStorage.getItem('users')) || [])
  }

  // Delete task by id
  const deleteTask = (task) => {
    setTaskList((prev) => prev.filter((storedTask) => storedTask.id !== task.id))
  }

  return (
    <AppContext.Provider value={{ taskList, setTaskList, openPopup, closePopup, isPopupOpen, deleteTask, users, getUsers }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
