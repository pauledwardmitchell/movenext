"use client"

import { CldVideoPlayer } from 'next-cloudinary'
import 'next-cloudinary/dist/cld-video-player.css'

const ExerciseCard = ( {exercise} ) => {
	return (
		<div className="w-full h-full">
			<CldVideoPlayer
			  width="768" 
			  height="432"
			  src={exercise.video}
			/>
		</div>
)}

export default ExerciseCard

