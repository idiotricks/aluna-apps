const HelperError = (error) => {
  let message = ''

  if (error) {
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.detail) {
          message = error.response.data.detail
        }
      }
    }
  }

  alert(message)
}

export default HelperError
