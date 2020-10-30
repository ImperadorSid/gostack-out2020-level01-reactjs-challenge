import React, { useState, useEffect } from 'react';

import './styles.css';

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories')
      .then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      title: `Repositório da Júlia - ${Date.now()}`,
      url: 'https://github.com/julia-finassi/projetos-python',
      techs: ['python', 'react', 'node'],
    }

    const response = await api.post('/repositories', newRepository);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}

            <button type="button" onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
