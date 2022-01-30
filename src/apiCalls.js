export const fetchData = () => {
  return fetch("https://frontend-take-home.fetchrewards.com/form")
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error ("Form data failed to fetch. Please refresh the page.")
      }
    })
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
}

