// App.js
import React from 'react';
import './Components/styles/App.css';
import Card from './Components/Card';
import AnimatedLogo from './Components/AnimatedLogo';

function App() {
  const handleCardClick = () => {
    // Ação a ser executada quando um card for clicado
    // Por exemplo: redirecionar para outra página, mostrar mais detalhes, etc.
  };

  return (
    <div className="App">
      <header className="App-header">
        <AnimatedLogo />
        <p>
          Página inicial do Projeto CI/CD com React + AWS.
        </p>
        <div className="CardContainer">
          <Card
            title="Título do Card 1"
            description="Descrição do Card 1"
            onClick={handleCardClick}
          />
          <Card
            title="Título do Card 2"
            description="Descrição do Card 2"
            onClick={handleCardClick}
          />
          {/* Adicione mais cards conforme necessário */}
        </div>
        <a
          className="App-link"
          href="https://fbs-dev.netlify.app"
          target="_parent"
          rel="noopener noreferrer"
        >
          FBS-DEV
        </a>
        <a
          className="App-link"
          href="https://github.com/FranciscoBSpadaro/sample-repo-AWS"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github Source Code
        </a>
      </header>
    </div>
  );
}

export default App;
