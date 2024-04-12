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
	    e.stopPropagation(); // Prevent the drag event from firing
	    onDelete(exercise.id); // Call the delete function with the exercise id
	  };

	  return (
	    <div ref={setNodeRef} style={style} className="flex items-center p-4 bg-gray-300 rounded shadow m-2">
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
	        <img 
          src={url}
          alt={exercise.name}
          className="w-full h-full object-cover object-center"
        />
       	{exercise.name}
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
    { id: 'e1', name: 'Placeholder', sets: 3, work: '10 reps' },
  ]);

  const [enduranceExercises, setEnduranceExercises] = useState([
    { id: 'e1e', name: 'Placeholder', sets: 3, work: '10 reps' },
  ]);

	const [isModalOpen, setModalOpen] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);

  //dynamic sections logic
  // Initial state with five default sections
  const [sections, setSections] = useState([
    { id: 'start', name: 'Start', exercises: [{ id: 'e1', name: 'Placeholder', sets: 3, work: '10 reps' }] },
    { id: 'strength', name: 'Strength', exercises: [{ id: 'e2', name: 'Placeholder', sets: 3, work: '10 reps' }] },
    { id: 'cardio', name: 'Cardio', exercises: [{ id: 'e3', name: 'Placeholder', sets: 3, work: '10 reps' }] },
    { id: 'cooldown', name: 'Cooldown', exercises: [{ id: 'e4', name: 'Placeholder', sets: 3, work: '10 reps' }] },
    { id: 'flexibility', name: 'Flexibility', exercises: [{ id: 'e5', name: 'Placeholder', sets: 3, work: '10 reps' }] },
  ]);

  const handleDeleteSection = (sectionId) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };

  const handleRenameSection = (sectionId, newName) => {
    setSections(sections.map(section =>
      section.id === sectionId ? { ...section, name: newName } : section
    ));
  };

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

	const deleteExercise = (exerciseId) => {
	  // Find which section contains the exercise to be deleted
	  const sectionIndex = sections.findIndex(section => 
	    section.exercises.some(ex => ex.id === exerciseId)
	  );

	  if (sectionIndex !== -1) {
	    // Filter out the exercise from the found section
	    const updatedExercises = sections[sectionIndex].exercises.filter(ex => ex.id !== exerciseId);

	    // Update the section with the new exercises array
	    const updatedSections = sections.map((section, idx) => {
	      if (idx === sectionIndex) {
	        return { ...section, exercises: updatedExercises };
	      }
	      return section;
	    });

	    // Update the state with the new sections array
	    setSections(updatedSections);
	  }
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
	    item = exercisesToRender.find(ex => ex.id === active.id);
	  }

	  setDraggedItem(item);
	};

	// const onDragEnd = (event) => {
	//   const { active, over } = event;

	//   if (!over || active.id === over.id) return;

	//   const activeContext = exercisesToRender.some(exercise => exercise.id === active.id) ? 'shared' : warmUpExercises.some(exercise => exercise.id === active.id) ? 'warmUpExercises' : 'enduranceExercises';
	//   const overContext = warmUpExercises.some(exercise => exercise.id === over.id) ? 'warmUpExercises' : enduranceExercises.some(exercise => exercise.id === over.id) ? 'enduranceExercises' : 'shared';

	//   // Moving from exercisesToRender to a sortable context without removing from exercisesToRender
	//   if (activeContext === 'shared' && overContext !== 'shared') {
	//     const activeItem = exercisesToRender.find(exercise => exercise.id === active.id);
	//     // Create a new ID that combines the original ID with the new context
	//     const newId = `${activeItem.id}-${overContext}`;
	//     const newItem = { ...activeItem, id: newId };

	//     const addState = overContext === 'warmUpExercises' ? setWarmUpExercises : setEnduranceExercises;
	//     addState(prev => {
	//       const newIndex = prev.findIndex(exercise => exercise.id === over.id);
	//       return [...prev.slice(0, newIndex), newItem, ...prev.slice(newIndex)];
	//     });
	//   } 
	//   // Reordering within the same context
	//   else if (overContext === activeContext) {
	//     const setState = overContext === 'warmUpExercises' ? setWarmUpExercises : setEnduranceExercises;
	//     setState(prev => {
	//       const oldIndex = prev.findIndex(exercise => exercise.id === active.id);
	//       const newIndex = prev.findIndex(exercise => exercise.id === over.id);
	//       return arrayMove(prev, oldIndex, newIndex);
	//     });
	//   } 
	//   // Moving between sortable contexts
	//   else if (activeContext !== 'shared' && overContext !== 'shared' && activeContext !== overContext) {
	//     const activeItem = activeContext === 'warmUpExercises' ? warmUpExercises.find(exercise => exercise.id === active.id) : enduranceExercises.find(exercise => exercise.id === active.id);

	//     // Remove from the original context
	//     const removeState = activeContext === 'warmUpExercises' ? setWarmUpExercises : setEnduranceExercises;
	//     removeState(prev => prev.filter(exercise => exercise.id !== active.id));

	//     // Add to the new context
	//     const addState = overContext === 'warmUpExercises' ? setWarmUpExercises : setEnduranceExercises;
	//     addState(prev => {
	//       const newIndex = prev.findIndex(exercise => exercise.id === over.id);
	//       return [...prev.slice(0, newIndex), activeItem, ...prev.slice(newIndex)];
	//     });
	//   }
	//   setDraggedItem(null);
	// };

const onDragEnd = (event) => {
  const { active, over } = event;

  if (!over) {
    setDraggedItem(null);
    return; // Exit if there is no drop target
  }

  // Find the index of the section that the dragged item originally belonged to
  const originIndex = sections.findIndex(section =>
    section.exercises.some(ex => ex.id === active.id)
  );

  // Attempt to find the index of the section based on the drop target's ID
  let destinationIndex = sections.findIndex(section =>
    section.exercises.some(ex => ex.id === over.id)
  );

  // If no direct item match, check if dropped on a section without an item
  if (destinationIndex === -1) {
    // Look for a section element that matches the `over.id`
    destinationIndex = sections.findIndex(section => section.id === over.id);

    // If still not found, check if the drop was inside a section container
    if (destinationIndex === -1) {
      const overElement = document.getElementById(over.id);
      const sectionElements = document.querySelectorAll('[data-section-id]');
      sectionElements.forEach((sectionElement, idx) => {
        if (sectionElement.contains(overElement)) {
          destinationIndex = idx;
        }
      });
    }
  }

  if (destinationIndex !== -1) {
    // Prepare the item for addition to the destination section
    const item = originIndex !== -1 ? {...sections[originIndex].exercises.find(ex => ex.id === active.id)} :
      {
        id: `${draggedItem.id}-${sections[destinationIndex].id}`, // Generate a unique ID for new items
        name: draggedItem.name, // Assuming draggedItem holds the required information
        sets: draggedItem.sets || 3,
        work: draggedItem.work || '10 reps'
      };

    // Remove the item from its original section, if applicable
    if (originIndex !== -1) {
      sections[originIndex].exercises = sections[originIndex].exercises.filter(ex => ex.id !== active.id);
    }

    // Add the item to the destination section
    sections[destinationIndex].exercises.push(item);

    // Update the state immutably to trigger re-render
    setSections(sections.map((section, idx) => {
      if (idx === originIndex || idx === destinationIndex) {
        return {...section, exercises: [...section.exercises]};
      }
      return section;
    }));
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
					))}
					</div> 
				</div>
			  <div className="bg-green-100 border-l border-black/10">

			    <div className="h-[500px]cursor-pointer rounded-lg bg-white shadow">
			    	<div className="px-4 py-4">
							Create a Workout Program:
		        </div>
			      <div className="px-4 py-5 sm:p-6 space-y-4">
			      <Input label="Template Name" onChange={ (e) => setTemplateName(e.target.value)} className="mb-4"></Input>
			      <div>
			      	{sections.map((section, index) => (
			          <div key={section.id} data-id={section.id} className="p-1 border rounded-lg shadow-sm bg-gray-50 mb-2">
			            <div flex items-center justify-between mb-4>
				            <input
				              type="text"
				              value={section.name}
				              onChange={(e) => handleRenameSection(section.id, e.target.value)}
				              className="border p-1 rounded-lg flex-1 mr-2"
				            />
				            <button onClick={() => handleDeleteSection(section.id)}>Delete Section</button>
			            </div>
			            <SortableContext items={section.exercises.map(ex => ex.id)} strategy={verticalListSortingStrategy}>
			              {section.exercises.length > 0 ? (
			                section.exercises.map(exercise => (
			                  <SortableItem key={exercise.id} id={exercise.id} exercise={exercise} onEdit={handleEdit} onDelete={deleteExercise} />
			                ))
			              ) : (
			                <div className="p-4 text-center text-gray-500">Drag Items Here</div>
			              )}
			            </SortableContext>
			          </div>
			        ))}
			      </div>
			        <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl mt-4" onClick={handleTemplateSubmit}>new template</button>
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
	      <p>dynamic sections</p>
	      {sections.map((section, index) => (
	        <div key={index} className="mb-2">
	          {JSON.stringify(section, null, 2)}
	        </div>
	      ))}
	      <p>warm up</p>
	      {warmUpExercises.map((exercise, index) => (
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
	    </div>
    </div>
	)
}

export default TemplateForm