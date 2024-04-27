import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';

const Weather = () => {
	const [place, setplace] = useState([]);
	const [search, setsearch] = useState('');
	const [locationMy, setLocation] = useState('');
	const [loading, setloading] = useState(false);

	const handleInput = (e) => {
		setsearch(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLocation(search);
		setsearch('');
	};

	const getPlace = async () => {
		setloading(true);
		try {
			let { data } = await axios.get(
				`https://api.weatherapi.com/v1/current.json?key=${
					import.meta.env.VITE_API_KEY
				}&q=${locationMy}&aqi=no`,
			);
			setplace(data);
		} catch (error) {
			console.log(error);
			alert('Failed to fetch weather data');
		} finally {
			setloading(false);
		}
	};

	useEffect(() => {
		if (locationMy !== '') {
			getPlace();
		}
	}, [locationMy]);

	return (
		<div className='w-full h-screen bg-[#F0F8FF]'>
			<div className='w-full flex justify-center h-[20vh] items-center'>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						placeholder='Enter city name'
						className='p-2 rounded-md'
						onChange={handleInput}
						value={search}
					/>
					<button
						className='bg-[#4CAF50] text-white p-2 px-4 ml-2 rounded-md'
						type='submit'>
						Search
					</button>
				</form>
			</div>
			{loading ? (
				<div className='w-[1300px] m-auto flex justify-center'>
					<h1>Loading data…</h1>
				</div>
			) : (
				<>
					{place != '' && (
						<div className='w-[1300px] m-auto grid grid-cols-4'>
							<Card heading='Temperature'>
								{place?.current?.temp_c}°C
							</Card>
							<Card heading='Humidity'>
								{place?.current?.humidity}%
							</Card>
							<Card heading='Condition'>
								{place?.current?.condition.text}
							</Card>
							<Card heading='Wind Speed'>
								{place?.current?.wind_kph} kph
							</Card>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Weather;
