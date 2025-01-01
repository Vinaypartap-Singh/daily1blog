import { Link } from "react-router-dom";
import CultureImage from "../../assets/Images/culture.jpg";
import FashionImage from "../../assets/Images/fashion.jpg";
import {
  default as FoodImage,
  default as TravelImage,
} from "../../assets/Images/food.jpg";
import HealthImage from "../../assets/Images/health.jpg";
import ParentingImage from "../../assets/Images/parenting.jpg";
import PersonalDevelopmentImage from "../../assets/Images/personal.jpg";
import TechnologyImage from "../../assets/Images/technology.jpg";

export default function CategorySection({ showHeader = false }) {
  const categoryItems = [
    {
      name: "Food and Cooking",
      image: FoodImage,
      url: "foodandcooking",
    },
    {
      name: "Technology and Gadgets",
      image: TechnologyImage,
      url: "technologyandgadgets",
    },
    {
      name: "Travel and Adventure",
      image: TravelImage,
      url: "travelandadventure",
    },
    {
      name: "Personal Development",
      image: PersonalDevelopmentImage,
      url: "personaldevelopment",
    },
    {
      name: "Health and Wellness",
      image: HealthImage,
      url: "healthandwellness",
    },
    {
      name: "Fashion and Beauty",
      image: FashionImage,
      url: "fashionandbeauty",
    },
    {
      name: "Parenting and Family",
      image: ParentingImage,
      url: "parentingandfamily",
    },
    {
      name: "Arts & Culture",
      image: CultureImage,
      url: "artsandculture",
    },
  ];

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 pt-24 mx-auto max-width-content">
        {showHeader && (
          <div className={"flex items-center justify-between"}>
            <h1 className="mb-10 text-3xl font-bold text-black">
              All Categories
            </h1>
            <Link
              to={`/categories`}
              className="mb-10 text-orange-400 text-sm inline-flex items-center"
            >
              View All{" "}
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        )}

        <div className="flex flex-wrap -m-4">
          {categoryItems.map((data, index) => {
            return (
              <Link
                to={`/category/${data.name}`}
                className="lg:w-1/4 md:w-1/2 p-4 w-full"
                key={index}
              >
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src={data?.image}
                  />
                </a>
                <div className="mt-4">
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {data.name}
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
