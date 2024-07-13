# Weather Dashboard

Weather Dashboard is a web application that allows users to check current weather conditions and 7-day forecasts for cities worldwide.

## Features

- Display current weather information including temperature, humidity, wind speed, and weather icons.
- Show 7-day weather forecast with details such as daily temperatures, weather conditions, and precipitation.
- Add cities to favorites for quick access.
- Responsive design for optimal viewing on various devices.

## Technologies Used

- React.js
- Material-UI
- Axios for API requests
- Chart.js for temperature chart


## Project Structure

- `src/`: Contains all source code.
  - `components/`: Reusable React components.
  - `App.js`: Main application file.
  - `App.css`: Styling for the application.
- `public/`: Public assets.
- `.env`: Environment variables (not included in the repository for security).

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/weather-dashboard.git
   cd weather-dashboard

2 **Install dependencies:**
    npm install

3. Create a .env file in the root directory and add your OpenWeatherMap API 
   key:
   REACT_APP_WEATHER_API_KEY=your_api_key_here

4. Start the development server:
   npm start

5. Open your browser and visit http://localhost:3000 to view the app.

**Deployment**
  The project is deployed on Vercel and can be accessed [here.](https://weather-dashboard-six-sigma.vercel.app/)

**Contributing**
Contributions are welcome! If you'd like to contribute to this project, please fork the repository and create a pull request.
