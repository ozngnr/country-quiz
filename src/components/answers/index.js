import React, { useContext } from 'react';
import "./style.css"
import Answer from '../answer';
import { Context } from '../../context/context';

export default function Answers() {
  const {question} = useContext(Context)
  console.log("answers rendered")

  return (
    <ul className="answers-list">
      {question.answers.map(answer => (
        <Answer key={answer.id} answer={answer}/>
      ))}
    </ul>
  )
};
