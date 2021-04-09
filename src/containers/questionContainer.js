import React, { useState, useEffect } from 'react';
import { QuestionCard, Question } from '../components';

export default function QuestionsContainer() {
  const [countries, setCountries] = useState([])
  const [question, setQuestion] = useState({ question:"", answers: [] })
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [endGame, setEndGame] = useState(false)

  //functions
  function handleAnswer(choice) {
    choice.isCorrect && score < currentQuestion && setScore(score + 1)
    handleAnswerColor(choice)
  }

  function nextQuestion() {
    if (currentQuestion < 10) {
      return setCurrentQuestion(currentQuestion + 1)
    }
    setEndGame(true)
  }

  function handleAnswerColor(choice) {
    const updatedAnswers = question.answers.map(answer => {
      if (answer.id === choice.id || answer.isCorrect) {
        return {...answer, isSelected: true}
      }
      return {...answer, isSelected: false}
    })
    setQuestion(prevQ => ({...prevQ, answers: updatedAnswers}))
  }
  

  //get 4 random countries
  const url = "https://restcountries.eu/rest/v2/all?fields=name;capital;flag"
  useEffect(() => {
    setIsLoading(true)

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setCountries(() => {
        const randomCountries = []

        for (let i = 0; i < 3; i++) {
          for (let j = i; j < 1; j++) {
            const random = Math.floor(Math.random() * data.length)
            randomCountries.push({id: random, isCorrect: true, isSelected: false, ...data[random]})
          }
          const random = Math.floor(Math.random() * data.length)
          randomCountries.push({id: random, isCorrect: false, isSelected: false, ...data[random]})
        }
        
        return randomCountries
        })
        setIsLoading(false)
      })

  }, [currentQuestion])

  // create a random question then change state
  useEffect(() => {
    function getQuestion() {
      const roll = Math.random()
      if (roll < 0.5 ) {
        return setQuestion({
          question: `What is the capital of ${countries[0].name}?`,
          answers: 
            countries
            .sort((a, b) => a.id - b.id) // shuffle countries array before rendering
            .map(({id, capital, isCorrect, isSelected}) => ({id, capital, isCorrect, isSelected})) // pull necessary key value pairs for the question
        })
      }
      setQuestion({
        flag: countries[0].flag,
        question: `Which country does this flag belong to?`,
        answers: 
          countries
          .sort((a, b) => a.id - b.id) // shuffle countries array before rendering
          .map(({id, name, isCorrect, isSelected}) => ({id, country: name, isCorrect, isSelected})) // pull necessary key value pairs for the question
      })
    }

    countries.length > 0 && getQuestion()

  }, [countries])

  return (
    <>
      {
        isLoading ? <h1>Loading...</h1> : 
          <QuestionCard endGame={endGame}>
              <Question data={question} handleAnswer={handleAnswer} />
          </QuestionCard>
      }
    </>
  )
}