import React, { useContext } from 'react';
import "./style.css"
import Answer from '../answer';
import { Context } from '../../context/context';

export default function Answers({answers}) {
  

  return (
    <ul className="answers-list">
      {answers.map(answer => (
        <Answer key={answer.id} answer={answer}/>
      ))}
    </ul>
  )
};
