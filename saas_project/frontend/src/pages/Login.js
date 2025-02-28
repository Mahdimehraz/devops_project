import styles from "../styles/form.module.css";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const url =  process.env.REACT_APP_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/auth/login`, {
        username,
        password,
      });
      console.log("Logged in successfully", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error.response.data.message);
    }
  };

  return (
    <>
      <div className={styles.backgroundImage}></div>
      <div className={styles.formContainer}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button type="submit">Login</button>
        </form>
        <div className={styles.link}>
          Don't have an account yet?
          <Link to="/signup"> signup</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
