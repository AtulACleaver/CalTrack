import React, { Component }  from 'react';
import './App.css' ;
import Header from './Header';
import Pomodoro from './Pomodoro'

function App() {
  return (
    <div className="App">
      <Header />
      <Pomodoro />
    </div>
  );
}

export default App;
