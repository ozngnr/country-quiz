import React, {useContext} from 'react';
import { Context } from '../../context/context';
import "./style.css"

export default function Question() {
  const {question} = useContext(Context)
  console.log("question rendered")

  return (
    <div className="question-wrapper">
      {question.flag && <img className="question-flag" src={question.flag} alt={`flag`}/>}
      <h2 className="question-title">{question.question}</h2>
    </div>
  )
}