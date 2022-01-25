export const fetchData = (url) => {
  return fetch(url)
    .then(response => {
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
  )
}