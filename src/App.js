import React, { useState, useEffect } from "react";
import Login from "./Login";
import DataTable from "./DataTable";
import DataTable2 from "./DataTable2";
import { fetchCSVData } from "./data";
import { fetchCSVData2 } from "./data2";
import "./App.css";
import {
  initGA,
  logPageView,
  logEvent,
  trackDailyVisits,
  trackUsageTime,
} from "./analytics"; // Import the Google Analytics functions

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [loggedInUserID, setLoggedInUserID] = useState(null);

  useEffect(() => {
    initGA(); // Initialize Google Analytics
    logPageView(); // Log the initial page view
    trackDailyVisits(); // Track the daily visit
    setStartTime(new Date()); // Set the start time for usage time tracking
    fetchCSVData().then((result) => setData(result)); // Fetch data from the first CSV file
    fetchCSVData2().then((result) => setData2(result)); // Fetch data from the second CSV file
  }, []);

  const handleLogin = (username, password) => {
    const userProfile = userProfiles.find(
      (profile) =>
        profile.username === username && profile.password === password
    );

    if (userProfile) {
      setIsLoggedIn(true);
      setLoggedInUserID(userProfile.ID); // Set the logged-in user's ID
      logEvent("User", "Login"); // Log the login event
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <h1 className="app-heading">etaBuddy</h1>
          <div className="last-modified">
            Updated on April 2nd 2025. Powered by Sorbet Solutions. 🍧
          </div>
          <DataTable data={data} />
          <br />
          <h1 className="app-heading">orderBuddy</h1>
          <div className="last-modified">
            Updated on April 2nd 2025. Powered by Sorbet Solutions. 🍧
          </div>
          <DataTable2 userSalespersonID={loggedInUserID} />
          <br />
        </>
      )}
    </div>
  );
}

export default App;
