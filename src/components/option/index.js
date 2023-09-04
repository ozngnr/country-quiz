import React, { useContext } from "react";
import "./style.css";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffOutlined from "@material-ui/icons/HighlightOffOutlined";
import { Context } from "../../context/context";

export default function Option({ option, question }) {
  const { handleAnswer } = useContext(Context);
  const { country, capital, isSelected, isCorrect } = option;
  const hasFlag = question.flag;

  const addClass =
    isSelected && isCorrect
      ? "correct"
      : isSelected && !isCorrect
      ? "incorrect"
      : "";

  const icon =
    isSelected && isCorrect ? (
      <CheckCircleOutlineIcon />
    ) : isSelected && !isCorrect ? (
      <HighlightOffOutlined />
    ) : (
      ""
    );

  return (
    <li className="answers-item">
      <button
        className={`answers-button ${addClass}`}
        onClick={() => handleAnswer(option)}
      >
        {hasFlag ? country : capital}
        {icon}
      </button>
    </li>
  );
}
