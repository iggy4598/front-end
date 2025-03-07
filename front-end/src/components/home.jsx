import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, logout } from "../redux/slices/authSlice";

const API_BASE_URL = "http://localhost:3000/api";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      axios
        .get(`${API_BASE_URL}/items`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("API Response:", response.data);
          setItems(Array.isArray(response.data) ? response.data : []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching items:", error);
          setError("Failed to load items.");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);

    dispatch(loginUser(loginData)).then((result) => {
      if (result.error) {
        setLoginError("Invalid email or password.");
      } else {
        navigate("/reviews");
      }
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError(null);

    dispatch(registerUser(registerData)).then((result) => {
      if (result.error) {
        setRegisterError("Registration failed. Please try again.");
      } else {
        navigate("/");
      }
    });
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Reviews</h2>
      {!token ? (
        <div>
          <h3>Login</h3>
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
          <form onSubmit={handleLogin}>
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

          <h3>Register</h3>
          {registerError && <p style={{ color: "red" }}>{registerError}</p>}
          <form onSubmit={handleRegister}>
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
        </div>
      ) : (
        <div>
          <h3>Welcome, {user?.firstName}!</h3>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => navigate("/reviews")}>Go to Reviews</button>

          <h2>Reviewed Items</h2>
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} onClick={() => navigate(`/items/${item.id}`)}>
                <h3>{item.name}</h3>
                <p>Average Rating: {item.averageRating || "No ratings yet"}</p>
              </div>
            ))
          ) : (
            <p>No items available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
