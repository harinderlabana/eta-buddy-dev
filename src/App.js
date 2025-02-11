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

  const userProfiles = [
    {
      username: "sunny.labana@redhilltoyota.ca",
      password: "slabana007",
      firstName: "Sunny",
      lastName: "Labana",
      position: "Sales Manager",
      ID: "H",
    },
    {
      username: "darcy.gerrior@redhilltoyota.ca",
      password: "Password1",
      firstName: "Darcy",
      lastName: "Gerrior",
      position: "Sales Person",
      ID: "DG",
    },
    {
      username: "eunice.gallo@redhilltoyota.ca",
      password: "egallo002",
      firstName: "Eunice",
      lastName: "Gallo",
      position: "Sales Person",
      ID: "EG",
    },
    {
      username: "dave.bhogal@redhilltoyota.ca",
      password: "dbhogal003",
      firstName: "Dave",
      lastName: "Bhogal",
      position: "Sales Person",
      ID: "DB",
    },
    {
      username: "dan.petrie@redhilltoyota.ca",
      password: "dpetrie004",
      firstName: "Dan",
      lastName: "Petrie",
      position: "Sales Person",
      ID: "DP",
    },
    {
      username: "marco.perrelli@redhilltoyota.ca",
      password: "mperrelli009",
      firstName: "Marco",
      lastName: "Perrelli",
      position: "Sales Person",
      ID: "MP",
    },
    {
      username: "saman.ahmed@redhilltoyota.ca",
      password: "sahmed007",
      firstName: "Saman",
      lastName: "Ahmed",
      position: "Sales Person",
      ID: "SA",
    },
    {
      username: "johnny.giannini@redhilltoyota.ca",
      password: "jgiannini008",
      firstName: "Johnny",
      lastName: "Giannini",
      position: "Sales Person",
      ID: "JG",
    },
    {
      username: "gregg.zhang@redhilltoyota.ca",
      password: "gzhang009",
      firstName: "Gregg",
      lastName: "Zhang",
      position: "Sales Person",
      ID: "GZ",
    },
    {
      username: "nicolas.thompson@redhilltoyota.ca",
      password: "nthompson005",
      firstName: "Nicolas",
      lastName: "Thompson",
      position: "Sales Person",
      ID: "NT",
    },
  ];

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
            Updated on February 11th 2025. Powered by Sorbet Solutions. 🍧
          </div>
          <DataTable data={data} />
          <br />
          <h1 className="app-heading">orderBuddy</h1>
          <div className="last-modified">
            Updated on February 11th 2025. Powered by Sorbet Solutions. 🍧
          </div>
          <DataTable2 userSalespersonID={loggedInUserID} />
          <br />
        </>
      )}
    </div>
  );
}

export default App;
