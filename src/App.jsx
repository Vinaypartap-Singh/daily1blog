import React from "react";
import Header from "./components/Header";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/Login";
import { AuthContextProvider } from "./context/AuthContext";
import PostBlog from "./Pages/PostBlog";
import ReadBlog from "./components/sections/ReadBlog";
import Authors from "./Pages/Authors";
import UploadAuthorProfile from "./Pages/AuthorProfile";
import AuthorProfileData from "./Pages/AuthorProfileData";
import BlogsSection from "./components/sections/BlogsSection.jsx";
import Footer from "./components/Footer.jsx";
import { MobileNavbar } from "./components/MobileHeader.jsx";

export default function App() {
  return (
    <div>
      <AuthContextProvider>
        <Header />
        <MobileNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/postblog" element={<PostBlog />} />
          <Route path="/blog/:id" element={<ReadBlog />} />
          <Route path="/blogs" element={<BlogsSection />} />
          <Route
            path="/createauthorprofile"
            element={<UploadAuthorProfile />}
          />
          <Route path="/authors" element={<Authors />} />
          <Route path="/authorprofile/:id" element={<AuthorProfileData />} />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </div>
  );
}
