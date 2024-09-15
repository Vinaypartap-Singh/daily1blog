import React from "react";
import HeroBlog from "../components/sections/HeroBlog";
import BlogsSection from "../components/sections/BlogsSection";
import CategorySection from "../components/sections/Category";

export default function HomePage() {
  return (
    <div>
      <HeroBlog />
      <CategorySection showHeader={true} />
      <BlogsSection showHeader={true} />
    </div>
  );
}
