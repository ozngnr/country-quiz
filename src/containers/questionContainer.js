import React, { useState, useEffect } from 'react';
import { QuestionCard, Question } from '../components';

export default function QuestionsContainer() {
  const [countries, setCountries] = useState([])
  const [question, setQuestion] = useState({ question:"", correctAnswer: "", answers: [] })
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  
  //functions
  function handleAnswer(answer) {
    if (answer.isCorrect) {
    }
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
            randomCountries.push({id: random, isCorrect: true, ...data[random]})
          }
          const random = Math.floor(Math.random() * data.length)
          randomCountries.push({id: random, isCorrect: false, ...data[random]})
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
          correctAnswer: {id :countries[0].id, country: countries[0].name},
          answers: 
            countries
            .sort((a, b) => a.id - b.id) // shuffle countries array before rendering
            .map(({id, capital, isCorrect}) => ({id, capital, isCorrect})) // pull necessary key value pairs for the question
        })
      }
      setQuestion({
        flag: countries[0].flag,
        question: `Which country does this flag belong to?`,
        correctAnswer: {id :countries[0].id, capital: countries[0].capital},
        answers: 
          countries
          .sort((a, b) => a.id - b.id) // shuffle countries array before rendering
          .map(({id, name, isCorrect}) => ({id, country: name, isCorrect})) // pull necessary key value pairs for the question
      })
    }

    countries.length > 0 && getQuestion()

  }, [countries])

  console.log(question.correctAnswer)
  return (
    <>
      {
        isLoading ? <h1>Loading...</h1> : 
          <QuestionCard>
              <Question data={question} handleAnswer={handleAnswer} />
          </QuestionCard>
      }
    </>
  )
}