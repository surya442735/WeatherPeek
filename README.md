# WeatherPeek

WeatherPeek is a simple and clean web application built with React that allows users to get real-time weather data for any city. It provides a quick look at the current temperature, humidity, and precipitation probability, visualized in intuitive circular progress bars.

Tech Stack
-
Frontend: React.js

Styling: Plain CSS3 with CSS Custom Properties (Variables)

Data Source: Open-Meteo API for weather and geocoding data.


Prerequisites
-
Make sure you have Node.js and npm (or yarn) installed on your machine.

Node.js (which includes npm)

Installation 
-
Clone the repository:   
-> git clone https://github.com/surya442735/WeatherPeek.git   

Navigate to the Project directory:  
-> cd Weathermetric
-> cd weatherpeek

Install the dependencies:  
-> npm install

Start
-
Using npm:   
->npm start


Features
-

~City Search: Find current weather conditions for any city around the world.

~Key Weather Metrics: Instantly view the most important data:

🌡️ Temperature

💧 Humidity

🌧️ Precipitation Probability

~Interactive Visualization: Weather data is displayed using dynamic circular progress bars that fill up based on the metric's value.

~Responsive Design: A clean and modern interface that works on various screen sizes.

~Error Handling: Provides user-friendly feedback for invalid or unfound city names.

How It Works
-

The application uses a two-step process to fetch weather data from the free Open-Meteo API:

~Geocoding: When a user enters a city name, the app first calls the Open-Meteo Geocoding API to convert the city name into its precise latitude and longitude.

~Weather Forecast: Using these coordinates, the app then calls the Open-Meteo Forecast API to get the current weather conditions for that location.

The fetched data is then used to update the state in the React component, and the UI is re-rendered to display the results.
