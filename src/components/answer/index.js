import React from 'react';

export default function Answer({answer, handleAnswer}) {
  console.log(answer)
  const className = answer.isSelected && answer.isCorrect ? "green" : answer.isSelected && !answer.isCorrect ? "red" : ""
  
  return (
    <li className="answers-item">
      <button 
        className={`answers-button ${className}`}
        onClick={() => handleAnswer(answer)}>
        {answer.country || answer.capital}
      </button>
    </li>
  )
};
