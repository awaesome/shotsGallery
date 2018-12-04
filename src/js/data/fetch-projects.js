import proxiedFetch from 'proxied-fetch'

function getProjects(params) {
  const { queryString = "random", sort = "featured_date", time = "all", page = 1 } = params

  return proxiedFetch(`https://api.behance.net/v2/projects?
    q=${queryString}&
    sort=${sort}&
    time=${time}&
    page=${page}&
    client_id=GrKmy2bSjvIkRhYxKWxcsqy1Msfe3Lmb`)
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      throw new Error('Network response was not ok.')
    })
    .then(data => data.projects)
}

export { getProjects }