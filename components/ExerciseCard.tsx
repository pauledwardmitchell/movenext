import { getCldVideoUrl } from 'next-cloudinary'

const ExerciseCard = ( {exercise} ) => {
	const url = getCldVideoUrl({
		width: 800,
		height: 600,
		src: 'push-up-video'
	})

	return (
		<div className="w-full h-full">
			<div>{exercise.name}</div>
			<video width="800" height="600" controls playsInline preload="none">
				<source src={url}/>
			</video>
		</div>
)}

export default ExerciseCard





