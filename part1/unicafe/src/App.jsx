import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const StaticLine = ({text, value}) => {
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
  if ( all < 1){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
      <StaticLine text='good' value={good}/>
      <StaticLine text='neutral' value={neutral}/>
      <StaticLine text='bad' value={bad}/>
      <StaticLine text='all' value={all}/>
      <StaticLine text='average' value={average}/>
      <StaticLine text='positive' value={positive +'%'}/>
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