import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ForgetPassword, Login, Register, WelcomePage } from './pages'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
    </Routes>
  );
}

export default App