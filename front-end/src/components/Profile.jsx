import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance"; 

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get("/api/aboutMe", {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      setProfile(response.data);
    } catch (err) {
      setError("Failed to load profile.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (error) return <p>{error}</p>;
  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>
        {profile.firstName} {profile.lastName}
      </h2>
      <p>Email: {profile.email}</p>
      <p>Role: {profile.isAdmin ? "Administrator" : "User"}</p>
    </div>
  );
};

export default Profile;