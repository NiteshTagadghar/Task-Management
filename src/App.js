import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TaskDashboard from "./pages/TaskDashboard";

function App() {
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    // Redirect to home page if already logged in
    if (userDetails && window.location.pathname == "/login") {
      window.location.replace("/");
    }
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<TaskDashboard />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
