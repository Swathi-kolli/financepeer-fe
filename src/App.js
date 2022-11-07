import  React, { useState, useRef } from "react";
import logo from './logo.svg';
import './App.css';
import Login  from './components/login/Login.tsx'
import Home from './components/Home/Home.tsx';

function App() {
  const [showHome, setShowHome] = React.useState(false);
  return (
    <div className="App">
    {
      !showHome ?
      <Login onLogin={(val) => setShowHome(val)}/>
      : <Home onLogout={(val) => {console.log("dataaaaaaaaaaaaaa",val);setShowHome(val)}}/>
    }
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
    </div>
  );
}

export default App;
