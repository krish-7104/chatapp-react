import {
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../backend/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../Styles/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
  }, [navigate]);
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
  const signinBtnClickHandler = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/home");
        })
        .catch((error) => {
          console.log(error);
          if (error.code === "auth/invalid-email")
            notifyAlert("Email Doesn't Exist!", "error");
          else if (error.code === "auth/weak-password")
            notifyAlert("Weak Password!", "warn");
          else if (error.code === "auth/wrong-password")
            notifyAlert("Wrong Password!", "error");
          else if (error.code === "auth/user-not-found")
            notifyAlert("User Not Found!", "error");
          else if (error.code === "auth/email-already-in-use")
            notifyAlert("Email Already In Use!", "warn");
          else if (error.code === "auth/user-disabled")
            notifyAlert("User Has Been Blocked", "warn");
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
  const forgetPasswordHandler = () => {
    sendPasswordResetEmail(auth, email);
    notifyAlert(
      "Reset Link Send On Your Email (Check Spam If Not Found)",
      "warn"
    );
  };
  return (
    <section className="authContainer">
      <div className="signinCard animate__animated animate__fadeInDown">
        <p className="cardTitle">Sign In To Your Account</p>
        <div className="inputWrapper">
          <label htmlFor="emailsi">Email Address</label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            id="emailsi"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="inputWrapper">
          <label htmlFor="passwordsi">Password</label>
          <input
            type="password"
            name="password"
            id="passwordsi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="forgetPass" onClick={forgetPasswordHandler}>
          Forget Password?
        </p>
        <div className="buttonWrapper">
          <button
            className="authBtns"
            id="signInBtn"
            onClick={signinBtnClickHandler}
          >
            Sign In
          </button>
        </div>
        <div className="dividerWrapper"></div>
        <div className="buttonWrapper">
          <button className="googleSignIn" onClick={googleLoginEventHandler}>
            Sign In With Google
          </button>
        </div>
        <p className="AlreadyAccText" onClick={() => navigate("/create")}>
          Don't Have Any Account?{" "}
          <span id="signinPageRedirect">CREATE ONE</span>
        </p>
      </div>
    </section>
  );
};

export default Login;
