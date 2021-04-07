import React, { useState, useEffect } from 'react';

export default function QuestionsContainer() {
  const [isLoading, setIsLoading] = useState(false)
  const [question, setQuestion] = useState([])
  const [countries, setCountries] = useState([])
  
  //get 4 random countries
  const url = "https://restcountries.eu/rest/v2/all?fields=name;capital;flag"
  useEffect(() => {
    setIsLoading(true)

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setCountries(() => {
        const randomCountries = []

        for (let i = 0; i < 4; i++) {
          const random = Math.floor(Math.random() * data.length)
          randomCountries.push(data[random])
        }
        
        return randomCountries
        })
        setIsLoading(false)
      })

  }, [])

  // create a random question then set question state
  useEffect(() => {
    function getQuestion() {
      const roll = Math.random()
      if (roll < 0.5 ) {
        return setQuestion([{
          question: `What is the capital of ${countries[0].name}?`,
          correctAnswer: countries[0].capital,
          answers: countries
                          .map(country => country.capital)
                          .sort(() => Math.random() - 0.5) //shuffle array 
        }])
      }
      setQuestion([{
        flag: countries[0].flag,
        question: `Which country does this flag belong to?`,
        correctAnswer: countries[0].name,
        answers: countries
                        .map(country => country.name)
                        .sort(() => Math.random() - 0.5) //shuffle array
      }])
    }

    countries.length && getQuestion() //
  }, [countries])

  console.log(question)
  return (
    <>
      {
        isLoading ? <h1>Loading...</h1> : 
        <div>
          {question.map(question => (
            <div>{question.question}
            <img src={question.flag} />
            {question.answers.map(answer => <p>{answer}</p>)}
            </div>
          ))}
        </div>
      }
    </>
  )
}