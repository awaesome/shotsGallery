function getFields() {
  return fetch(`https://api.behance.net/v2/fields?
    client_id=GrKmy2bSjvIkRhYxKWxcsqy1Msfe3Lmb`)
    .then(res => {
      if (res.ok) {
        console.log(res.status)
        return res.json()
      }
      throw new Error('Network response was not ok.')
    })
    .then(data => data)
}

export { getFields }