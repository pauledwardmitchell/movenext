"use client"

import { useState } from 'react'
import { createNewTemplate } from '@/utils/api'
import { useRouter } from 'next/navigation'

import { Input } from "@material-tailwind/react"

const TemplateForm =  ( {exercises} ) => {
  const [exercisesToRender, setExercisesToRender] = useState(exercises) 
  const [query, setQuery] = useState("")
  const [programName, setProgramName] = useState("")
  const [templateExercises, setTemplateExercises] = useState([])
  const [templateName, setTemplateName] = useState("")

  const search = (exercises) => {
		return exercises.filter((item) => item.name.toLowerCase().includes(query))
	}

  const router = useRouter()

  const templateData = {
    name: templateName,
    exercises: templateExercises
  }

  const handleTemplateSubmit = async () => {
    const { data } = await createNewTemplate( templateData )
    router.push(`/template/${data.id}`)
  }

	return (
	  <div>
	  <input onChange={ (e) => setQuery(e.target.value)}></input>
      <button>Filter</button>
			<div className="grid grid-cols-3 gap-4">
			{search(exercisesToRender).map((exercise) => (
				<button 
					key={exercise.id} 
					onClick={() => setTemplateExercises([...templateExercises, {id: exercise.id, name: exercise.name}])}
					>{exercise.name}</button>
			))}
			</div> 
	  <aside className="absolute right-0 top-[60px] h-full w-[400px] border-l border-black/10">
        <div>
          <ul className="px-4">
			New Template Form
          </ul>
	    <div className="h-[500px]cursor-pointer overflow-hidden rounded-lg bg-white shadow">
	      <div className="px-4 py-5 sm:p-6">
	      <Input label="Template Name" onChange={ (e) => setTemplateName(e.target.value)}></Input>
	        <ul>
    		  {templateExercises.map(exercise => (
    			<li key={exercise.id}>{exercise.name}</li>))}
    		</ul>
	        <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl" onClick={handleTemplateSubmit}>new template</button>
	      </div>
	    </div>
	    </div>
      </aside>
      </div>
	)
}

export default TemplateForm