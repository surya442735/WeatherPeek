// import "./App.css";
// import React, { useState } from "react";

// function App() {
//   const [username, setUsername] = useState("");
//   const [stats, setStats] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const validateUsername = (name) => {
//     setError("");
//     if (name.trim() === "") {
//       setError("Username should not be empty");
//       return false;
//     }
//     const regex = /^[a-zA-Z0-9_]{3,16}$/;
//     if (!regex.test(name)) {
//       setError("Invalid username format");
//       return false;
//     }
//     return true;
//   };

//   const fetchUserDetails = async () => {
//     if (!validateUsername(username)) {
//       return;
//     }

//     setIsLoading(true);
//     setStats(null);
//     setError("");

//     // NOTE: The cors-anywhere proxy can be unreliable.
//     const targetUrl =
//       "https://cors-anywhere.herokuapp.com/https://leetcode.com/graphql/";
//     const graphqlQuery = {
//       query: `query userSessionProgress($username: String!) {
//         allQuestionsCount { difficulty count }
//         matchedUser(username: $username) {
//           submitStats { acSubmissionNum { difficulty count } }
//         }
//       }`,
//       variables: { username },
//     };

//     try {
//       const response = await fetch(targetUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(graphqlQuery),
//       });

//       if (!response.ok)
//         throw new Error("Network error. The CORS proxy may be down.");

//       const data = await response.json();

//       if (data.errors || !data.data.matchedUser) {
//         throw new Error("User not found or LeetCode API error.");
//       }

//       const allQuestions = data.data.allQuestionsCount;
//       const solvedStats = data.data.matchedUser.submitStats.acSubmissionNum;

//       const easyData = {
//         solved: solvedStats.find((s) => s.difficulty === "Easy")?.count || 0,
//         total: allQuestions.find((q) => q.difficulty === "Easy")?.count || 0,
//       };
//       const mediumData = {
//         solved: solvedStats.find((s) => s.difficulty === "Medium")?.count || 0,
//         total: allQuestions.find((q) => q.difficulty === "Medium")?.count || 0,
//       };
//       const hardData = {
//         solved: solvedStats.find((s) => s.difficulty === "Hard")?.count || 0,
//         total: allQuestions.find((q) => q.difficulty === "Hard")?.count || 0,
//       };

//       setStats({
//         easy: easyData,
//         medium: mediumData,
//         hard: hardData,
//       });
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // This function passes the dynamic percentage to your CSS.
//   const getCircleStyle = (solved, total) => {
//     const percentage = total > 0 ? (solved / total) * 100 : 0;
//     return {
//       "--progress": `${percentage}%`,
//     };
//   };

//   return (
//     <div>
//       <div className="leetreport-container">
//         <div className="leetmetric">
//           <h1 className="newh1">LeetReport</h1>
//           <div className="LM-form">
//             <input
//               id="LM-username"
//               placeholder="Enter your username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <button
//               id="LM-search"
//               type="button"
//               onClick={fetchUserDetails}
//               disabled={isLoading}
//             >
//               {isLoading ? "Searching..." : "Search"}
//             </button>
//           </div>

//           {error && <p className="error-message">{error}</p>}

//           {stats && (
//             <div className="stats">
//               <div
//                 className="circle"
//                 style={getCircleStyle(stats.easy.solved, stats.easy.total)}
//               >
//                 <span className="stat-label">{`${stats.easy.solved} / ${stats.easy.total}`}</span>
//               </div>

//               <div
//                 className="circle"
//                 style={getCircleStyle(stats.medium.solved, stats.medium.total)}
//               >
//                 <span className="stat-label">{`${stats.medium.solved} / ${stats.medium.total}`}</span>
//               </div>

//               <div
//                 className="circle"
//                 style={getCircleStyle(stats.hard.solved, stats.hard.total)}
//               >
//                 <span className="stat-label">{`${stats.hard.solved} / ${stats.hard.total}`}</span>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
import "./App.css";
import React, { useState } from 'react';

function App() {
  // 1. State updated for city and weather data
  const [cityName, setCityName] = useState("");
  const [weatherStats, setWeatherStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateCityName = (name) => {
    setError("");
    if (name.trim() === "") {
      setError("City name should not be empty");
      return false;
    }
    return true;
  };

  // 2. Main data fetching logic is now for weather
  const fetchWeatherData = async () => {
    if (!validateCityName(cityName)) {
      return;
    }
    
    setIsLoading(true);
    setWeatherStats(null);
    setError('');

    try {
      // Step 1: Get coordinates for the city name using Open-Meteo's Geocoding API
      const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`);
      const geoData = await geoResponse.json();

      if (!geoData.results) {
        throw new Error(`Could not find city: ${cityName}. Please check the spelling.`);
      }

      const { latitude, longitude } = geoData.results[0];

      // Step 2: Use coordinates to get weather data from Open-Meteo's Forecast API
      const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relativehumidity_2m,precipitation_probability&timezone=auto`);
      const weatherData = await weatherResponse.json();

      if (!weatherData.current) {
        throw new Error("Could not fetch weather data.");
      }

      // 3. Set the state with the new weather data
      setWeatherStats({
        temperature: { value: weatherData.current.temperature_2m, unit: '°C' },
        humidity: { value: weatherData.current.relativehumidity_2m, unit: '%' },
        precipitation: { value: weatherData.current.precipitation_probability, unit: '%' }
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Style function now converts weather values to percentages
  const getCircleStyle = (value, type) => {
    let percentage = 0;
    
    switch (type) {
      case 'temperature':
        // Map temperature to a 0-100% scale. Let's assume a range of -10°C to 40°C.
        const minTemp = -10;
        const maxTemp = 40;
        percentage = ((value - minTemp) / (maxTemp - minTemp)) * 100;
        break;
      case 'humidity':
      case 'precipitation':
        // Humidity and precipitation probability are already percentages
        percentage = value;
        break;
      default:
        percentage = 0;
    }
    
    // Ensure percentage is within 0-100 bounds
    const boundedPercentage = Math.max(0, Math.min(100, percentage));
    
    return {
      '--progress': `${boundedPercentage}%`
    };
  };

  return (
    <div>
      <div className="leetreport-container">
        <div className="leetmetric">
          {/* 5. Title and input fields updated */}
          <h1 className="newh1">WeatherPeek</h1>
          <div className="LM-form">
            <input 
              id="LM-username" 
              placeholder="Enter city name"
              value={cityName}
              onChange={e => setCityName(e.target.value)}
            />
            <button id="LM-search" type="button" onClick={fetchWeatherData} disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}

          {/* 6. JSX now renders weather data */}
          {weatherStats && (
            <div className="stats">
              <div className="stat-item">
                <h2 className="stat-title">Temperature</h2>
                <div className="circle" style={getCircleStyle(weatherStats.temperature.value, 'temperature')}>
                  <span className="stat-label">{`${weatherStats.temperature.value}${weatherStats.temperature.unit}`}</span>
                </div>
              </div>
              <div className="stat-item">
                <h2 className="stat-title">Humidity%</h2>
                <div className="circle" style={getCircleStyle(weatherStats.humidity.value, 'humidity')}>
                  <span className="stat-label">{`${weatherStats.humidity.value}${weatherStats.humidity.unit}`}</span>
                </div>
              </div>
              <div className="stat-item">
                <h2 className="stat-title">Precipitation%</h2>
                <div className="circle" style={getCircleStyle(weatherStats.precipitation.value, 'precipitation')}>
                  <span className="stat-label">{`${weatherStats.precipitation.value}${weatherStats.precipitation.unit}`}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;