import React from 'react';
import Answer from "../answer/index"
import "./style/question.css"

export default function Question({ data , handleAnswer }) {
  const {question, flag, answers} = data

  const answerElements = answers.map(answer => (
    <Answer key={answer.id} answer={answer} handleAnswer={handleAnswer}/>
  ))

  return (
    <div className="question-wrapper">
      {flag && <img className="question-flag" src={flag} alt={`flag`}/>}
      <h2 className="question-title">{question}</h2>
      <ul className="answers-list">
        {answerElements}
      </ul>
    </div>
  )
}