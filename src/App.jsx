// import React from 'react';
// import Weather from './components/Weather';

// const App = () => {
// 	return (
// 		<>
// 			<Weather />
// 		</>
// 	);
// };

// export default App;

import { useState } from 'react';
import { useEffect } from 'react';

function App() {
	const key = import.meta.env.VITE_API_KEY;
	const [city, setCity] = useState('');
	const [loading, setLoading] = useState(false);
	const [weather, setWeather] = useState({});

	const fetchWeather = async (key, city) => {
		setLoading(true);
		try {
			const response = await fetch(
				`https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`,
			);

			const data = await response.json();

			if (data.error) {
				alert('Failed to fetch weather data');
			}
			setWeather(data);
		} catch (error) {
			console.error('Failed to fetch weather data');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='App'>
			<div>
				<input type='text' onChange={(e) => setCity(e.target.value)} />
				<button
					type='button'
					onClick={(e) => {
						console.log('I was clicked');
						fetchWeather(key, city);
					}}>
					Search
				</button>
			</div>
			{loading && <p>Loading data...</p>}
			{!loading && weather.current && Object.keys(weather).length > 0 && (
				<div className='weather-cards'>
					<div className='weather-card'>
						<h3>Temperature</h3>
						<p>{weather.current.temp_c}°C</p>
					</div>
					<div className='weather-card'>
						<h3>Humidity</h3>
						<p>{weather.current.humidity}%</p>
					</div>
					<div className='weather-card'>
						<h3>Condition</h3>
						<p>{weather.current.condition.text}</p>
					</div>
					<div className='weather-card'>
						<h3>Wind Speed</h3>
						<p>{weather.current.wind_kph} kph</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;