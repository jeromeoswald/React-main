import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Personal Details</h1>
      <ol>
        <li>Name: Jerome Oswald Ebenezer J</li>
        <li>Age: 27</li>
        <li>Designation: Software Developer</li>
      </ol>
    </div>
  )
}

export default App
