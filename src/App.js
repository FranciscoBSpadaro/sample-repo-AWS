import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Página inicial do Projeto CI/CD com React + AWS .
        </p>
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
