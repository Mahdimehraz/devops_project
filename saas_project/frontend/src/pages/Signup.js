import styles from "../styles/form.module.css";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const url =  process.env.REACT_APP_API_URL;

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/auth/signup`, { username, password });
      console.log("Signed up successfully");
      navigate("/login");
    } catch (error) {
      console.error("Signup failed", error.response.data.error);
    }
  };

  return (
    <>
      <div className={styles.backgroundImage}></div>
      <div className={styles.formContainer}>
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
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
            autoComplete="new-password"
          />
          <button type="submit">Signup</button>
        </form>
        <div className={styles.link}>
          Already signed up?
          <Link to="/login"> login</Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
