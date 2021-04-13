import React from 'react';
import './App.css';
import QuestionCard from './components/questionCard';



function App() {
  return (
    <div className="App">
      <QuestionCard />
      <div className="bg-rectangle right"></div>
      <div className="bg-rectangle left"></div>
    </div>
  );
}

export default App;
