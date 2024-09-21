
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './Pages/Home'
import { Page2 } from './Pages/Page2'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/page2' element={<Page2/>}/>
      </Routes>
    </Router>
  )
}

export default App
