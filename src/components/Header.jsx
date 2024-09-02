import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.svg";

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

  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Blogs",
      link: "/blogs",
    },
    {
      name: "Authors",
      link: "/authors",
    },
  ];

  return (
    <div>
      <header class="text-gray-600 body-font sticky top-0 bg-black hidden lg:block">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center max-width-content">
          <Link
            to={"/"}
            class="flex title-font font-medium items-center text-white mb-4 md:mb-0"
          >
            <img src={Logo} className={"w-20 h-20 object-fit"} />
            <span class="ml-3 text-xl">Daily 1 Blog</span>
          </Link>
          <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
            {navItems.map((item) => {
              return (
                <Link
                  to={item.link}
                  class="text-white mr-5 hover:text-white"
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
                class="mr-5 inline-flex text-white hover:border-transparent items-center py-1 px-3 hover:bg-orange-600 hover:text-white rounded text-base mt-4 md:mt-0"
              >
                Create Profile
              </Link>
              <Link
                to={"/postblog"}
                class="mr-5 inline-flex border border-orange-400 bg-orange-400 text-white hover:border-transparent items-center py-1 px-3 hover:bg-orange-600 hover:text-white rounded text-base mt-4 md:mt-0"
              >
                Post a Blog
              </Link>
              <Link
                onClick={logUserOut}
                class="inline-flex border border-orange-400 text-orange-400 hover:border-transparent items-center py-1 px-3 hover:bg-orange-600 hover:text-white rounded text-base mt-4 md:mt-0"
              >
                LogOut
              </Link>
            </>
          )}

          {!user ? (
            <>
              <Link
                to={"/login"}
                class="mr-2 inline-flex text-orange-400 items-center border-0 py-1 px-3 focus:outline-none hover:bg-orange-600 hover:text-white rounded mt-4 md:mt-0"
              >
                Login
              </Link>

              <Link
                to={"/signup"}
                class="inline-flex border border-orange-400 text-orange-400 hover:border-transparent items-center py-1 px-3 hover:bg-orange-600 hover:text-white rounded text-base mt-4 md:mt-0"
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
