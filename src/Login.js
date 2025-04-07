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
      <h3>
        Thank you all for using this app. etaBuddy has been a passion project of
        mine and I have learned alot about the customer and user experience
        while building it. I am looking forward to moving my resources to other
        projects and interests. If this is a tool you appreciated and valued the
        use of contact your leaders and inquire about subscription services.
        This will aid in supporting me to keep the app alive and updated as
        development time, servers and costs are valuable and limited. Thank you,
        Sunny Labana.
      </h3>
    </div>
  );
}

export default Login;
