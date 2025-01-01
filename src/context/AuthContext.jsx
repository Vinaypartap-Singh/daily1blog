import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, provider } from "../../Firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const createUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast("Account Created Successfully");
        navigate("/login");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast(errorMessage);
      });
  };

  const logIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("user", userCredential.user.email);
        localStorage.setItem("userId", userCredential.user.uid);
        toast("Account Logged In Successfully");
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast(errorMessage);
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        localStorage.setItem("userId", token);
        const user = result.user;
        localStorage.setItem("user", user.email);
        toast("Sign In Success");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsub();
    };
  }, [setUser]);

  return (
    <UserContext.Provider
      value={{ createUser, user, logIn, logOut, signInWithGoogle }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
