import React from 'react';
import {ReactComponent as AdventureLogo} from "../../images/undraw_adventure_4hum.svg"
import {ReactComponent as WinnersLogo} from "../../images/undraw_winners_ao2o.svg"
import "./style/questionCard.css"

export default function QuestionCard({children, endGame}) {
  const logo = endGame ? <WinnersLogo className="card-image"/> : <AdventureLogo className="card-image"/>
  return (
    <div className="card-wrapper">
      <h1 className="card-title">Country Quiz</h1>
      <div className="card">
        {logo}
        {children}
      </div>
    </div>
  )
}

