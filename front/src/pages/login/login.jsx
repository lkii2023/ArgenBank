import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/user.actions";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (storedRememberMe && storedEmail) {
      setEmail(storedEmail);
      setRememberMe(storedRememberMe);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter your email address and your password.");
      return;
    }

    try {
      const token = await dispatch(loginUser(email, password, navigate));

      if (token) {
        if (rememberMe) {
          localStorage.setItem("email", email);
          localStorage.setItem("rememberMe", true);
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("rememberMe");
        }

        setEmail("");
        setPassword("");
        setError("");
      } else {
        setError("The email or password is incorrect. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred while dispatching loginUser:", error);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label htmlFor="email">Username</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              checked={rememberMe}
              id="remember-me"
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            type="submit"
            className="sign-in-button"
          >
            Sign In
          </button>
          {error && <p className="error-style">{error}</p>}
        </form>
      </section>
    </main>
  );
};

export default Login;
