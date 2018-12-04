import proxiedFetch from 'proxied-fetch'

function getProject(id) {

  return proxiedFetch(`https://www.behance.net/v2/projects/${id}?api_key=GrKmy2bSjvIkRhYxKWxcsqy1Msfe3Lmb`)
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      throw new Error('Network response was not ok.')
    })
    .then(data => data.project)
}

export { getProject }