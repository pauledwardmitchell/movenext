import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
 
const SmallExerciseCard = ( {exercise} ) => {
  return (
    <Card key={exercise.id} 
    	  className="max-w-[15rem] overflow-hidden">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <img
          src="https://telehab-exercise-thumbnails.s3.ap-southeast-2.amazonaws.com/ID_50-508x540.jpg"
          alt={exercise.name}
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h6" color="blue-gray">
          {exercise.name}
        </Typography>
      </CardBody>
    </Card>
  );
}

export default SmallExerciseCard