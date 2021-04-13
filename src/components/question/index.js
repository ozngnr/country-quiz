import React from 'react';
import "./style.css"

export default function Question({ data }) {
  const {question, flag} = data

  return (
    <div className="question-wrapper">
      {flag && <img className="question-flag" src={flag} alt={`flag`}/>}
      <h2 className="question-title">{question}</h2>
    </div>
  )
}