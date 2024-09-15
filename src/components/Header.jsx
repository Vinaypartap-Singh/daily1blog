import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.svg";

export const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Blogs",
    link: "/blogs",
  },
  {
    name: "Categories",
    link: "/categories",
  },
  {
    name: "Authors",
    link: "/authors",
  },
];

export default function Header() {
  var user = localStorage.getItem("user");
  var user = localStorage.getItem("user");
  const navigate = useNavigate();

  const logUserOut = () => {
    try {
      signOut(auth)
        .then(() => {
          alert("Redirected To Home");
          navigate("/");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sticky top-0 z-50">
      <header className="text-gray-600 body-font sticky top-0 bg-black hidden lg:block">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center max-width-content">
          <Link
            to={"/"}
            className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
          >
            <span className="ml-3 text-xl">Daily 1 Blog</span>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            {navItems.map((item) => {
              return (
                <Link
                  to={item.link}
                  className="text-white mr-5 hover:text-white"
                  key={item.name}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {user && (
            <>
              <Link
                to={"/createauthorprofile"}
                className="mr-5 inline-flex text-white hover:border-transparent items-center py-1 px-3 hover:bg-orange-600 hover:text-white rounded text-base mt-4 md:mt-0"
              >
                Create Profile
              </Link>
              <Link
                to={"/postblog"}
                className="mr-5 inline-flex border border-orange-400 bg-orange-400 text-white hover:border-transparent items-center py-1 px-3 hover:bg-orange-600 hover:text-white rounded text-base mt-4 md:mt-0"
              >
                Post a Blog
              </Link>
              <Link
                onClick={logUserOut}
                className="inline-flex border border-orange-400 text-orange-400 hover:border-transparent items-center py-1 px-3 hover:bg-orange-600 hover:text-white rounded text-base mt-4 md:mt-0"
              >
                LogOut
              </Link>
            </>
          )}

          {!user ? (
            <>
              <Link
                to={"/login"}
                className="mr-2 inline-flex text-orange-400 items-center border-0 py-1 px-3 focus:outline-none hover:bg-orange-600 hover:text-white rounded mt-4 md:mt-0"
              >
                Login
              </Link>

              <Link
                to={"/signup"}
                className="inline-flex border border-orange-400 text-orange-400 hover:border-transparent items-center py-1 px-3 hover:bg-orange-600 hover:text-white rounded text-base mt-4 md:mt-0"
              >
                Create an Account
              </Link>
            </>
          ) : (
            ""
          )}

          {/* {!googleUser && (
            
          )} */}
        </div>
      </header>
    </div>
  );
}
