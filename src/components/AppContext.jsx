import React, { useState } from 'react'
import { createContext } from 'react';

export const AppContext = createContext();


function AppProvider({ children }) {

  const [taskList, setTaskList] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  // Delete task by id
  const deleteTask = (task) => {
    setTaskList((prev) => prev.filter((storedTask) => storedTask.id !== task.id))
  }

  return (
    <AppContext.Provider value={{ taskList, setTaskList, openPopup, closePopup, isPopupOpen, deleteTask }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
