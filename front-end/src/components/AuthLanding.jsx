import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const AuthLanding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [authError, setAuthError] = useState("");
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);

  useEffect(() => {
    axios
      .get("/api/items")
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching items:", error))
      .finally(() => setLoadingItems(false));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    const result = await dispatch(loginUser(loginData));
    if (result.error) {
      setAuthError("Login failed.");
    } else {
      navigate("/my-reviews");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthError("");
    const result = await dispatch(registerUser(registerData));
    if (result.error) {
      setAuthError("Registration failed.");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="container">
      <h1>My review Site</h1>
      <div>
        <button onClick={() => setActiveTab("login")}>Login</button>
        <button onClick={() => setActiveTab("register")}>Register</button>
      </div>
      {authError && <p style={{ color: "red" }}>{authError}</p>}
      {activeTab === "login" ? (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            required
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="First Name"
            value={registerData.firstName}
            onChange={(e) =>
              setRegisterData({ ...registerData, firstName: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={registerData.lastName}
            onChange={(e) =>
              setRegisterData({ ...registerData, lastName: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({ ...registerData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
            required
          />
          <button type="submit">Register</button>
        </form>
      )}
      <h2>Dummy Items</h2>
      {loadingItems ? (
        <p>Loading items...</p>
      ) : (
        items.map((item) => (
          <div key={item.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Average Rating: {item.averageRating}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AuthLanding;