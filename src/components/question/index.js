import React from 'react';
import Answer from "../answer/index"
import "./style/question.css"

export default function Question({ data , handleAnswer }) {
  const {question, flag, correctAnswer, answers} = data

  const answerElements = answers.map(answer => (
    <Answer key={answer.id} answer={answer} handleAnswer={handleAnswer}/>
  ))

  return (
    <div>
      <h2 className="question-title">{question}</h2>
      {flag && <img className="question-flag" src={flag} alt={`${correctAnswer} flag`}/>}
      <ul className="answers-list">
        {answerElements}
      </ul>
    </div>
  )
}