const ExerciseCard = ( {exercise} ) => {
	return (
		<div className="w-full h-full">
			<div>{exercise.name}</div>
			<iframe 
				width="400" 
				height="200" 
				src={exercise.video} 
				title={exercise.name}
			></iframe>
		</div>
)}

export default ExerciseCard