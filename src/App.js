import React from 'react';
import './App.css';
import QuestionsContainer from './containers/questionsContainer';


function App() {
  return (
    <div className="App">
      <QuestionsContainer />
      <div className="bg-rectangle right"></div>
      <div className="bg-rectangle left"></div>
    </div>
  );
}

export default App;
