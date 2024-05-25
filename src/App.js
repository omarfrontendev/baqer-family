import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ForgetPassword, FreeBusiness, Home, Login, Register, SingleFreeBusiness, WelcomePage } from './pages'
import { PagesGuard } from './components/AuthGuard';

const App = () => {
  return (
    <Routes>
      <Route path="" element={<PagesGuard />}>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/" element={<Home />} />
        <Route path="/free-business" element={<FreeBusiness />} />
        <Route path="/free-business/:slug" element={<SingleFreeBusiness />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
    </Routes>
  );
}

export default App