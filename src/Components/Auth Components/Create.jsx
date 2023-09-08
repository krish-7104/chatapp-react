import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../backend/firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../Styles/Auth.css";
const Create = () => {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      }
    });
  }, [navigate]);
  const provider = new GoogleAuthProvider();
  const notifyAlert = (text, type) => {
    if (type === "error") {
      toast.error(text, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (type === "warn") {
      toast.warn(text, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const googleLoginEventHandler = () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        navigate("/user-details");
      })
      .then((error) => {
        console.log(error);
        if (error.code === "auth/invalid-email")
          notifyAlert("Email Doesn't Exist!", "error");
        else if (error.code === "auth/weak-password")
          notifyAlert("Weak Password!", "warn");
        else if (error.code === "auth/wrong-password")
          notifyAlert("Wrong Password!", "error");
        else if (error.code === "auth/email-already-in-use")
          notifyAlert("Email Already In Use!", "warn");
        else if (error.code === "auth/user-disabled")
          notifyAlert("User Has Been Blocked", "warn");
      });
  };
  const signUpBtnClickHandler = async () => {
    if (email !== "" && password !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/user-details");
        })
        .catch((error) => {
          console.log(error);
          if (error.code === "auth/invalid-email")
            notifyAlert("Email Doesn't Exist!", "error");
          else if (error.code === "auth/weak-password")
            notifyAlert("Weak Password!", "warn");
          else if (error.code === "auth/wrong-password")
            notifyAlert("Wrong Password!", "error");
          else if (error.code === "auth/email-already-in-use")
            notifyAlert("Email Already In Use!", "warn");
          else if (error.code === "auth/user-disabled")
            notifyAlert("User Has Been Blocked", "warn");
        });
    }
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <section className="authContainer">
      <div className="signUpCard animate__animated animate__fadeInDown">
        <p className="cardTitle">Create New Account</p>
        <div className="inputWrapper">
          <label htmlFor="emailsu">Email Address</label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            id="emailsu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="inputWrapper">
          <label htmlFor="passwordsu">Password</label>
          <input
            type="password"
            name="password"
            id="passwordsu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttonWrapper">
          <button
            className="authBtns"
            id="signUpBtn"
            onClick={signUpBtnClickHandler}
          >
            Sign Up
          </button>
        </div>
        <div className="dividerWrapper"></div>
        <div className="buttonWrapper">
          <button className="googleSignIn" onClick={googleLoginEventHandler}>
            Sign In With Google
          </button>
        </div>
        <p className="AlreadyAccText" onClick={() => navigate("/login")}>
          Already Have Account? <span id="signinPageRedirect">SIGN IN</span>
        </p>
      </div>
    </section>
  );
};

export default Create;
