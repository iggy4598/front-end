import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import SingleUser from "./components/SingleUser";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/user/:id" element={<ProtectedRoute><SingleUser /></ProtectedRoute>} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
