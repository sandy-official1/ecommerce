import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/Authcontext";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useNavigate();
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // Validate password strength
    if (enteredPassword.length < 6) {
      setWarningMessage("Password should be at least 6 characters");
      return;
    }

    //optional add validation
    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBLhJaSBEhr0tJizazT6E-5A_ltAnGodJI";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBLhJaSBEhr0tJizazT6E-5A_ltAnGodJI";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            // handle error
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        history("/store");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    const calculatePasswordStrength = () => {
      const enteredPassword = passwordInputRef.current.value;

      if (enteredPassword.length >= 6) {
        setPasswordStrength("Password strength: Strong");
        setWarningMessage("");
      } else if (enteredPassword.length >= 3) {
        setPasswordStrength("Password strength: Medium");
        setWarningMessage("");
      } else if (enteredPassword.length > 0) {
        setPasswordStrength("Password strength: Weak");
        setWarningMessage("Password should be at least 6 characters");
      } else {
        setPasswordStrength("");
        setWarningMessage("");
      }
    };

    calculatePasswordStrength();
  }, []);

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.passwordStrength}>
          {warningMessage && (
            <p className={classes.warning}>{warningMessage}</p>
          )}
          {passwordStrength && (
            <p className={classes.strength}>{passwordStrength}</p>
          )}
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request.....</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
