import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, signInWithGoogle } = UserAuth();

  const logInUser = () => {
    logIn(email, password);
  };

  const googleSignIn = () => {
    signInWithGoogle();
  };

  return (
    <div>
      <div class="bg-grey-lighter min-h-screen flex flex-col">
        <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 class="mb-8 text-3xl text-center">Log In</h1>
            <input
              type="email"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              onClick={logInUser}
              style={{ backgroundColor: "#fb923c" }}
              class="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Log In
            </button>
            <hr />

            <p className="text-center">or</p>

            <hr />

            <button
              type="submit"
              onClick={googleSignIn}
              style={{ backgroundColor: "#4285F4" }}
              class="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Sign In With Google
            </button>
          </div>

          <div class="text-grey-dark mt-6">
            Want to create a new account ?
            <Link
              to={"/signup"}
              class="ml-2 text-orange-400 no-underline border-b border-blue text-blue"
            >
              Sign up
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
