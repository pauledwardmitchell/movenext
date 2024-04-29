const createURL = (path) => window.location.origin + path

export const createNewAssignment = async ( userData ) => {
  const res = await fetch(
    new Request(createURL('/api/assignment'), {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

export const createNewTemplate = async ( data ) => {
  const res = await fetch(
    new Request(createURL('/api/template'), {
      method: 'POST',
      body: JSON.stringify(data),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

export const updateTemplate = async ( id, templateData ) => {
  const res = await fetch(
    new Request(createURL(`/api/template/${id}`), {
      method: 'PATCH',
      body: JSON.stringify(templateData),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

export const deleteTemplate = async (id) => {
  const res = await fetch(
    new Request(createURL(`/api/template/${id}`), {
      method: 'DELETE',
    })
  );

  if (res.ok) {
    return res.json();  // Optionally process the response, depends on API
  } else {
    throw new Error('Failed to delete the template.');
  }
}


export const createNewExercise = async ( exerciseData ) => {
  const res = await fetch(
    new Request(createURL('/api/exercise'), {
      method: 'POST',
      body: JSON.stringify(exerciseData),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

export const updateExercise = async ( id, exerciseData ) => {
  const res = await fetch(
    new Request(createURL(`/api/exercise/${id}`), {
      method: 'PATCH',
      body: JSON.stringify(exerciseData),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

export const deleteExercise = async (id) => {
  const res = await fetch(
    new Request(createURL(`/api/exercise/${id}`), {
      method: 'DELETE',
    })
  );

  if (res.ok) {
    return res.json();  // Optionally process the response, depends on API
  } else {
    throw new Error('Failed to delete the exercise.');
  }
}