import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login";
import SignUp from "./pages/signup/SignUp.jsx";
import NavBar from "./pages/Navbar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/NavBar" element={<NavBar />} />
      </Routes>
    </>
  );
}

export default App;
