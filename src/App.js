import React, { useContext } from "react"
import "./App.css"
import QuestionContainer from "./components/questionContainer"
import { Context } from "./context/context"
import globe from "./images/globe.gif"

function App() {
  const { isLoading } = useContext(Context)

  return (
    <div className="App">
      {isLoading ? <img src={globe} alt="loader" /> : <QuestionContainer />}
      <div className="bg-rectangle right"></div>
      <div className="bg-rectangle left"></div>
    </div>
  )
}

export default App
