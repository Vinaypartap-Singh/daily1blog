import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { createUser, signInWithGoogle } = UserAuth();

  const signUpUser = async (e) => {
    e.preventDefault();
    await createUser(email, password);
  };

  const googleSignIn = () => {
    signInWithGoogle();
  };

  return (
    <div>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>

            <input
              type="email"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              onClick={signUpUser}
              style={{ backgroundColor: "#fb923c" }}
              className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Create Account
            </button>

            <hr />

            <p className="text-center">or</p>

            <hr />

            <button
              type="submit"
              onClick={googleSignIn}
              style={{ backgroundColor: "#4285F4" }}
              className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Continue With Google
            </button>
          </div>

          <div className="text-grey-dark mt-6">
            Already have an account ?
            <Link
              to={"/login"}
              className="ml-2 text-orange-400 no-underline border-b border-blue text-blue"
            >
              Log in
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
