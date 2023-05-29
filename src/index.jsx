import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './styles/index.css'
import Home from './pages/Home'
import Login from './pages/Login'
import LoginCoc from './pages/LoginCoc'
import Header from './components/Header'
import Player from './pages/Player'
import Manage from './pages/Manage'
import Recrutement from './pages/Recrutement'
import Settings from './pages/Settings'
import Signup from './pages/Signup'
import Error from './components/Error'
import ForgetPassword from './pages/ForgetPassword'
import ChangePassword from './pages/ChangePassword'
import './styles/validator.css'
import './styles/index.css'
import './styles/utils/button.css'
import './styles/utils/user.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <Router>
      <div className = "background">
        <Header/>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="logincoc" element={<LoginCoc/>}/>
          <Route path="signup" element={<Signup/>}/>
          <Route path="forgetpassword" element={<ForgetPassword/>}/>
          <Route path="player/:id" element={<Player/>}/>
          <Route path="player" element={<Player/>}/>
          <Route path="recruitment/*" element={<Recrutement/>}/>
          <Route path="manage" element={<Manage/>}/>
          <Route path="settings" element={<Settings/>}/>
          <Route path="changepassword" element={<ChangePassword/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
        <footer className="footer">Site non officiel</footer>
      </div>
    </Router>
  </>
)
