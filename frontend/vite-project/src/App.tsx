import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/LandingPage'
import Game from './Pages/Game'
import SignUp from './Components/SignUp'
import Navbar from './Components/Navbar'

function App() {
  

  return (
    <>
    <div className="app h-screen w-screen overflow-hidden ">
    <BrowserRouter>
    <Navbar/>

       
       
        <Routes>

          <Route path="/home" element={<Home/>}/>
          <Route path="/game" element={<Game/>}/>
          <Route path='/sgn' element={<SignUp/>}/>

        </Routes>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App
