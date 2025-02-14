import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/authSlice";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((result) => {
      if (result.payload && result.payload.token) {
        navigate("/");
      }
    });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
