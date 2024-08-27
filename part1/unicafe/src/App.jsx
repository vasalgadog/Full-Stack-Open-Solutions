import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statics = (props) => {
  return(
    <div>
      {props.text}: {props.value}
    </div>
  )
}

const Statistics = (props) =>{
  return(
    <div>
      <Statics text='good' value={props.good}/>
      <Statics text='neutral' value={props.neutral}/>
      <Statics text='bad' value={props.bad}/>
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