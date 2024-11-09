import Logo from "../assets/Images/Logo.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <img src={Logo} className={"w-14 h-14 object-fit"} />
          <span className="ml-3 text-xl">Daily 1 Blog</span>
        </a>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2023 —
          <a
            href="https://twitter.com/knyttneve"
            className="text-gray-600 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            @ Daily 1 Blog{" "}
          </a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <ul className={"list-unstyled"}>
            <li className={"text-sm space-x-8"}>
              <Link to="/">Home</Link>
              <Link to="/blogs">Blogs</Link>
              <Link to={"/signup"}>Account</Link>
            </li>
          </ul>
        </span>
      </div>
    </footer>
  );
}
