import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const Statics = ({text, value}) => {
  return(
    <div>
      {text}: {value}
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) =>{
  const all = good + neutral + bad
  const average = all>0 ? parseFloat(((good) - (bad))/all) : 0
  const positive = all>0 ? parseFloat((good/all)*100) : 0
  return(
    <div>
      <Statics text='good' value={good}/>
      <Statics text='neutral' value={neutral}/>
      <Statics text='bad' value={bad}/>
      <Statics text='all' value={all}/>
      <Statics text='average' value={average}/>
      <Statics text='positive' value={positive +'%'}/>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App