'use client'

import { useState } from 'react';
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

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="flex items-center p-4 bg-gray-300 rounded shadow">
      <div className="flex-1">
        {exercise.name} - Sets: {exercise.sets}, Work: {exercise.work}
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


function VerticalDragAndDrop() {
  const [exercises, setExercises] = useState([
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
	  setExercises(exercises => exercises.filter(exercise => exercise.id !== id));
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

  const activeContext = sharedExercises.some(exercise => exercise.id === active.id) ? 'shared' : exercises.some(exercise => exercise.id === active.id) ? 'exercises' : 'enduranceExercises';
  const overContext = exercises.some(exercise => exercise.id === over.id) ? 'exercises' : enduranceExercises.some(exercise => exercise.id === over.id) ? 'enduranceExercises' : 'shared';

  // Moving from shared to a sortable context
  if (activeContext === 'shared' && overContext !== 'shared') {
    const activeItem = sharedExercises.find(exercise => exercise.id === active.id);
    setSharedExercises(prev => prev.filter(exercise => exercise.id !== active.id));

    const addState = overContext === 'exercises' ? setExercises : setEnduranceExercises;
    addState(prev => {
      const newIndex = prev.findIndex(exercise => exercise.id === over.id);
      return [...prev.slice(0, newIndex), activeItem, ...prev.slice(newIndex)];
    });
  } 
  // Reordering within the same context
  else if (overContext === activeContext) {
    const setState = overContext === 'exercises' ? setExercises : setEnduranceExercises;
    setState(prev => {
      const oldIndex = prev.findIndex(exercise => exercise.id === active.id);
      const newIndex = prev.findIndex(exercise => exercise.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  } 
  // Moving between sortable contexts
  else if (activeContext !== 'shared' && overContext !== 'shared' && activeContext !== overContext) {
    const activeItem = activeContext === 'exercises' ? exercises.find(exercise => exercise.id === active.id) : enduranceExercises.find(exercise => exercise.id === active.id);

    // Remove from the original context
    const removeState = activeContext === 'exercises' ? setExercises : setEnduranceExercises;
    removeState(prev => prev.filter(exercise => exercise.id !== active.id));

    // Add to the new context
    const addState = overContext === 'exercises' ? setExercises : setEnduranceExercises;
    addState(prev => {
      const newIndex = prev.findIndex(exercise => exercise.id === over.id);
      return [...prev.slice(0, newIndex), activeItem, ...prev.slice(newIndex)];
    });
  }
  setDraggedItem(null);
};

  return (
    <>
      <DndContext id='unique-context-id' sensors={sensors} collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={onDragEnd}>
	      <p>warm up</p>
	      <SortableContext items={exercises.map(exercise => exercise.id)} strategy={verticalListSortingStrategy}>
	        {exercises.map((exercise) => (
	          <SortableItem key={exercise.id} id={exercise.id} exercise={exercise} onEdit={handleEdit} onDelete={deleteExercise} />
	        ))}
	      </SortableContext>
	      <p>endurance</p>
	      <SortableContext items={enduranceExercises.map(exercise => exercise.id)} strategy={verticalListSortingStrategy}>
	        {enduranceExercises.map((exercise) => (
	          <SortableItem key={exercise.id} id={exercise.id} exercise={exercise} onEdit={handleEdit} onDelete={deleteExercise} />
	        ))}
	      </SortableContext>
	      <p>pool</p>
				<div>
				  {sharedExercises.map(exercise => (
   					<DraggableItem key={exercise.id} id={exercise.id} exercise={exercise} />
				  ))}
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
	      <p>exercises</p>
	      {exercises.map((exercise, index) => (
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
	      <p>shared</p>
	      {sharedExercises.map((exercise, index) => (
	        <div key={index} className="mb-2">
	          {JSON.stringify(exercise, null, 2)}
	        </div>
	      ))}
	    </div>
    </>
  );
}

export default VerticalDragAndDrop;


