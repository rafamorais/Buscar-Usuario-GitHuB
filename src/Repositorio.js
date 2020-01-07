import React from "react"

const Repositorio = ( {repo} ) => (
    


<div class="container">
  <div class="row">
    <div class="col-md-4">
    <a target="_blank" href={repo.html_url} role="button">{repo.name}</a>
    </div>
    <div class="col-md-8">
      <span class="badge badge-secondary" >Stars:  {repo.stargazers_count}</span>
      <span class="badge badge-success" >Watchers: {repo.watchers_count} </span>
    </div>
  </div>
</div>

);

export default Repositorio;