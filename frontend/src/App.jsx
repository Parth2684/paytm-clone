import { useState } from 'react'
import './App.css'
import { Signin } from './pages/SignIn'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './pages/SignUp'
import { Dashboard } from './pages/DashBoard'
import { SendMoney } from './pages/SendMoney'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/send' element={<SendMoney />} />
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
