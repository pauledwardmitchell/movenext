"use client"

import { useState } from 'react'
import { createNewTemplate } from '@/utils/api'
import { useRouter } from 'next/navigation'

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { getCldVideoUrl } from 'next-cloudinary'

import { Input } from "@material-tailwind/react"

import SmallExerciseCard from '@/components/SmallExerciseCard'

  function SortableItem({ id, exercise, onEdit, onDelete }) {
	  const {
	    attributes,
	    listeners,
	    setNodeRef,
	    transform,
	    transition,
	  } = useSortable({ id });

	  const style = {
	    transform: CSS.Translate.toString(transform),
	    transition,
	  };

	  // Stop propagation to prevent the item from being dragged when the delete button is clicked
	  const handleDeleteClick = (e) => {
	    e.stopPropagation();
	    onDelete(id);
	  };

	  return (
	    <div ref={setNodeRef} style={style} className="flex items-center p-4 bg-gray-300 rounded shadow">
	      <div
	        {...listeners}
	        {...attributes}
	        className="p-2 mr-2 bg-gray-400 rounded cursor-grab"
	      >
	        :::
	      </div>
	      <div className="flex-1">
	        {exercise.name} - Sets: {exercise.sets}, Work: {exercise.work}
	      </div>
	      <button onClick={handleDeleteClick} className="ml-4 bg-blue-300 text-white p-1 rounded">delete</button>
	    </div>
	  );
	}

	function DraggableItem({ id, exercise, onEdit }) {
	  const {
	    attributes,
	    listeners,
	    setNodeRef,
	    transform,
	    transition,
	  } = useDraggable({ id });

	  const style = {
	    transform: CSS.Translate.toString(transform),
	    transition,
	  };

	  const url = getCldVideoUrl({
		  width: 200,
		  height: 180,
		  src: exercise.video,
		})

	  return (
	    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="flex items-center p-4 bg-gray-300 rounded shadow">
	      <div className="flex-1">
	        {exercise.name} - Sets: {exercise.sets}, Work: {exercise.work}
	        <img 
          src={url}
          alt={exercise.name}
          className="w-full h-full object-cover object-center"
        />
	      </div>
	      {/* Edit and delete buttons can be added here if needed */}
	    </div>
	  );
	}

	function EditModal({ isOpen, onClose, exercise, onSave }) {
	  if (!isOpen || !exercise) {
	    return null;
	  }

	  const [sets, setSets] = useState(exercise.sets);
	  const [work, setWork] = useState(exercise.work);

	  const handleSubmit = (e) => {
	    e.preventDefault();
	    onSave(exercise.id, sets, work);
	    onClose();
	  };

	  return (
	    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
	      <div className="bg-white p-4 rounded">
	        <h2 className="text-lg">Edit Exercise</h2>
	        <form onSubmit={handleSubmit}>
	          <label htmlFor="sets" className="block">Sets:</label>
	          <input
	            type="number"
	            id="sets"
	            value={sets}
	            onChange={(e) => setSets(Number(e.target.value))}
	            className="border p-1 w-full"
	          />
	          <label htmlFor="work" className="block mt-2">Work (Reps):</label>
	          <input
	            type="text"
	            id="work"
	            value={work}
	            onChange={(e) => setWork(e.target.value)}
	            className="border p-1 w-full"
	          />
	          <div className="mt-2">
	            <button type="submit" className="mr-2 bg-blue-500 text-white p-1 rounded">Save</button>
	            <button type="button" onClick={onClose} className="bg-gray-300 p-1 rounded">Cancel</button>
	          </div>
	        </form>
	      </div>
	    </div>
	  );
	}

const TemplateForm =  ( {exercises} ) => {
  const [exercisesToRender, setExercisesToRender] = useState(exercises) 
  const [query, setQuery] = useState("")
  const [programName, setProgramName] = useState("")
  const [templateExercises, setTemplateExercises] = useState([])
  const [templateName, setTemplateName] = useState("")

  // state from test dnd component
  const [warmUpExercises, setWarmUpExercises] = useState([
    { id: 'e1', name: 'Exercise 1', sets: 3, work: '10 reps' },
    { id: 'e2', name: 'Exercise 2', sets: 4, work: '15 reps' },
    { id: 'e3', name: 'Exercise 3', sets: 2, work: '5 reps' },
    { id: 'e4', name: 'Exercise 4', sets: 3, work: '12 reps' },
  ]);

  const [enduranceExercises, setEnduranceExercises] = useState([
    { id: 'e1e', name: 'Endurance Exercise 1', sets: 3, work: '10 reps' },
    { id: 'e2e', name: 'Endurance Exercise 2', sets: 4, work: '15 reps' },
    { id: 'e3e', name: 'Endurance Exercise 3', sets: 2, work: '5 reps' },
    { id: 'e4e', name: 'Endurance Exercise 4', sets: 3, work: '12 reps' },
  ]);

  const [sharedExercises, setSharedExercises] = useState([
	  { id: 'shared1', name: 'Shared Exercise 1', sets: '3', work: '10 reps' },
	  { id: 'shared2', name: 'Shared Exercise 2', sets: '4', work: '12 reps' },
	  // Add more shared exercises as needed
	]);

	const [isModalOpen, setModalOpen] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);

  // dnd logic

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  const handleEdit = (exercise) => {
    setCurrentExercise(exercise);
    setModalOpen(true);
  };

  const handleSave = (id, newSets, newWork) => {
    setExercises(exercises.map(ex =>
      ex.id === id ? { ...ex, sets: newSets, work: newWork } : ex
    ));
  };

  const deleteExercise = (id) => {
	  setWarmUpExercises(exercises => exercises.filter(exercise => exercise.id !== id));
	  setEnduranceExercises(enduranceExercises => enduranceExercises.filter(exercise => exercise.id !== id));
	};

  const onDragStart = (event) => {
	  const { active } = event;

	  // Look for the item in the exercises array
	  let item = exercises.find(ex => ex.id === active.id);
	  
	  // If not found in exercises, look in enduranceExercises
	  if (!item) {
	    item = enduranceExercises.find(ex => ex.id === active.id);
	  }

	  // If still not found, look in sharedExercises
	  if (!item) {
	    item = sharedExercises.find(ex => ex.id === active.id);
	  }

	  setDraggedItem(item);
	};

	const onDragEnd = (event) => {
  const { active, over } = event;

  if (!over || active.id === over.id) return;

  const activeContext = exercisesToRender.some(exercise => exercise.id === active.id) ? 'shared' : warmUpExercises.some(exercise => exercise.id === active.id) ? 'warmUpExercises' : 'enduranceExercises';
  const overContext = warmUpExercises.some(exercise => exercise.id === over.id) ? 'warmUpExercises' : enduranceExercises.some(exercise => exercise.id === over.id) ? 'enduranceExercises' : 'shared';

  // Moving from exercisesToRender to a sortable context without removing from exercisesToRender
  if (activeContext === 'shared' && overContext !== 'shared') {
    const activeItem = exercisesToRender.find(exercise => exercise.id === active.id);

    // No removal from exercisesToRender here

    // Add to the targeted context
    const addState = overContext === 'warmUpExercises' ? setWarmUpExercises : setEnduranceExercises;
    addState(prev => {
      const newIndex = prev.findIndex(exercise => exercise.id === over.id);
      return [...prev.slice(0, newIndex), activeItem, ...prev.slice(newIndex)];
    });
  } 
  // Reordering within the same context
  else if (overContext === activeContext) {
    const setState = overContext === 'warmUpExercises' ? setWarmUpExercises : setEnduranceExercises;
    setState(prev => {
      const oldIndex = prev.findIndex(exercise => exercise.id === active.id);
      const newIndex = prev.findIndex(exercise => exercise.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  } 
  // Moving between sortable contexts
  else if (activeContext !== 'shared' && overContext !== 'shared' && activeContext !== overContext) {
    const activeItem = activeContext === 'warmUpExercises' ? warmUpExercises.find(exercise => exercise.id === active.id) : enduranceExercises.find(exercise => exercise.id === active.id);

    // Remove from the original context
    const removeState = activeContext === 'warmUpExercises' ? setWarmUpExercises : setEnduranceExercises;
    removeState(prev => prev.filter(exercise => exercise.id !== active.id));

    // Add to the new context
    const addState = overContext === 'warmUpExercises' ? setWarmUpExercises : setEnduranceExercises;
    addState(prev => {
      const newIndex = prev.findIndex(exercise => exercise.id === over.id);
      return [...prev.slice(0, newIndex), activeItem, ...prev.slice(newIndex)];
    });
  }
  setDraggedItem(null);
};



	//logic from legacy template form
  const search = (exercises) => {
		return exercises.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
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
	  <div className="grid md:grid-cols-[auto_350px] sm:grid-cols-1">
	  	<DndContext id='template-context-id' sensors={sensors} collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={onDragEnd}>
		  	<div className="bg-red-100">
			  	<input className="bg-gray-100 rounded border-2 border-purple-500" placeholder="start typing..."onChange={ (e) => setQuery(e.target.value)}></input>
		      <button className="">Filter</button>
					<div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3">
					{search(exercisesToRender).map((exercise) => (
						<div className="max-w-[15rem]" key={exercise.id}>
   						<DraggableItem key={exercise.id} id={exercise.id} exercise={exercise} />
   					</div>
						// <div className="max-w-[15rem]"
						// 		 key={exercise.id}
						// 		 onClick={() => setTemplateExercises([...templateExercises, {id: exercise.id, name: exercise.name}])}
						// >
						// 		<SmallExerciseCard exercise={exercise} />
						// </div>
					))}
{/*				<p>pool</p>
				<div className="max-w-[15rem]">
				  {exercisesToRender.map(exercise => (
				  	<div className="max-w-[200px] overflow-hidden">
   						<DraggableItem key={exercise.id} id={exercise.id} exercise={exercise} />
   					</div>
				  ))}
				</div>*/}
					</div> 
				</div>
			  <div className="bg-green-100 border-l border-black/10">
		          <div className="px-4">
								New Template Form
		          </div>
			    <div className="h-[500px]cursor-pointer rounded-lg bg-white shadow">
			      <div className="px-4 py-5 sm:p-6">
			      <Input label="Template Name" onChange={ (e) => setTemplateName(e.target.value)}></Input>
			      <p>warm up</p>
	      <SortableContext items={warmUpExercises.map(exercise => exercise.id)} strategy={verticalListSortingStrategy}>
	        {warmUpExercises.map((exercise) => (
	          <SortableItem key={exercise.id} id={exercise.id} exercise={exercise} onEdit={handleEdit} onDelete={deleteExercise} />
	        ))}
	      </SortableContext>
	      <p>endurance</p>
	      <SortableContext items={enduranceExercises.map(exercise => exercise.id)} strategy={verticalListSortingStrategy}>
	        {enduranceExercises.map((exercise) => (
	          <SortableItem key={exercise.id} id={exercise.id} exercise={exercise} onEdit={handleEdit} onDelete={deleteExercise} />
	        ))}
	      </SortableContext>
			        <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl" onClick={handleTemplateSubmit}>new template</button>
			      </div>
			    </div>
		      </div>
		  </DndContext>
		  <DragOverlay>
			  {draggedItem ? <SortableItem exercise={draggedItem} id={draggedItem.id} /> : null}
			</DragOverlay>
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        exercise={currentExercise}
        onSave={handleSave}
      />
      <div className="whitespace-pre-wrap bg-gray-100 p-4 mt-5">
	      <strong>Current State:</strong>
	      <p>exercises to render</p>
	      {exercisesToRender.map((exercise, index) => (
	        <div key={index} className="mb-2">
	          {JSON.stringify(exercise, null, 2)}
	        </div>
	      ))}
	      <p>endurance</p>
	      {enduranceExercises.map((exercise, index) => (
	        <div key={index} className="mb-2">
	          {JSON.stringify(exercise, null, 2)}
	        </div>
	      ))}
	      <p>warm up</p>
	      {warmUpExercises.map((exercise, index) => (
	        <div key={index} className="mb-2">
	          {JSON.stringify(exercise, null, 2)}
	        </div>
	      ))}
	    </div>
    </div>
	)
}

export default TemplateForm