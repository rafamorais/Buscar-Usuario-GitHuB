import React from "react"

const Repositorio = ( {repo} ) => (
    


<div className="container">
  <div className="row">
    <div className="col-md-4">
    <a target="_blank" href={repo.html_url} role="button">{repo.name}</a>
    </div>
    <div className="col-md-8">
      <span className="badge badge-secondary" >Stars:  {repo.stargazers_count}</span>
      <span className="badge badge-success" >Watchers: {repo.watchers_count} </span>
    </div>
  </div>
</div>

);

export default Repositorio;