"use client"

import { useState } from "react"
import { updateExercise } from '@/utils/api'
import { useRouter } from 'next/navigation'

const EditableExerciseCard = ( {exercise} ) => {
  const [name, setName] = useState(exercise.name)
  const [video, setVideo] = useState(exercise.video)
  const [description, setDescription] = useState(exercise.description)

  const router = useRouter()

  const exerciseData = {
    name: name,
    video: video,
    description: description
  }

  const handleOnClick = async () => {
    const { data } = await updateExercise( exercise.id, exerciseData )
    router.push(`/exercise/${data.id}`) //redirect location after submit
  }

return (
    <div className="h-[500px]cursor-pointer overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6">
        <label>name</label>
        <textarea value={name} onChange={(e) => setName(e.target.value)} />
        <label>video</label>        
        <textarea value={video} onChange={(e) => setVideo(e.target.value)} />
        <label>description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl" onClick={handleOnClick}>update</button>
      </div>
    </div>
  )
}

export default EditableExerciseCard




