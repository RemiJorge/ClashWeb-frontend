import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './styles/index.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Navigation from './components/Navigation'
import Player from './pages/Player'
import Ranking from './pages/Ranking'
import Settings from './pages/Settings'
import Shop from './pages/Shop'
import Signup from './pages/Signup'
import Error from './components/Error'
import ForgetPassword from './pages/ForgetPassword'
import ChangePassword from './pages/ChangePassword'
import './styles/validator.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router>
      <Navigation/>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="forgetpassword" element={<ForgetPassword/>}/>
        <Route path="player" element={<Player/>}/>
        <Route path="ranking" element={<Ranking/>}/>
        <Route path="settings" element={<Settings/>}/>
        <Route path="changepassword" element={<ChangePassword/>}/>
        <Route path="shop" element={<Shop/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
)