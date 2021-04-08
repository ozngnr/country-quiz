import React from 'react';
import "./style/question.css"

export default function Question({ data, handleAnswer }) {
  const {question, flag, correctAnswer, answers} = data

  
  return (
    <div>
      <h2 className="question-title">{question}</h2>
      {flag && <img className="question-flag" src={flag} alt={`${correctAnswer} flag`}/>}
        <ol className="answers-list">
          {answers.map(answer => (
            <li key={answer.id} className="answers-item">
              <button className={`answers-button`} onClick={() => handleAnswer(answer)}>{answer.country || answer.capital}</button>
            </li>
          ))}
        </ol>
    </div>
  )
}