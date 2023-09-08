import './Home.css'
import Book from './Book'
// import About from './About'

const Home = () => {
  return (
    <>
    <main id="main-div">
    <div className='heading'>
    <h1>Welcome to </h1>
    <h1>E-Kaksha</h1>
    </div>
    <div>
    <Book></Book>
    </div>
    </main>
    {/* <About></About> */}
    </>
    
  )
}

export default Home