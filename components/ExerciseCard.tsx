"use client"

import { CldVideoPlayer } from 'next-cloudinary'

const ExerciseCard = ( {exercise} ) => {
	return (
		<div className="w-full h-full">
			<div>{exercise.name}</div>
			<CldVideoPlayer
			  width="800" 
			  height="600"
			  src="push-up-video"
			/>
		</div>
)}

export default ExerciseCard

