import { useState } from 'react'
import './App.css'
import Bai01  from '../component/Bai01'
import Bai02 from '../component/Bai02'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Bai01></Bai01> */}
      <Bai02></Bai02>
    </>
  )
}

export default App
