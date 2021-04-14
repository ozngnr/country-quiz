import React, { useContext } from 'react';
import './App.css';
import QuestionContainer from './components/questionContainer';
import { Context } from './context/context';

function App() {
  const {isLoading} = useContext(Context)

  return (
    <div className="App">
      {
        isLoading ? <h1 style={{ margin: "auto"}}>Loading...</h1> : 
        <QuestionContainer />
      }
      <div className="bg-rectangle right"></div>
      <div className="bg-rectangle left"></div>
    </div>
  );
}

export default App;
