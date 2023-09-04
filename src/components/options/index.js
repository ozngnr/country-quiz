import React, { useContext } from "react";
import "./style.css";
import Option from "../option";
import { Context } from "../../context/context";

export default function Options() {
  const { question } = useContext(Context);

  return (
    <ul className="answers-list">
      {question.options.map((option) => (
        <Option key={option.id} option={option} question={question} />
      ))}
    </ul>
  );
}
