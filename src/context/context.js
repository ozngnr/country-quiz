import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [question, setQuestion] = useState({ question: "", options: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  //functions
  function handleAnswer(choice) {
    const updatedOptions = question.options.map((answer) =>
      answer.id === choice.id || answer.isCorrect
        ? { ...answer, isSelected: true }
        : { ...answer, isSelected: false }
    );

    setQuestion((prevQ) => ({ ...prevQ, options: updatedOptions }));
    choice.isCorrect && score < currentQuestion && setScore(score + 1);
    setShowNextButton(true);
  }

  function nextQuestion() {
    if (currentQuestion < 10) {
      setCurrentQuestion(currentQuestion + 1);
      createQuestion(countries);
      return setShowNextButton(false);
    }
    setEndGame(true);
  }

  function resetGame() {
    setCurrentQuestion(1);
    setScore(0);
    setEndGame(false);
    setShowNextButton(false);
    createQuestion(countries);
  }

  const createQuestion = useCallback((countries) => {
    const options = [];
    const numbers = [];
    const roll = Math.random();

    while (numbers.length < 4) {
      const number = Math.floor(Math.random() * countries.length);
      !numbers.includes(number) && numbers.push(number);
    }

    numbers.map((number) =>
      options.push({
        id: number,
        isCorrect: false,
        isSelected: false,
        flag: countries[number].flags.png,
        country: countries[number].name.common,
        capital: countries[number].capital[0],
      })
    );
    options[0].isCorrect = true;

    if (roll < 0.5) {
      return setQuestion({
        question: `What is the capital of ${options[0].country}?`,
        options: options.sort((a, b) => a.id - b.id), // shuffle options before rendering
      });
    }

    setQuestion({
      flag: options[0].flag,
      question: `Which country does this flag belong to?`,
      options: options.sort((a, b) => a.id - b.id), // shuffle options before rendering
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const getCountries = async () => {
      const { data } = await axios.get("https://restcountries.com/v3.1/all");
      // filter countries that don't have a capital
      const countries = data.filter((c) => c.capital !== undefined);

      setCountries(countries);
      createQuestion(countries);
    };
    try {
      getCountries();
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, [createQuestion]);

  console.log(question);

  return (
    <Context.Provider
      value={{
        question,
        handleAnswer,
        isLoading,
        endGame,
        score,
        nextQuestion,
        showNextButton,
        resetGame,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
