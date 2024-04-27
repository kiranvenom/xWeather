import React from 'react';

const Card = ({ heading, children }) => {
	return (
		<div className='w-[300px] h-[150px] bg-white m-4 rounded-md shadow-md flex justify-center items-center flex-col weather-card'>
			<h1 className='font-bold text-2xl'>{heading}</h1>
			<h4 className='mt-4'>{children}</h4>
		</div>
	);
};

export default Card;
