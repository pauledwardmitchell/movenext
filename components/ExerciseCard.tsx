const ExerciseCard = ( {exercise} ) => {
	return (
		<div className="w-full h-full">
			<div>{exercise.name}</div>
			<div>{exercise.description}</div>	
			<iframe 
				width="400" 
				height="200" 
				src={exercise.video} 
				title="Dienstag Abs" 
			></iframe>
		</div>
)}

export default ExerciseCard