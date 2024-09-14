import React from "react";
import HeroBlog from "../components/sections/HeroBlog";
import BlogsSection from "../components/sections/BlogsSection";

export default function HomePage() {
  return (
    <div>
      <HeroBlog />
      <BlogsSection showHeader={true} />
    </div>
  );
}
