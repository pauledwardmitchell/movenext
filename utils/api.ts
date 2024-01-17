const createURL = (path) => window.location.origin + path

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