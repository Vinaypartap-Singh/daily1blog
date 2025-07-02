import BlogsSection from "../components/sections/BlogsSection";
import HeroBlog from "../components/sections/HeroBlog";

export default function HomePage() {
  return (
    <div>
      <HeroBlog />
      {/* <CategorySection showHeader={true} /> */}
      <BlogsSection showHeader={true} />
    </div>
  );
}
