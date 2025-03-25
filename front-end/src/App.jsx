import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import AuthLanding from "./components/AuthLanding.jsx";
import Home from "./components/Home.jsx";
import SingleItem from "./components/singleItem.jsx";
import AllReviews from "./components/AllReviews.jsx";
import Login from "./components/login.jsx";
import Registration from "./components/Registration.jsx";
import Profile from "./components/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ReviewsList from "./components/ReviewsList.jsx";
import WriteReview from "./components/writeReview.jsx";
import SingleUser from "./components/singleUser.jsx";
import PostItem from "./components/postItem.jsx";

function App() {
  return (
    <div>
      <NavBar />
    <Routes>
      <Route path="/" element={<AuthLanding />} />
      <Route path="/home" element={<Home />} />
      <Route path="/items/:id" element={<SingleItem />} />
      <Route path="/reviews" element={<AllReviews />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>
        }
      />
      <Route
        path="/my-reviews"
        element={
          <ProtectedRoute>
            <ReviewsList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/items/:id/write-review"
        element={
          <ProtectedRoute>
            <WriteReview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/:id"
        element={
          <ProtectedRoute>
            <SingleUser />
          </ProtectedRoute>
        }
      />
      <Route
  path="/post-item"
  element={
    <ProtectedRoute>
      <PostItem />
    </ProtectedRoute>
  }
/>
    </Routes>
    </div>
  );
}
export default App;