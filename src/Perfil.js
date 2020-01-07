import React from "react"

const Perfil = ({user}) => (
    
<div className="card" style={{width: '18rem'}}>
  <img src={user.avatar_url} class="card-img-top" alt="..."/>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">{user.login}</li>
    <li class="list-group-item">{user.location}</li>
    <a class="btn btn-success" target="_blank" href={user.html_url} role="button">Ver Perfil</a>
  </ul>
  
</div>

);

export default Perfil;