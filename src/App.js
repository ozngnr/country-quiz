import React, { useContext, useEffect, useState } from "react"
import "./App.css"
import QuestionContainer from "./components/questionContainer"
import { Context } from "./context/context"
import globe from "./images/globe.gif"

function App() {
  const { isLoading } = useContext(Context)
  // const [ulkeler, setUlkeler] = useState([])

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await fetch("https://restcountries.com/v3.1/all")
  //       const data = await response.json()
  //       const filteredData = data.filter((e) => e.capital !== undefined) //remove countries without a capital city

  //       setUlkeler(filteredData)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getData()
  // }, [])

  return (
    <div className="App">
      {isLoading ? <img src={globe} alt="loader" /> : <QuestionContainer />}
      <div className="bg-rectangle right"></div>
      <div className="bg-rectangle left"></div>
    </div>
  )
}

export default App
