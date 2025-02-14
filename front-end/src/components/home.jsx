import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:3000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [navigate]);

  return (
    <div>
      <h2>Home Page</h2>
      {users.map((user) => (
        <div key={user.id}>
          <p>
            {user.firstName} {user.lastName}
          </p>
          <button>Update</button>
          <button>Delete</button>
        </div>
      ))}
    </div>
  );
};
export default Home;
