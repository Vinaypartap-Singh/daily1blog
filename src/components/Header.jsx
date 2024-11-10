import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

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
];

export default function Header() {
  var user = localStorage.getItem("user");
  var userId = localStorage.getItem("userId");
  const [profileExist, setProfileExist] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfileExistence = async () => {
      if (!userId) return;

      try {
        // Get reference to the document in the "profiles" collection using userId
        const docRef = doc(db, "authors", `${userId}`); // Assuming profiles is the collection name
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // If the profile exists, set profileExist to true
          setProfileExist(true);
        } else {
          // If the profile doesn't exist, navigate to create profile page or handle as needed
          setProfileExist(false);
        }
      } catch (error) {
        console.error("Error checking profile existence:", error);
      }
    };

    checkProfileExistence();
  }, [user, userId, navigate]);

  const logUserOut = () => {
    try {
      signOut(auth)
        .then(() => {
          toast("Redirected To Home");
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
              {/* {!profileExist && (
                <Link
                  to={"/createauthorprofile"}
                  className="mr-5 inline-flex text-white hover:border-transparent items-center py-1 px-3 hover:bg-orange-600 hover:text-white rounded text-base mt-4 md:mt-0"
                >
                  Create Profile
                </Link>
              )} */}

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
