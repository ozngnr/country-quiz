import React, { useState, useEffect} from 'react';

const Context = React.createContext()

function ContextProvider({children}) {
  const [countries, setCountries] = useState([])
  const [question, setQuestion] = useState({ question: "", answers: [] })
  const [isLoading, setIsLoading] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [score, setScore] = useState(0)
  const [endGame, setEndGame] = useState(true)
  const [showButton, setShowButton] = useState(false) 

  //functions
  function handleAnswer(choice) {
    const updatedAnswers = 
      question.answers.map(answer => (answer.id === choice.id || answer.isCorrect) ? 
        {...answer, isSelected: true} : {...answer, isSelected: false}
      )

    setQuestion(prevQ => ({...prevQ, answers: updatedAnswers}))
    choice.isCorrect && score < currentQuestion && setScore(score + 1)  
    setShowButton(true)
  }

  function nextQuestion() {
    if (currentQuestion < 10) {
      setCurrentQuestion(currentQuestion + 1)
      return setShowButton(false)
    }
    setEndGame(true)
  }

  function resetGame() {
    setCurrentQuestion(1)
    setScore(0)
    setEndGame(false)
  }

  //get 4 random countries
  const url = "https://restcountries.eu/rest/v2/region/europe?fields=name;capital;flag"

  useEffect(() => {
    setIsLoading(true)

    fetch(url)
      .then(res => res.json())
      .then(data => data.filter(item => item.capital !== "")) // remove data without capital value
      .then(data => {
        setCountries(() => {
        const randomCountries = []
        
        for (let i = 0; i < 4; i++) {
          const random = Math.floor(Math.random() * data.length)
          randomCountries.push({id: random, isCorrect: false, isSelected: false, ...data[random]})
        }
        randomCountries[0].isCorrect = true
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
          answers: countries
            .sort((a, b) => a.id - b.id) // shuffle countries array before rendering
            .map(({id, capital, isCorrect, isSelected}) => ({id, capital, isCorrect, isSelected })) // get necessary properties
        })
      }
      
      setQuestion({
        flag: countries[0].flag,
        question: `Which country does this flag belong to?`,
        answers: countries
          .sort((a, b) => a.id - b.id) // shuffle countries array before rendering
          .map(({id, name, isCorrect, isSelected}) => ({id, country: name, isCorrect, isSelected })) // get necessary properties
      })
    }
    countries.length > 0 && getQuestion()

  }, [countries])

  return (
    <Context.Provider value={{
      question, 
      handleAnswer, 
      isLoading, 
      endGame, 
      score, 
      nextQuestion,
      showButton, 
      resetGame
    }}>
      {children}
    </Context.Provider>
  )
};

export {Context, ContextProvider}