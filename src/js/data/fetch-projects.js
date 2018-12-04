function getProjects(params) {
  const { queryString = "random", sort = "featured_date", time = "all", page = 1 } = params

  return fetch(`https://api.behance.net/v2/projects?
    q=${queryString}&
    sort=${sort}&
    time=${time}&
    page=${page}&
    client_id=GrKmy2bSjvIkRhYxKWxcsqy1Msfe3Lmb`, {
      mode: 'no-cors',
      header: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(res => {
      if (res.ok) {
        console.log(res.status)
        return res.json()
      }
      throw new Error('Network response was not ok.')
    })
    .then(data => data.projects)
}

export { getProjects }