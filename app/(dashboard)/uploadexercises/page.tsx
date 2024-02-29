"use client"

import { useEffect, useState } from 'react'
import { createNewExercise } from '@/utils/api'

import Papa from 'papaparse'

const UploadExercises = () => {
  const [exercisesToUpload, setExercisesToUpload] = useState([])
  const [message, setMessage] = useState('');
  const [createdExercises, setConfirmedExercises] = useState([])
  const [isError, setIsError] = useState(false);

  const handleUpload = () => {
    for (let i = 0; i < exercisesToUpload.length; i++) {
      singleExerciseRequest(exercisesToUpload[i])
    }  
    setExercisesToUpload([])
  }

  const singleExerciseRequest = async ( exerciseData ) => {
    const { data } = await createNewExercise( exerciseData )

    if (data.name) {
      setConfirmedExercises(prevExercises => [...prevExercises, data.name])
    } else {
      setMessage(result.error || 'An error occurred during the upload.');
      setIsError(true);
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      skipEmptyLines: true,
      header: true,
      complete: (results) => {
        setExercisesToUpload(results.data)
      }
    });
  };

  const renderCreatedExercisesList = () => {
    if (createdExercises.length > 0) {
      return (
        createdExercises.map(exercise => (
          <p key={exercise}>An exercise named "{exercise}" was created.</p>))
      )
    } else {
      return (<div></div>)
    }
  }

  return (
    <div>
      <h1>Upload Exercises CSV</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {message && (
        <p style={{ color: isError ? 'red' : 'green' }}>{message}</p>
      )}
      <pre>{JSON.stringify(exercisesToUpload, null, 2)}</pre>
      <p>{exercisesToUpload.length} exercises set to upload!</p>
      <button className="border border-black text-black rounded px-2 py-2 bg-transparent hover:bg-black hover:text-white transition duration-150 ease-in-out" onClick={handleUpload}>upload those bad boys</button>
      {renderCreatedExercisesList()}
    </div>
  );
}

export default UploadExercises
