import React, { useState } from 'react';
import './Login.css'; // Import the custom CSS file

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="login-container">
        <h1 className="app-heading">etaBuddy</h1>
        <div className="powered-by">Powered by Sorbet Solutions. 🍧</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <br></br>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
