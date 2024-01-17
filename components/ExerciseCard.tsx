const ExerciseCard = ( {exercise} ) => {
	return (
		<div className="w-full h-full">
			<div>{exercise.id}</div>
			<div>{exercise.name}</div>
			<div>{exercise.video}</div>
			<div>{exercise.description}</div>	
			<iframe 
				width="800" 
				height="400" 
				src={exercise.video} 
				title="Dienstag Abs" 
			></iframe>
		</div>
)}

export default ExerciseCard