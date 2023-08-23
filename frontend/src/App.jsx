import './App.css'
import Appbar from './components/Appbar'
import Home from './components/Home'
import Admin from './components/Admin'
import Student from './components/Student'
import Addcourse from './components/Addcourse'
import Allcourse from './components/Allcourse'
import Purchasedcourse from './components/Purchasedcourse'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import {RecoilRoot} from 'recoil'

function App() {

  return (
    <>
    <RecoilRoot>
    <Router>
    <Appbar/>
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/admin' element={<Admin />} />
    <Route path='/student' element={<Student />} />
    <Route path='/addcourse' element={<Addcourse />} />
    <Route path='/allcourse' element={<Allcourse />} />
    <Route path='/purchasedcourse' element={<Purchasedcourse />} />
    </Routes>
    </Router>
    </RecoilRoot>
    </>
  )
}

export default App
