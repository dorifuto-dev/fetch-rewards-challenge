export const fetchData = () => {
  return fetch("https://frontend-take-home.fetchrewards.com/form")
    .then(response => checkRequestForError(response))
}

export const postData = (userObject) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify(userObject)
  }
  return fetch("https://frontend-take-home.fetchrewards.com/form", requestOptions)
    .then(response => {
      if (response.ok) {
        throw new Error ("Successfully signed up. Welcome to Fetch Rewards!")
      } else {
        throw new Error("Something went wrong. Please try submitting the form again.")
      }
    })
}

const checkRequestForError = (response) => {
  if (response.ok) {
    return response.json()
  } else if (response.status === 404) {
    throw new Error('404 Error - Page not found. Please go back and try again.')
  } else if (response.status === 500) {
    throw new Error('500 Error - Encountered server error. Please try again later.')
  } else {
    throw new Error('Other Error - Something went wrong.')
  }
}

