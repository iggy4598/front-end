import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Registration from "./components/registration";
import SingleItem from "./components/singleItem";
import SingleUser from "./components/singleUser";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/items/:id" element={<ProtectedRoute><SingleItem /></ProtectedRoute>} />
      <Route path="/user/:id" element={<ProtectedRoute><SingleUser /></ProtectedRoute>} /> 
      </Routes>
    </Router>
  );
};

export default App;
