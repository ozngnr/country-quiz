import React from 'react';
import './App.css';
import QuestionContainer from './containers/questionContainer';


function App() {
  return (
    <div className="App">
      <QuestionContainer />
      <div className="bg-rectangle right"></div>
      <div className="bg-rectangle left"></div>
    </div>
  );
}

export default App;
