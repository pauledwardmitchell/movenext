'use client'

import { CldImage } from 'next-cloudinary'

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
 
const SmallExerciseCard = ( {exercise} ) => {
  return (
    <Card key={exercise.id} className="max-w-[200px] overflow-hidden">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <CldImage 
          width={200}
          height={180}
          src={exercise.image}
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