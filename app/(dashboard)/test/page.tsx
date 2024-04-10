'use client'

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id, exercise, onEdit }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  // This function prevents the modal from opening when the handle is clicked.
  const handleContentClick = (e) => {
    e.stopPropagation();
    onEdit(exercise);
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center p-4 bg-gray-300 rounded shadow">
      <div
        ref={setActivatorNodeRef}
        {...listeners}
        {...attributes}
        className="p-2 mr-2 bg-gray-400 rounded cursor-grab"
      >
        :::
      </div>
      <div onClick={handleContentClick} className="flex-1">
        {exercise.name} - Sets: {exercise.sets}, Work: {exercise.work}
      </div>
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

	const [isModalOpen, setModalOpen] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);

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

  const onDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setExercises((exercises) => {
        const oldIndex = exercises.findIndex(exercise => exercise.id === active.id);
        const newIndex = exercises.findIndex(exercise => exercise.id === over.id);
        return arrayMove(exercises, oldIndex, newIndex);
      });
    }
  };

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={exercises.map(exercise => exercise.id)} strategy={verticalListSortingStrategy}>
          {exercises.map((exercise) => (
            <SortableItem key={exercise.id} id={exercise.id} exercise={exercise} onEdit={handleEdit} />
          ))}
        </SortableContext>
      </DndContext>
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        exercise={currentExercise}
        onSave={handleSave}
      />
    </>
  );
}

export default VerticalDragAndDrop;


