import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import Survey from './pages/Survey'
import Error from './components/Error'
import Results from './pages/Results'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Link to="/">Home</Link>
      <Link to="/survey/1">Questionnaire</Link>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/survey/:num" element={<Survey/>}/>
        <Route path="/results" element={<Results/>}/> 
        <Route path="*" element={<Error/>}/>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)