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

  function SortableItem({ id, exercise, section, onEdit, onDelete }) {
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

	  // Handle opening the edit modal
	  const handleEditClick = (e) => {
	    e.stopPropagation();
	    onEdit(exercise); // Pass the exercise to the edit handler
	  };

	  return (
    <div ref={setNodeRef} style={style} className="flex items-center p-4 bg-gray-300 rounded shadow mb-2">
      <div
        {...listeners}
        {...attributes}
        className="p-2 mr-2 bg-gray-400 rounded cursor-grab"
      >
        :::
      </div>
      <div className="flex-1">
        <div className="font-bold text-lg mb-1 cursor-pointer" onClick={handleEditClick}>{exercise.name}</div>
        <div className="text-sm">{exercise.work}</div>
      </div>
    	<button onClick={handleDeleteClick} className="text-black border border-black p-1 rounded-full hover:bg-red-300 hover:text-black transition duration-150">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
        </svg>
      </button>
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
	    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="flex items-center bg-white rounded-lg">
	      <div className="flex-1">
	        <img 
	          src={url}
	          alt={exercise.name}
	          className="w-full h-full object-cover object-center m-0 rounded-t-lg"
	        />
	        <div className="text-bold text-black text-sm p-2">{exercise.name}</div>
	      </div>
	    </div>
	  );
	}

	function SectionEditModal({ isOpen, onClose, section, onSave }) {
	  const [name, setName] = useState(section.name);
	  const [sets, setSets] = useState(section.sets);
	  // const [restBeweenExercises] = useState(section.restBetweenExercises);
	  const [restBetweenSets, setRestBetweenSets] = useState(section.restBetweenSets);
	  const [restAfterSuperset, setRestAfterSuperset] = useState(section.restAfterSuperset);

	  const handleSubmit = (e) => {
	    e.preventDefault();
	    onSave(section.id, {
	      ...section,
	      name,
	      sets,
	      restBetweenSets,
	      restAfterSuperset
	    });
	    onClose();
	  };

	  if (!isOpen) return null;

	  return (
	    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
	      <div className="bg-white p-4 rounded">
	        <h2 className="text-lg">Edit Section</h2>
	        <form onSubmit={handleSubmit}>
	          <label htmlFor="name" className="block">Name:</label>
	          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="border p-1 w-full" />
	          
	          <label htmlFor="sets" className="block mt-2">Sets:</label>
	          <input type="number" id="sets" value={sets} onChange={(e) => setSets(e.target.value)} className="border p-1 w-full" />
{/*
	          <label htmlFor="restBetweenExercises" className="block mt-2">Rest Between Exercises (seconds):</label>
	          <input type="number" id="restBetweenExercises" value={restBetweenExercises} onChange={(e) => setRestBetweenExercises(e.target.value)} className="border p-1 w-full" />
*/}
	          <label htmlFor="restBetweenSets" className="block mt-2">Rest Between Sets (seconds):</label>
	          <input type="number" id="restBetweenSets" value={restBetweenSets} onChange={(e) => setRestBetweenSets(e.target.value)} className="border p-1 w-full" />

	          <label htmlFor="restAfterSuperset" className="block mt-2">Rest After Superset (seconds):</label>
	          <input type="number" id="restAfterSuperset" value={restAfterSuperset} onChange={(e) => setRestAfterSuperset(e.target.value)} className="border p-1 w-full" />

	          <div className="mt-2">
	            <button type="submit" className="bg-blue-500 text-white p-1 rounded mr-2">Save</button>
	            <button type="button" onClick={onClose} className="bg-gray-300 p-1 rounded">Cancel</button>
	          </div>
	        </form>
	      </div>
	    </div>
	  );
	}

	function EditModal({ isOpen, onClose, exercise, onSave }) {
    	const [work, setWork] = useState(exercise.work);

	    const handleSubmit = (e) => {
	        e.preventDefault();
	        onSave(exercise.id, work);
	        onClose();
	    };

	    if (!isOpen || !exercise) return null;

	    return (
	        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
	            <div className="bg-white p-4 rounded">
	                <h2 className="text-lg">Edit Exercise</h2>
	                <form onSubmit={handleSubmit}>
	                    <label htmlFor="work" className="block mt-2">Work:</label>
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

const TemplateForm =  ( { exercises, initialTemplate } ) => {
  const [exercisesToRender, setExercisesToRender] = useState(exercises) 
  const [query, setQuery] = useState("")
  const [templateName, setTemplateName] = useState(initialTemplate?.name || "");

  const [currentExercise, setCurrentExercise] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);

  const [sections, setSections] = useState(initialTemplate?.sections || [
    { id: 'section1', name: 'Warm-Up', sets: 3, restBetweenSets: 30, restAfterSuperset: 30, exercises: [{ id: 'e1', name: 'Placeholder', sets: 3, work: '10 reps' }] },
    { id: 'section2', name: 'Strength', sets: 3, restBetweenSets: 30, restAfterSuperset: 30, exercises: [{ id: 'e2', name: 'Placeholder', sets: 3, work: '10 reps' }] },
    { id: 'section3', name: 'Cardio', sets: 3, restBetweenSets: 30, restAfterSuperset: 30, exercises: [{ id: 'e3', name: 'Placeholder', sets: 3, work: '10 reps' }] },
    { id: 'section4', name: 'Cooldown', sets: 3, restBetweenSets: 30, restAfterSuperset: 30, exercises: [{ id: 'e4', name: 'Placeholder', sets: 3, work: '10 reps' }] },
    { id: 'section5', name: 'Flexibility', sets: 3, restBetweenSets: 30, restAfterSuperset: 30, exercises: [{ id: 'e5', name: 'Placeholder', sets: 3, work: '10 reps' }] }
  ]);

  const [selectedSection, setSelectedSection] = useState(null);

  const openSectionEditModal = (section) => {
    setSelectedSection(section);
  };

  const closeSectionEditModal = () => {
    setSelectedSection(null);
  };

  const closeEditModal = () => {
  	setCurrentExercise(null)
  }

	const saveSectionDetails = (sectionId, updatedSection) => {
	  setSections(sections.map(section => section.id === sectionId ? updatedSection : section));
	};

  const handleDeleteSection = (sectionId) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };

  const handleRenameSection = (sectionId, newName) => {
    setSections(sections.map(section =>
      section.id === sectionId ? { ...section, name: newName } : section
    ));
  };

  const openExerciseEditModal = (exercise) => {
  	setCurrentExercise(exercise)
  }

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  const handleEdit = (exercise) => {
    setCurrentExercise(exercise);
  };

	const handleSave = (exerciseId, newWork) => {
	    setSections(currentSections => {
	        return currentSections.map(section => {
	            return {
	                ...section,
	                exercises: section.exercises.map(exercise => {
	                    if (exercise.id === exerciseId) {
	                        return { ...exercise, work: newWork };
	                    }
	                    return exercise;
	                })
	            };
	        });
	    });
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
	  
	  // If still not found, look in sharedExercises
	  if (!item) {
	    item = exercisesToRender.find(ex => ex.id === active.id);
	  }

	  setDraggedItem(item);
	};

const onDragEnd = (event) => {
  const { active, over } = event;

  if (!over) {
    setDraggedItem(null);
    return; // Exit if there is no drop target
  }

  // Find the index of the section that the dragged item originally belonged to
  const originIndex = sections.findIndex(section =>
    section.exercises.some(ex => ex.id === active.id)
  )

  // Attempt to find the index of the section based on the drop target's ID
  let destinationIndex = sections.findIndex(section =>
    section.exercises.some(ex => ex.id === over.id)
  )

  if (destinationIndex === -1) {
  	setDraggedItem(null);
    return; // Exit if dropped outside of SortableContexts
  }

	if (destinationIndex !== -1) {
    const newSections = [...sections];
    let item;

    if (originIndex === -1) {
      // Handle new item dropped from outside the list
      item = {
        id: `${draggedItem.id}-${sections[destinationIndex].id}`,
        name: draggedItem.name,
        video: draggedItem.video,
        sets: draggedItem.sets || 3,
        work: draggedItem.work || '10 reps'
      };
      newSections[destinationIndex].exercises.push(item);

    //Replace placeholder with the first exercise dropped in a given section
    const placeholderIndex = newSections[destinationIndex].exercises.findIndex(ex => ex.name === "Placeholder");
	    if (placeholderIndex !== -1 && item.name !== "Placeholder") {
	      newSections[destinationIndex].exercises.splice(placeholderIndex, 1);
	    }

    } else if ( originIndex !== destinationIndex ) {
      // Handle item moved across sections
      item = {...newSections[originIndex].exercises.find(ex => ex.id === active.id)};

      // Take dragged item out of origin section
			newSections[originIndex].exercises = newSections[originIndex].exercises.filter(ex => {
			    return ex.id !== active.id;
			});
			
			// Put dragged item in the section where it has been dropped
			newSections[destinationIndex].exercises = [...newSections[destinationIndex].exercises, item];  //issue is here (adding it twice - why?)
	
    } else if (originIndex === destinationIndex) { 
    	//rearranging exercises within the same SortableContext
    	item = {...newSections[originIndex].exercises.find(ex => ex.id === active.id)};
      const originItems = newSections[originIndex].exercises;
      const oldIndex = originItems.findIndex(i => i.id === item.id);
      const newIndex = originItems.findIndex(i => i.id === over.id);
      newSections[originIndex].exercises = arrayMove(originItems, oldIndex, newIndex);
    }

    // Update the state with the new sections array
    setSections(newSections);
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
    sections: sections
  }

  const moveSectionUp = (index) => {
    if (index > 0) {
      const newSections = [...sections];
      [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
      setSections(newSections);
    }
  };

  // Function to move a section down in the list
  const moveSectionDown = (index) => {
    if (index < sections.length - 1) {
      const newSections = [...sections];
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
      setSections(newSections);
    }
  };

  const addSection = () => {
    const newSection = {
      id: `section${sections.length + 1}`,  // Ensure unique ID
      name: 'New Section',  // Default section name
      sets: 3,
      restBetweenSets: 30,
      restAfterSuperset: 30,
      exercises: [{ id: `exercise${sections.length + 1}`, name: 'Placeholder', sets: 3, work: '10 reps' }]
    };
    setSections([...sections, newSection]);
  };

  const handleTemplateSubmit = async () => {
    const { data } = await createNewTemplate( templateData )
    router.push(`/template/${data.id}`)
  }

	return (
	  <div className="grid md:grid-cols-[auto_450px] sm:grid-cols-1">
	  	<DndContext id='template-context-id' sensors={sensors} collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={onDragEnd}>
		  	<div className="bg-gray-100">
		  		<div className="m-7 w-90">
			  	<Input label="Search for an exercise" size="lg" onChange={ (e) => setQuery(e.target.value)} className=""/>
					</div>
					<div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3 mx-7 mt-4">
					{search(exercisesToRender).map((exercise) => (
						<div className="max-w-[15rem]" key={exercise.id}>
   						<DraggableItem key={exercise.id} id={exercise.id} exercise={exercise} />
   					</div>
					))}
					</div> 
				</div>
			  <div className="">
			    <div className="h-[500px]cursor-pointer bg-gray-100 shadow">
			    	<div className="px-4 pt-4 text-lg">
							Create a Workout Program:
		        </div>
			      <div className="px-4 py-4 sm:p-6 space-y-3">
			      <Input label="Template Name" onChange={ (e) => setTemplateName(e.target.value)} className="mb-4"></Input>
						<div>
						  {sections.map((section, index) => (
						    <div key={section.id} data-id={section.id} className="p-4 border rounded-lg shadow-sm bg-[#606C82] mb-2">
						      <div className="flex justify-between items-center mb-4">
						              <div className="flex items-center flex-1">
						                <span onClick={() => openSectionEditModal(section)} className="cursor-pointer text-white font-bold hover:text-blue-800">
						                  {section.name}
						                </span>
						                <button onClick={() => moveSectionUp(index)} className="ml-2">
						                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
						                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
						                  </svg>
						                </button>
						                <button onClick={() => moveSectionDown(index)} className="ml-2">
						                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
						                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
						                  </svg>
						                </button>
						              </div>
						        <button onClick={() => handleDeleteSection(section.id)} className="text-white border border-white p-1 rounded-full hover:bg-red-300 hover:text-white transition duration-150">
						          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
						            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
						          </svg>
						        </button>
						      </div>
						      <div className="text-sm mb-2 text-white">
						        Superset | {section.sets} sets | {section.restBetweenSets} seconds rest after each set
						      </div>
						      <SortableContext className="min-h-full min-w-full bg-red-300" items={section.exercises.map(ex => ex.id)} strategy={verticalListSortingStrategy}>
						        {section.exercises.length > 0 ? (
						          section.exercises.map(exercise => (
						            <SortableItem key={exercise.id} id={exercise.id} exercise={exercise} section={section} onEdit={handleEdit} onDelete={deleteExercise} />
						          ))
						        ) : (
						          <div className="p-4 text-center text-gray-500">Drag Items Here</div>
						        )}
						      </SortableContext>
						      <div className="text-sm text-white">
						        Rest after Superset: {section.restAfterSuperset} seconds
						      </div>
						    </div>
						  ))}
						</div>
	      <button className="bg-[#606C82] px-4 py-2 rounded-lg text-white text-xl mt-4" onClick={handleTemplateSubmit}>Create Workout</button>
				<button className="bg-white ml-2 px-4 py-2 rounded-lg text-[#606C82] border border-[#606C82] text-xl mt-4" onClick={addSection}>Add New Section</button>

			      </div>
			    </div>
		      </div>
		  </DndContext>			
			{currentExercise && (
				<EditModal
			    isOpen={!!currentExercise}
			    onClose={closeEditModal}
			    exercise={currentExercise}
			    onSave={handleSave}
				/>
			)}
      {selectedSection && (
        <SectionEditModal
          isOpen={!!selectedSection}
          onClose={closeSectionEditModal}
          section={selectedSection}
          onSave={saveSectionDetails}
        />
      )}
{/*      <div className="whitespace-pre-wrap bg-gray-100 p-4 mt-5">
	      <strong>Current State:</strong>
	      <p>dynamic sections</p>
	      {sections.map((section, index) => (
	        <div key={index} className="mb-2">
	          {JSON.stringify(section, null, 2)}
	        </div>
	      ))}
	    </div>*/}
    </div>
	)
}

export default TemplateForm