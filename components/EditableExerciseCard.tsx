"use client"

import { useState } from "react"
import { updateExercise } from '@/utils/api'
import { useRouter } from 'next/navigation'

const EditableExerciseCard = ( {exercise} ) => {
  const [name, setName] = useState(exercise.name)
  const [video, setVideo] = useState(exercise.video)
  const [image, setImage] = useState(exercise.image)
  const [description, setDescription] = useState(exercise.description)

  const router = useRouter()

  const exerciseData = {
    name: name,
    video: video,
    image: image,
    description: description
  }

  const handleOnClick = async () => {
    const { data } = await updateExercise( exercise.id, exerciseData )
    router.push(`/allexercises`) //redirect location after submit
  }

return (
    <form className="max-w-lg mx-auto my-10 p-6 bg-white rounded shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-3xl">Edit "{exercise.name}"</h3>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        <div className="mb-4">
          <label htmlFor="video" className="block text-sm font-medium text-gray-700">Video</label>
          <input value={video} onChange={(e) => setVideo(e.target.value)} type="text" id="video" name="video" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
          <input value={image} onChange={(e) => setImage(e.target.value)} type="text" id="image" name="image" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="description" name="description" rows="4" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
        </div>

        <button onClick={handleOnClick} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Exercise</button>
      </div>
    </form>
  )
}

export default EditableExerciseCard




