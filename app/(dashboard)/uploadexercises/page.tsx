"use client"

import { useState } from 'react'
import { createNewExercise } from '@/utils/api'

import Papa from 'papaparse'

const UploadExercises = () => {
  const [exercisesToUpload, setExercisesToUpload] = useState([])
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleUpload = () => {
    for (let i = 0; i < exercisesToUpload.length; i++) {
      singleExerciseRequest(exercisesToUpload[i])
      //somehow error handle 
    }  
  }

  const singleExerciseRequest = async ( exerciseData ) => {
    const { data } = await createNewExercise( exerciseData )
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // console.log("uploaded file: ", file)

    // let parsedStuff = {}
    Papa.parse(file, {
      skipEmptyLines: true,
      header: true,
      complete: (results) => {
        console.log("Finished:", results.data);
        setExercisesToUpload(results.data)
        // parsedStuff = results.data
        console.log("in state: ", exercisesToUpload)
        //   try {
        //   const response = await fetch('/api/upload', {
        //     method: 'POST',
        //     body: results.data,
        //   });

        //   const result = await response.json();

        //   if (response.ok) {
        //     setMessage(result.message);
        //     setIsError(false);
        //   } else {
        //     setMessage(result.error || 'An error occurred during the upload.');
        //     setIsError(true);
        //   }
        // } catch (error) {
        //   setMessage('An error occurred during the upload.');
        //   setIsError(true);
        // }

      }

    });


    // const formData = new FormData();
    // formData.append('file', file);
    // console.log("formData log: ", formData)

    // try {
    //   const response = await fetch('/api/upload', {
    //     method: 'POST',
    //     body: formData,
    //   });

    //   const result = await response.json();

    //   if (response.ok) {
    //     setMessage(result.message);
    //     setIsError(false);
    //   } else {
    //     setMessage(result.error || 'An error occurred during the upload.');
    //     setIsError(true);
    //   }
    // } catch (error) {
    //   setMessage('An error occurred during the upload.');
    //   setIsError(true);
    // }
  };

  return (
    <div>
      <h1>Upload Exercises CSV</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {message && (
        <p style={{ color: isError ? 'red' : 'green' }}>{message}</p>
      )}
      <pre>{JSON.stringify(exercisesToUpload, null, 2)}</pre>
      <span>{exercisesToUpload.length}</span>
      <button onClick={handleUpload}>upload those bad boys</button>
    </div>
  );
}

export default UploadExercises
