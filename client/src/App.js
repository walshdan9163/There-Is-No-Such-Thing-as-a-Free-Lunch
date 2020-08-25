import React from 'react';
import './css/App.css';
import Menu from './components/menu';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>There Is No Such Thing as a Free Lunch</h1>
      </header>
      <div className="App-body">
        <Menu />
      </div>
    </div>
  );
}

export default App;

//COLOR SCHEME: 
// Light blue: #E2FOF9
// Teal: #B0DDE4
// Deep Blue: 286FB4
// White: FFFFFF
// Red: DF4C73