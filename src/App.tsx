import { ReactElement, useState } from 'react'
import HomePage from './socialMedia/HomePage'

function App(): ReactElement {
  const [count, setCount] = useState(0)

  return <HomePage />
}

export default App
