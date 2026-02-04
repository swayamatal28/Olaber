import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Captainlogin from './pages/Captainlogin'
import Captainsignup from './pages/Captainsignup'
import UserProtectWrapper from './pages/userProtectWrapper'
import UserLogout from './pages/UserLogout'
import Home from './pages/Home'
import CaptainHome from './pages/CaptainHome'
import CaptainLogout from './pages/CaptainLogout'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/captain-riding' element={<CaptainRiding />} />
        <Route path='/home' element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        } />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<Captainlogin />} />
        <Route path='/captain-signup' element={<Captainsignup />} />
        <Route path='/users/logout' element={<UserProtectWrapper><UserLogout /></UserProtectWrapper>} />
        <Route path='/captain-home' element={<CaptainProtectWrapper><CaptainHome /></CaptainProtectWrapper>}></Route>
        <Route path='/captain/logout' element={<CaptainProtectWrapper><CaptainLogout /></CaptainProtectWrapper>}></Route>
      </Routes>
    </div>
  )
}

export default App