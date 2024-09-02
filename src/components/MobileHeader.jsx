import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";

export function MobileNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

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

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6"></ul>
  );

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
    <Navbar
      className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 lg:hidden"
      style={{ fontFamily: "sora !important" }}
    >
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          <Link
            to={"/"}
            class="flex title-font font-medium items-center text-black"
          >
            <span class="ml-3 text-md font-bold">Daily1Blog</span>
          </Link>
        </Typography>
        <div className="hidden lg:block">
          <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {navItems.map((data, index) => {
              return (
                <Link
                  href={`${data.link}`}
                  className="flex items-center text-black text-sm ml-4 my-3"
                >
                  {data.name}
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center gap-x-1">
          <Button variant="text" size="sm" className="hidden lg:inline-block">
            <Link>
              <span>Log In</span>
            </Link>
          </Button>
          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
          >
            <span>Sign in</span>
          </Button>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {navItems.map((data, index) => {
              return (
                <Link
                  href={`${data.link}`}
                  className="flex items-center text-black text-sm ml-4 my-3"
                >
                  {data.name}
                </Link>
              );
            })}
          </ul>

          <div className="flex items-center justify-between gap-x-1">
            {user && (
              <>
                <Button size="sm" variant="outlined">
                  <Link to={"/createauthorprofile"}>Create Profile</Link>
                </Button>
                <Button size="sm" variant="outlined">
                  <Link to={"/postblog"}>Post a Blog</Link>
                </Button>
                <Button
                  size="sm"
                  variant="filled"
                  color="orange"
                  onClick={logUserOut}
                >
                  <button onClick={logUserOut}>LogOut</button>
                </Button>
              </>
            )}

            {!user ? (
              <>
                <Button size="sm" variant="outlined" color="deep-orange">
                  <Link to={"/login"}>Login</Link>
                </Button>
                <Button size="sm">
                  <Link to={"/signup"}>Create an Account</Link>
                </Button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
}
