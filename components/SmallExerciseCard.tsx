'use client'

import { CldImage, getCldVideoUrl } from 'next-cloudinary'

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
 
const SmallExerciseCard = ( {exercise} ) => {

const url = getCldVideoUrl({
  width: 200,
  height: 180,
  src: exercise.video,
})

  return (
    <Card key={exercise.id} className="max-w-[200px] overflow-hidden">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none aspect-w-16 aspect-h-9 overflow-hidden"
      >
        <img 
          src={url}
          alt={exercise.name}
          className="w-full h-full object-cover object-center"
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