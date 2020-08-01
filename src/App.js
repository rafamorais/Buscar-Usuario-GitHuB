import React, {Component  } from 'react';
import axios from "axios";
import Topo from './Topo';
import Perfil from './Perfil';
import Repositorio from './Repositorio';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class App extends Component {

  constructor(){
    super();
    this.state = {
      
      github:{
        url: "http://api.github.com/users", 
        client_id: "6e1313401cee22d9bf3e",
        client_secret: "0b4c81cbfca04eb87cfee13cb873e2753bbd555c", 
        count: 7, 
        sort: "created: asc"
      },

      user: [],
      repos: [],
      repos_star: [],

      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11
      
    }
    
    this.getLocation = this.getLocation.bind(this);
    this.showPosition = this.showPosition.bind(this);

  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {

    this.setState({
      center: [position.coords.latitude, position.coords.longitude ]
    })
      
  }
 
  getUser(e){
    const user = e.target.value;

    const { url, client_id, client_secret, count, sort } = this.state.github;

    axios
      .get(
        `${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`
      )
      .then( ({data}) => this.setState({ user: data}))

    axios
    .get(
      `${url}/${user}/repos?per_page=${count}&sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`
    )
    .then( ({data}) => this.setState({ repos: data}))

    axios
    .get(
      `${url}/${user}/starred?per_page=${count}&sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`
    )
    .then( ({data}) => this.setState({ repos_star: data}))

  }

  renderPerfil(){
    const {user, repos, repos_star} = this.state;
    
    return(

    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <Perfil user={user} />
        </div>
        <div className="col-sm-8">
          <h4>Repositórios</h4>
          {repos.map (repo => <Repositorio key={repo.name} repo={repo} />)}
          
          <h4>Repositórios dadas estrelas</h4>
          {repos_star.map (repo => <Repositorio key={repo.name} repo={repo} />)}
          
        </div>
      </div>
      <div className="row">
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "preciva colocar a chave aqui"}}
          center={this.state.center}
          defaultZoom={this.state.zoom}
        >
          <AnyReactComponent
            lat={this.state.center.lat}
            lng={this.state.center.lng}
            text="MY MARKER"
          />
        </GoogleMapReact>
      </div>
      </div>


    </div>

    )
  }
  

  render(){
    
    

    return (
      <div className="App">
        <Topo />
  
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Pesquisar Usuário</h1>
            <div className="form-group">
              <label for="nome">Digite o nome do usuário</label>
              <input onChange={this.getUser.bind(this)} type="text" className="form-control" id="nome" />
            </div>
          </div>
        </div>

        { this.state.user.length !== 0 ? this.renderPerfil() :  null }

        { this.state.user.length !== 0 ? this.getLocation() :  null }
  
      </div>
    )
  }
  
}

export default App;
