import './App.css'
import Appbar from './components/Appbar'
import Home from './components/Home'
import Admin from './components/Admin'
import Student from './components/Student'
import AddCourse from './components/AddCourse'
import AllCourses from './components/AllCourses'
import Purchasedcourse from './components/PurchasedCourses'
import CoursePage from './components/CoursePage'
import PaymentSuccess from './components/PaymentSuccess'
import PaymentCanceled from './components/PaymentCanceled'
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
    <Route path='/addcourse' element={<AddCourse />} />
    <Route path='/allcourse' element={<AllCourses />} />
    <Route path='/course/:id' element={<CoursePage />} />
    <Route path='/' element={<CoursePage />} />
    <Route path='/purchasedcourse' element={<Purchasedcourse />} />
    <Route path='/payment/success' element={<PaymentSuccess />} />
    <Route path='/payment/canceled' element={<PaymentCanceled />} />
    </Routes>
    </Router>
    </RecoilRoot>
    </>
  )
}

export default App
