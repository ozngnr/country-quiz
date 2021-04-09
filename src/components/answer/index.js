import React from 'react';
import "./style/answer.css"
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffOutlined from '@material-ui/icons/HighlightOffOutlined';

export default function Answer({answer, handleAnswer}) {
  const btn = 
    answer.isSelected && answer.isCorrect ? "correct" : 
    answer.isSelected && !answer.isCorrect ? "incorrect" : ""

  const icon = 
    answer.isSelected && answer.isCorrect ? <CheckCircleOutlineIcon /> : 
    answer.isSelected && !answer.isCorrect ? <HighlightOffOutlined /> : ""

  return (
    <li className="answers-item">
      <button 
        className={`answers-button ${btn}`}
        onClick={() => handleAnswer(answer)}>
        {answer.country || answer.capital}
        {icon}
      </button>
    </li>
  )
};
