import React from "react";
import { Route, Routes } from "react-router-dom";
import UploadAuthorProfile from "./Pages/AuthorProfile";
import AuthorProfileData from "./Pages/AuthorProfileData";
import Authors from "./Pages/Authors";
import HomePage from "./Pages/HomePage";
import LogIn from "./Pages/Login";
import PostBlog from "./Pages/PostBlog";
import SignUp from "./Pages/SignUp";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header";
import { MobileNavbar } from "./components/MobileHeader.jsx";
import BlogsSection from "./components/sections/BlogsSection.jsx";
import CategorySection from "./components/sections/Category.jsx";
import CategoryItem from "./components/sections/CategoryItem.jsx";
import ReadBlog from "./components/sections/ReadBlog";
import { AuthContextProvider } from "./context/AuthContext";

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
          <Route path="/categories" element={<CategorySection />} />
          <Route path="/category/:id" element={<CategoryItem />} />
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
