//import logo from './logo.svg';
import './App.css';
//import { useState } from 'react';

function App() {

  // https://localhost:7198/Doctors/doctors

  function func(){
    fetch("https://localhost:7198/Doctors/doctors").then(a => a.json()).then(s => console.log(s))
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <button onClick={func}>click me!</button>
    </div>
  );
}

export default App;
