function getProject(id) {

  return fetch(`http://www.behance.net/v2/projects/${id}?api_key=GrKmy2bSjvIkRhYxKWxcsqy1Msfe3Lmb`)
    .then(res => {
      if (res.ok) {
        console.log(res.status)
        return res.json()
      }
      throw new Error('Network response was not ok.')
    })
    .then(data => data.project)
}

export { getProject }