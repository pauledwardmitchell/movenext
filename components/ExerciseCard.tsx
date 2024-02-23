"use client"

import { CldVideoPlayer } from 'next-cloudinary'
import 'next-cloudinary/dist/cld-video-player.css'

const ExerciseCard = ( {exercise} ) => {
	return (
		<div className="w-full h-full">
			<CldVideoPlayer
			  width="800" 
			  height="600"
			  src="push-up-video"
			/>
		</div>
)}

export default ExerciseCard

