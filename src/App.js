import React, {useEffect, useState} from "react";

import "./styles.css";

import api from './services/api';

function App() {
  
  const {uuid} = require("uuidv4");

  const [repositories,setRepositories] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  },[])

  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories',{
      title : `Mais um curso qualquer ${Date.now()}`,
      url: 'http://api.github.com',
      techs:[{title: 'Teste'}]
    });
    const repo = response.data;
    setRepositories([...repositories,repo]);
  }

  async function handleRemoveRepository(id) {
    // TODO

    const repoIndex = repositories.findIndex(repo => repo.id === id);

    if(repoIndex < 0){
      alert('Registro não encontrado');
      return;
    }

    const response = await api.delete(`/repositories/${id}`)
      
    repositories.splice(repoIndex,1);

    setRepositories([...repositories]);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        
          {repositories.map(repository => <li key={uuid()}>{repository.title}
            
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>

          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
