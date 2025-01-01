import React from "react";
import { useNavigate } from "react-router-dom";
import HeroImage from "../../assets/Images/D1BHERO.svg";

export default function HeroBlog() {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap items-center -m-6 max-width-content">
        <div className="w-full lg:w-1/2 p-6">
          <div className="lg:max-w-xl">
            <p
              className="mb-8 font-heading max-w-max px-5 py-2.5 uppercase font-semibold text-xs tracking-wider text-gray-900 bg-gradient-blue2 rounded-full"
              data-config-id="auto-txt-13-2"
            >
              Read 1 Blog Daily
            </p>
            <h1
              className="mb-6 font-heading text-4xl leading-normal md:text-6xl text-gray-900 font-bold"
              data-config-id="auto-txt-14-2"
            >
              Your Daily Dose of Inspiration
            </h1>
            <p
              className="mb-9 text-gray-600 text-lg"
              data-config-id="auto-txt-15-2"
            >
              Discover a world of inspiration. Welcome to our blog, where
              curiosity meets knowledge. Join us on a journey of exploration and
              growth as we delve into captivating stories, share insightful
              perspectives, and ignite your passion for learning. Embrace the
              richness of life with every click. Welcome to our blog - your
              gateway to endless inspiration.
            </p>
            <button
              onClick={() => navigate("/blogs")}
              className="group relative font-heading px-10 py-5 w-full lg:w-auto uppercase text-white text-xs font-semibold tracking-px bg-orange-400 overflow-hidden rounded-md"
            >
              <div className="absolute top-0 left-0 transform -translate-x-full group-hover:-translate-x-0 h-full w-full transition ease-in-out duration-500 bg-gray-800"></div>
              <p className="relative z-10" data-config-id="auto-txt-16-2">
                Read Blogs
              </p>
            </button>
            <button
              onClick={() => navigate("/authors")}
              className="ml-0 mt-3 sm:mt-0 sm:ml-10 group relative font-heading px-10 py-5 w-full lg:w-auto uppercase text-white text-xs font-semibold tracking-px bg-gray-900 overflow-hidden rounded-md"
            >
              <button
                onClick={() => navigate("/authors")}
                className="relative z-10"
                data-config-id="auto-txt-16-2"
              >
                Authors
              </button>
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-6">
          <img
            className="block mx-auto"
            src={HeroImage}
            alt=""
            data-config-id="auto-img-3-2"
          />
        </div>
      </div>
    </div>
  );
}
