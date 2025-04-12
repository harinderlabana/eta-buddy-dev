import React, { useState } from "react";
import "./Login.css"; // Import the custom CSS file

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="login-container">
      <h3>404</h3>
    </div>
  );
}

export default Login;
