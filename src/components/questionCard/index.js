import React from 'react';
import {ReactComponent as AdventureLogo} from "../../images/undraw_adventure_4hum.svg"
import "./style/questionCard.css"

export default function QuestionCard({children}) {
  return (
    <div className="card-wrapper">
      <h1 className="card-title">Country Quiz</h1>
      <div className="card">
        <AdventureLogo className="card-image"/>
        {children}
      </div>
    </div>
  )
}

