'use client'

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
 
const SmallExerciseCard = ( {exercise} ) => {
  return (
    <Card key={exercise.id} className="max-w-[15rem] overflow-hidden">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <img 
          width={200}
          height={180}
          src='https://images.squarespace-cdn.com/content/v1/56801605c21b8647030fa31c/cde09427-724d-479b-b165-2126d210695e/Augustyn+Fitness+logo.jpg?format=1500w'
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