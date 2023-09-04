import React, { useContext } from "react";
import { Context } from "../../context/context";
import "./style.css";

import { ReactComponent as AdventureLogo } from "../../images/undraw_adventure_4hum.svg";
import { ReactComponent as WinnersLogo } from "../../images/undraw_winners_ao2o.svg";

import Question from "../question";
import Options from "../options";

export default function QuestionCard() {
  const { endGame, score, nextQuestion, showNextButton, resetGame } =
    useContext(Context);

  return (
    <div className="card-wrapper">
      <h1 className="card-title">Country Quiz</h1>
      {endGame ? (
        <div className="card">
          <WinnersLogo className="card-endGame-image" />
          <h1 className="card-endGame-subtitle">Results</h1>
          <p className="card-endGame-text">
            You got <span>{score}</span> correct answers
          </p>
          <button onClick={() => resetGame()} className="card-btn endGame">
            Try Again
          </button>
        </div>
      ) : (
        <div className="card">
          <AdventureLogo className="card-image" />
          <Question />
          <Options />
          {showNextButton && (
            <button onClick={() => nextQuestion()} className="card-btn next">
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}
